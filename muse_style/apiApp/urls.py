from django.urls import path
import apiApp.views as v


urlpatterns = [
    path('login/',v.login,name='login'),
    path('create_user/',v.create_user,name='create_user'),
    path('get_user_profile/',v.get_user_profile,name='get_user_profile'),
    path('update_user_profile/',v.update_user_profile,name='update_user_profile'),
    path('add_product/',v.add_product,name='add_product'),
    path('get_all_products/',v.get_all_products,name='get_all_products'),
    path('get_product/<int:id>/',v.get_product, name='get_product'),
    path('get_related_products/', v.get_related_products, name='get_related_products'),
]

