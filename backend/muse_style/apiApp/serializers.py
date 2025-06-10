from rest_framework import serializers
from apiApp.models import products,productImage  

class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = productImage
        fields = ['image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = products
        fields = ['id', 'name', 'price', 'description', 'category', 'sub_category', 'sizes', 'images', 'bestseller']
