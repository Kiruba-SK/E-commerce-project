from django.contrib import admin

from apiApp.models import user_cred,products,productImage

# Register your models here.

# Keep your user_cred registration:
admin.site.register(user_cred)

# Define an inline for productImage:
class ProductImageInline(admin.TabularInline):
    model = productImage
    extra = 1  # shows one blank image slot by default

# Register products with that inline:
@admin.register(products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'category', 'sub_category')
    inlines = [ProductImageInline]

# (Optional) If you still want to manage images standalone:
@admin.register(productImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'products', 'image')