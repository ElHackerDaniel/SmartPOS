# sales/urls.py
from django.urls import path
from .views import sales_history, sales_by_day, export_sales_excel

urlpatterns = [
    path('history/', sales_history, name='sales-history'),
    path('by-day/', sales_by_day, name='sales-by-day'),
    path('export/', export_sales_excel, name='sales-export'),
]