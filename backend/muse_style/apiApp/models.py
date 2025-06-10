from django.db import models

# Create your models here.

class user_cred(models.Model):
    name = models.CharField(max_length = 20, blank = False)
    email = models.EmailField(max_length = 100, unique=True, blank = False)
    password = models.CharField(max_length = 100, blank = False)
    phone = models.CharField(max_length=15, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.email


class products(models.Model):
    name = models.CharField(max_length=255, blank = False)
    description = models.TextField(blank = False)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank = False)
    category = models.CharField(max_length=100, blank = False)
    sub_category = models.CharField(max_length=100, blank = False)
    sizes = models.JSONField(blank = False)  # Stores list like ["S", "M", "L"]
    date = models.BigIntegerField(blank = False)  # Stores timestamp like 1716634345448
    bestseller = models.BooleanField(default=False, blank = False)

    def __str__(self):
        return self.name


class productImage(models.Model):
    products = models.ForeignKey(products, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')

