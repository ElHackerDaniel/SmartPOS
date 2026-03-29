# products/serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    
    def validate_name(self, value):
        """Validar que no exista un producto con el mismo nombre"""
        # Si es una actualización, excluir el producto actual
        instance = self.instance
        if instance and instance.name.lower() == value.lower():
            return value
        
        # Verificar si ya existe otro producto con el mismo nombre
        if Product.objects.filter(name__iexact=value).exists():
            raise serializers.ValidationError(f"Ya existe un producto con el nombre '{value}'")
        return value
