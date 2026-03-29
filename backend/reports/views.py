from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sales.models import Sale
from products.models import Product
from django.db.models import Sum
from django.utils.timezone import now
from purchases.models import Purchase
from django.db.models.functions import TruncDay
from django.db.models import Count


@api_view(['GET'])
def profit_report(request):

    total_sales = Sale.objects.aggregate(
        total=Sum('sale_price')
    )['total'] or 0

    total_purchases = Purchase.objects.aggregate(
        total=Sum('purchase_price')
    )['total'] or 0

    profit = total_sales - total_purchases

    return Response({
        "ventas_totales": total_sales,
        "compras_totales": total_purchases,
        "ganancia": profit
    })

@api_view(['GET'])
def dashboard_stats(request):

    today = now().date()

    ventas_hoy = Sale.objects.filter(date__date=today).aggregate(
        total=Sum('sale_price')
    )['total'] or 0

    total_productos = Product.objects.count()

    stock_bajo = Product.objects.filter(stock__lt=10).count()

    return Response({
        "ventas_hoy": ventas_hoy,
        "productos": total_productos,
        "stock_bajo": stock_bajo
    })

@api_view(['GET'])
def sales_by_day(request):

    sales = (
        Sale.objects
        .annotate(day=TruncDay('date'))
        .values('day')
        .annotate(total=Sum('sale_price'))
        .order_by('day')
    )

    data = [
        {
            "day": s["day"].strftime("%Y-%m-%d"),
            "sales": s["total"]
        }
        for s in sales
    ]

    return Response(data)

@api_view(['GET'])
def top_products(request):

    top = (
        Sale.objects
        .values('product__name')
        .annotate(total_sales=Sum('quantity'))
        .order_by('-total_sales')[:5]
    )

    data = [
        {
            "product": t["product__name"],
            "sales": t["total_sales"]
        }
        for t in top
    ]

    return Response(data)
