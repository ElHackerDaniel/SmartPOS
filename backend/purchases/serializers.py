# purchases/serializers.py
from rest_framework import serializers
from .models import Purchase
from products.models import Product

class PurchaseSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Purchase
        fields = ['id', 'product', 'product_name', 'quantity', 'purchase_price', 'date']
        read_only_fields = ['product', 'date']
    
    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a 0")
        return value
    
    def validate_purchase_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a 0")
        return value
