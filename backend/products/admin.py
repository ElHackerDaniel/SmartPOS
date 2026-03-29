# products/admin.py, acabado de hacer
from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'purchase_price', 'sale_price', 'stock', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name',)
    list_editable = ('purchase_price', 'sale_price', 'stock')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Información del Producto', {
            'fields': ('name', 'stock')
        }),
        ('Precios', {
            'fields': ('purchase_price', 'sale_price')
        }),
        ('Fechas', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )