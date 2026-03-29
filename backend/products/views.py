# products/views.py
import csv
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        """Retorna productos con stock bajo (menos de 5 unidades)"""
        low_stock_products = self.queryset.filter(stock__lt=5)
        serializer = self.get_serializer(low_stock_products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Retorna estadísticas de productos"""
        total_products = self.queryset.count()
        low_stock = self.queryset.filter(stock__lt=5).count()
        out_of_stock = self.queryset.filter(stock=0).count()
        
        return Response({
            'total': total_products,
            'low_stock': low_stock,
            'out_of_stock': out_of_stock
        })


# 🔥 Endpoint para exportar productos a CSV
@api_view(['GET'])
def export_products_csv(request):
    """Exportar productos a CSV"""
    products = Product.objects.all().order_by('name')
    
    response = HttpResponse(content_type='text/csv; charset=utf-8')
    response['Content-Disposition'] = f'attachment; filename=productos_{timezone.now().strftime("%Y%m%d")}.csv'
    
    writer = csv.writer(response, delimiter=';')
    writer.writerow(['ID', 'Nombre', 'Precio Compra', 'Precio Venta', 'Stock', 'Fecha Creación'])
    
    for p in products:
        writer.writerow([
            p.id,
            p.name,
            float(p.purchase_price),
            float(p.sale_price),
            p.stock,
            p.created_at.strftime("%Y-%m-%d %H:%M")
        ])
    
    return response