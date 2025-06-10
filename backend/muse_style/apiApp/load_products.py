import os
import django
import sys

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'muse_style.settings')
django.setup()

from apiApp.models import products, productImage

data = [
    {
        "name": "Women Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 100,
        "image": "product_images/p_img1.png",
        "category": "Women",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L"]',
        "date": 1716634345448,
        "bestseller": True
    },
    {
        "name": "Men Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 200,
        "image": "product_images/p_img2_1.png,product_images/p_img2_2.png,product_images/p_img2_3.png,product_images/p_img2_4.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["M", "L", "XL"]',
        "date": 1716621345448,
        "bestseller": True
    },
    {
        "name": "Girls Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 220,
        "image": "product_images/p_img3.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "L", "XL"]',
        "date": 1716234545448,
        "bestseller": True
    },
    {
        "name": "Men Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 110,
        "image": "product_images/p_img4.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "XXL"]',
        "date": 1716621345448,
        "bestseller": True
    },
    {
        "name": "Women Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 130,
        "image": "product_images/p_img5.png",
        "category": "Women",
        "sub_category": "Topwear",
        "sizes": '["M", "L", "XL"]',
        "date": 1716622345448,
        "bestseller": True
    },
    {
        "name": "Girls Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 140,
        "image": "product_images/p_img6.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "L", "XL"]',
        "date": 1716623423448,
        "bestseller": True
    },
    {
        "name": "Men Tapered Fit Flat-Front Trousers",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 190,
        "image": "product_images/p_img7.png",
        "category": "Men",
        "sub_category": "Bottomwear",
        "sizes": '["S", "L", "XL"]',
        "date": 1716621542448,
        "bestseller": False
    },
    {
        "name": "Men Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 140,
        "image": "product_images/p_img8.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716622345448,
        "bestseller": False
    },
    {
        "name": "Girls Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 100,
        "image": "product_images/p_img9.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["M", "L", "XL"]',
        "date": 1716621235448,
        "bestseller": False
    },
    {
        "name": "Men Tapered Fit Flat-Front Trousers",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 110,
        "image": "product_images/p_img10.png",
        "category": "Men",
        "sub_category": "Bottomwear",
        "sizes": '["S", "L", "XL"]',
        "date": 1716622235448,
        "bestseller": False
    },
    {
        "name": "Men Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 120,
        "image": "product_images/p_img11.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L"]',
        "date": 1716623345448,
        "bestseller": False
    },
    {
        "name": "Men Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 150,
        "image": "product_images/p_img12.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716624445448,
        "bestseller": False
    },
    {
        "name": "Women Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 130,
        "image": "product_images/p_img13.png",
        "category": "Women",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716625545448,
        "bestseller": False
    },
    {
        "name": "Boy Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 160,
        "image": "product_images/p_img14.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716626645448,
        "bestseller": False
    },
    {
        "name": "Men Tapered Fit Flat-Front Trousers",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 140,
        "image": "product_images/p_img15.png",
        "category": "Men",
        "sub_category": "Bottomwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716627745448,
        "bestseller": False
    },
    {
        "name": "Girls Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 170,
        "image": "product_images/p_img16.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716628845448,
        "bestseller": False
    },
    {
        "name": "Men Tapered Fit Flat-Front Trousers",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 150,
        "image": "product_images/p_img17.png",
        "category": "Men",
        "sub_category": "Bottomwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716629945448,
        "bestseller": False
    },
    {
        "name": "Boy Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 180,
        "image": "product_images/p_img18.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716631045448,
        "bestseller": False
    },
    {
        "name": "Boy Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 160,
        "image": "product_images/p_img19.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716632145448,
        "bestseller": False
    },
    {
        "name": "Women Palazzo Pants with Waist Belt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 190,
        "image": "product_images/p_img20.png",
        "category": "Women",
        "sub_category": "Bottomwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716633245448,
        "bestseller": False
    },
    {
        "name": "Women Zip-Front Relaxed Fit Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 170,
        "image": "product_images/p_img21.png",
        "category": "Women",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716634345448,
        "bestseller": False
    },
    {
        "name": "Women Palazzo Pants with Waist Belt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 200,
        "image": "product_images/p_img22.png",
        "category": "Women",
        "sub_category": "Bottomwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716635445448,
        "bestseller": False
    },
    {
        "name": "Boy Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 180,
        "image": "product_images/p_img23.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716636545448,
        "bestseller": False
    },
    {
        "name": "Boy Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 210,
        "image": "product_images/p_img24.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716637645448,
        "bestseller": False
    },
    {
        "name": "Girls Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 190,
        "image": "product_images/p_img25.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716638745448,
        "bestseller": False
    },
    {
        "name": "Women Zip-Front Relaxed Fit Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 220,
        "image": "product_images/p_img26.png",
        "category": "Women",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716639845448,
        "bestseller": False
    },
    {
        "name": "Girls Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 200,
        "image": "product_images/p_img27.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716640945448,
        "bestseller": False
    },
    {
        "name": "Men Slim Fit Relaxed Denim Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 230,
        "image": "product_images/p_img28.png",
        "category": "Men",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716642045448,
        "bestseller": False
    },
    {
        "name": "Women Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 210,
        "image": "product_images/p_img29.png",
        "category": "Women",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716643145448,
        "bestseller": False
    },
    {
        "name": "Girls Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 240,
        "image": "product_images/p_img30.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716644245448,
        "bestseller": False
    },
    {
        "name": "Men Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 220,
        "image": "product_images/p_img31.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716645345448,
        "bestseller": False
    },
    {
        "name": "Men Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 250,
        "image": "product_images/p_img32.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716646445448,
        "bestseller": False
    },
    {
        "name": "Girls Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 230,
        "image": "product_images/p_img33.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716647545448,
        "bestseller": False
    },
    {
        "name": "Women Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 260,
        "image": "product_images/p_img34.png",
        "category": "Women",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716648645448,
        "bestseller": False
    },
    {
        "name": "Women Zip-Front Relaxed Fit Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 240,
        "image": "product_images/p_img35.png",
        "category": "Women",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716649745448,
        "bestseller": False
    },
    {
        "name": "Women Zip-Front Relaxed Fit Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 270,
        "image": "product_images/p_img36.png",
        "category": "Women",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716650845448,
        "bestseller": False
    },
    {
        "name": "Women Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 250,
        "image": "product_images/p_img37.png",
        "category": "Women",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716651945448,
        "bestseller": False
    },
    {
        "name": "Men Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 280,
        "image": "product_images/p_img38.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716653045448,
        "bestseller": False
    },
    {
        "name": "Men Printed Plain Cotton Shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 260,
        "image": "product_images/p_img39.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716654145448,
        "bestseller": False
    },
    {
        "name": "Men Slim Fit Relaxed Denim Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 290,
        "image": "product_images/p_img40.png",
        "category": "Men",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716655245448,
        "bestseller": False
    },
    {
        "name": "Men Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 270,
        "image": "product_images/p_img41.png",
        "category": "Men",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716656345448,
        "bestseller": False
    },
    {
        "name": "Boy Round Neck Pure Cotton T-shirt",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 300,
        "image": "product_images/p_img42.png",
        "category": "Kids",
        "sub_category": "Topwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716657445448,
        "bestseller": False
    },
    {
        "name": "Kid Tapered Slim Fit Trouser",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 280,
        "image": "product_images/p_img43.png",
        "category": "Kids",
        "sub_category": "Bottomwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716658545448,
        "bestseller": False
    },
    {
        "name": "Women Zip-Front Relaxed Fit Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 310,
        "image": "product_images/p_img44.png",
        "category": "Women",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716659645448,
        "bestseller": False
    },
    {
        "name": "Men Slim Fit Relaxed Denim Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 290,
        "image": "product_images/p_img45.png",
        "category": "Men",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716660745448,
        "bestseller": False
    },
    {
        "name": "Men Slim Fit Relaxed Denim Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 320,
        "image": "product_images/p_img46.png",
        "category": "Men",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716661845448,
        "bestseller": False
    },
    {
        "name": "Kid Tapered Slim Fit Trouser",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 300,
        "image": "product_images/p_img47.png",
        "category": "Kids",
        "sub_category": "Bottomwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716662945448,
        "bestseller": False
    },
    {
        "name": "Men Slim Fit Relaxed Denim Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 330,
        "image": "product_images/p_img48.png",
        "category": "Men",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716664045448,
        "bestseller": False
    },
    {
        "name": "Kid Tapered Slim Fit Trouser",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 310,
        "image": "product_images/p_img49.png",
        "category": "Kids",
        "sub_category": "Bottomwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716665145448,
        "bestseller": False
    },
    {
        "name": "Kid Tapered Slim Fit Trouser",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 340,
        "image": "product_images/p_img50.png",
        "category": "Kids",
        "sub_category": "Bottomwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716666245448, "bestseller": False
    },
    {
        "name": "Women Zip-Front Relaxed Fit Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 320,
        "image": "product_images/p_img51.png",
        "category": "Women",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716667345448,
        "bestseller": False
    },
    {
        "name": "Men Slim Fit Relaxed Denim Jacket",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        "price": 350,
        "image": "product_images/p_img52.png",
        "category": "Men",
        "sub_category": "Winterwear",
        "sizes": '["S", "M", "L", "XL"]',
        "date": 1716668445448,
        "bestseller": False
    }

]

for item in data:
    # Step 1: Create the product without the image
    product = products.objects.create(
        name=item['name'],
        description=item['description'],
        price=item['price'],
        category=item['category'],
        sub_category=item['sub_category'],
        sizes=item['sizes'],
        date=item['date'],
        bestseller=item['bestseller'],
    )
    
    # Step 2: Add images to the product (assuming item['image'] is a string with comma-separated image paths)
    image_paths = item['image'].split(',')  # Convert the string to a list
    for image_path in image_paths:
        productImage.objects.create(
            products=product,
            image=image_path  # Path to the image
        )

print("Products and images loaded successfully.")