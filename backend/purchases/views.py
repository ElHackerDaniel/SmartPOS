# purchases/views.py
import csv
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Purchase
from .serializers import PurchaseSerializer
from products.models import Product


class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

    def create(self, request, *args, **kwargs):
        """Manejar la creación de compra con creación automática de producto"""
        try:
            # Obtener datos del request
            product_name = request.data.get('product_name')
            quantity = request.data.get('quantity')
            purchase_price = request.data.get('purchase_price')
            
            print(f"📦 Datos recibidos: producto={product_name}, cantidad={quantity}, precio={purchase_price}")
            
            # Validaciones básicas
            if not product_name:
                return Response({"error": "El nombre del producto es requerido"}, status=400)
            
            try:
                quantity = int(quantity)
                purchase_price = float(purchase_price)
            except (ValueError, TypeError):
                return Response({"error": "Cantidad y precio deben ser números válidos"}, status=400)
            
            if quantity <= 0:
                return Response({"error": "La cantidad debe ser mayor a 0"}, status=400)
            
            if purchase_price <= 0:
                return Response({"error": "El precio debe ser mayor a 0"}, status=400)
            
            # Buscar si el producto ya existe (insensible a mayúsculas/minúsculas)
            product = Product.objects.filter(name__iexact=product_name).first()
            
            if not product:
                # Crear producto nuevo con datos básicos
                sale_price = purchase_price * 1.3  # Margen del 30%
                
                product = Product.objects.create(
                    name=product_name,
                    purchase_price=purchase_price,
                    sale_price=round(sale_price, 2),
                    stock=0
                )
                print(f"✅ Producto creado: {product_name}")
            else:
                print(f"📦 Producto existente: {product_name}")
            
            # Actualizar stock del producto
            product.stock += quantity
            product.save()
            
            # Crear la compra
            purchase = Purchase.objects.create(
                product=product,
                quantity=quantity,
                purchase_price=purchase_price
            )
            
            # Serializar la respuesta
            serializer = self.get_serializer(purchase)
            print(f"✅ Compra registrada: {quantity} unidades de {product_name}")
            
            return Response(serializer.data, status=201)
            
        except Exception as e:
            print(f"❌ Error en create: {str(e)}")
            return Response({"error": str(e)}, status=500)


# 🔥 Endpoint para exportar compras a CSV
@api_view(['GET'])
def export_purchases_csv(request):
    """Exportar compras a CSV"""
    purchases = Purchase.objects.all().select_related('product').order_by('-date')
    
    response = HttpResponse(content_type='text/csv; charset=utf-8')
    response['Content-Disposition'] = f'attachment; filename=compras_{timezone.now().strftime("%Y%m%d")}.csv'
    
    writer = csv.writer(response, delimiter=';')
    writer.writerow(['ID', 'Producto', 'Cantidad', 'Precio Unitario', 'Total', 'Fecha'])
    
    for p in purchases:
        writer.writerow([
            p.id,
            p.product.name,
            p.quantity,
            float(p.purchase_price),
            float(p.purchase_price) * p.quantity,
            p.date.strftime("%Y-%m-%d %H:%M")
        ])
    
    return response