# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from products.views import ProductViewSet
from purchases.views import PurchaseViewSet
from sales.views import SaleViewSet

# Configuración del router
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'purchases', PurchaseViewSet)
router.register(r'sales', SaleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Rutas específicas de cada app
    path('api/products/', include('products.urls')),
    path('api/purchases/', include('purchases.urls')),
    path('api/sales/', include('sales.urls')),
    
    # Reports (con prefijo reports/)
    path('api/', include('reports.urls')),  # Esto dará /api/reports/dashboard/, etc.
    
    # Router para CRUD
    path('api/', include(router.urls)),
    
    # Autenticación
    path('api/login/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
]