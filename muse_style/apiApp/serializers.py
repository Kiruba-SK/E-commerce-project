from rest_framework import serializers
from apiApp.models import products,productImage  # assuming your model is named `products`

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

   

    # def get_image(self, obj):
    #     request = self.context.get('request')
    #     image_url = obj.image.url if obj.image else ""
    #     if image_url.endswith("/"):  # remove trailing slash if present
    #         image_url = image_url[:-1]
    #     return request.build_absolute_uri(image_url)