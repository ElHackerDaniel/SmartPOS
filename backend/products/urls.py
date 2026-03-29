# products/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, export_products_csv

router = DefaultRouter()
router.register(r'', ProductViewSet)

urlpatterns = [
    path('export/', export_products_csv, name='export-products'),
    path('', include(router.urls)),
]