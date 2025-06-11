from django.shortcuts import render
from apiApp.models import user_cred,products
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password,check_password
from apiApp.serializers import ProductSerializer, ProductImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from apiApp.models import products, productImage

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = products.objects.all()
    serializer_class = ProductSerializer

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = productImage.objects.all()
    serializer_class = ProductImageSerializer


@api_view(['POST'])
def login(request, format=None):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user_get = user_cred.objects.get(email = email)
        
    except user_cred.DoesNotExist :
        return Response({
                        "success": False, 
                        'message': 'user does not exist'
                        })
    
    if(check_password(password, user_get.password)):
        return Response({
                        "success": True,
                        "message": "Login successful"
                        })
    else:
        return Response({
                        "success": False,
                        "error": "Invalid credentials"  
                        }, status=401)


@api_view(['POST'])
def create_user(request, format=None):

    try:
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')

        if user_cred.objects.filter(email=email).exists():
            return Response({'error': 'Username already exists'}, status.HTTP_400_BAD_REQUEST)

        enc_pass = make_password(password)
        obj = user_cred(name=name, email=email, password=enc_pass)
        obj.save()

        return Response({'message': 'User created'}, status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_user_profile(request):
    email = request.GET.get('email')
    try:
        user = user_cred.objects.get(email=email)
        return Response({
            'name': user.name,
            'email': user.email,
            'phone': user.phone,
            'dob': user.dob,
            'gender': user.gender,
            'profile_picture': user.profile_picture.url if user.profile_picture else ''
        })
    except user_cred.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def update_user_profile(request):
    email = request.data.get('email')
    try:
        user = user_cred.objects.get(email=email)
        user.name = request.data.get('name', user.name)
        user.phone = request.data.get('phone', user.phone)
        user.dob = request.data.get('dob', user.dob)
        user.gender = request.data.get('gender', user.gender)

        if 'profile_picture' in request.FILES:
            user.profile_picture = request.FILES['profile_picture']

        user.save()
        return Response({'message': 'Profile updated successfully'})
    except user_cred.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)


@api_view(['GET'])
def get_all_products(request):

    try:
        all_products = products.objects.all()
        serializer = ProductSerializer(all_products, many=True, context={'request': request})
        return Response({"products": serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET"])
def get_product(request, id):
    try:
        product = products.objects.get(id=id)
        serializer = ProductSerializer(product, context={'request': request})
        return Response({"product": serializer.data})
    except products.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)


@api_view(["GET"])
def get_related_products(request):
    category = request.GET.get("category")
    sub_category = request.GET.get("sub_category")
    related = products.objects.filter(category=category, sub_category=sub_category)[:5]
    serializer = ProductSerializer(related, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(['POST'])
def add_product(request):
    try:
        new_product = products.objects.create(
            name=request.data.get('name'),
            description=request.data.get('description'),
            price=request.data.get('price'),
            images=request.FILES.get('images'),
            category=request.data.get('category'),
            sub_category=request.data.get('sub_category'),
            sizes=request.data.get('sizes'),
            date=request.data.get('date'),
            bestseller=request.data.get('bestseller') == 'True'
        )

        # Serialize and return newly added product
        serializer = ProductSerializer(new_product, context={'request': request})
        return Response({
            "message": "Product created successfully",
            "product": serializer.data
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
