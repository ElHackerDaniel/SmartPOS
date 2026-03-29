# reports/urls.py
from django.urls import path
from .views import dashboard_stats, profit_report, sales_by_day, top_products

urlpatterns = [
    path('reports/dashboard/', dashboard_stats, name='dashboard'),
    path('reports/sales-by-day/', sales_by_day, name='sales-by-day'),
    path('reports/profit/', profit_report, name='profit'),
    path('reports/top-products/', top_products, name='top-products'),
]