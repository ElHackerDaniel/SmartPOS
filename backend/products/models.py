# products/models.py
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200, unique=True)  # ← AGREGAR unique=True

    purchase_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    sale_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name