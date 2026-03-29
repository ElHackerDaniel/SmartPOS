from django.db import models
from products.models import Product

class Sale(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.IntegerField()

    sale_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    date = models.DateTimeField(auto_now_add=True)