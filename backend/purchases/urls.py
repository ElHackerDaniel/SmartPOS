# purchases/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PurchaseViewSet, export_purchases_csv

router = DefaultRouter()
router.register(r'', PurchaseViewSet)

urlpatterns = [
    path('export/', export_purchases_csv, name='export-purchases'),
    path('', include(router.urls)),
]