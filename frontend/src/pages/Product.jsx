import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import { toast } from "react-toastify";
import AxiosInstance from "../components/AxiosInstance";


const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [currency] = useState("₹");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await AxiosInstance.get(
          `/get_product/${id}/`
        );
        const data = await response.data;

        if (data && data.product) {
          setProductData({
            ...data.product,
            sizes: JSON.parse(data.product.sizes),
          });
          setImage(data.product.images[0]?.image || "");
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          console.error("Product not found:", data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (!cart[productData.id]) {
      cart[productData.id] = {};
    }

    if (!cart[productData.id][size]) {
      cart[productData.id][size] = 1;
    } else {
      cart[productData.id][size] += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const email = localStorage.getItem("email");
    if (email) {
      localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
    }

    // Dispatch event to notify Navbar
    window.dispatchEvent(new Event("cart-updated"));

    toast.success("Product added to cart!");
  };

  return productData ? (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item.image)}
                src={item.image}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Product thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Main product" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-600 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur...</p>
        </div>
      </div>

      <RelatedProduct
        category={productData.category}
        subCategory={productData.sub_category}
      />
    </div>
  ) : (
    <div className="text-center py-10">Loading...</div>
  );
};

export default Product;
