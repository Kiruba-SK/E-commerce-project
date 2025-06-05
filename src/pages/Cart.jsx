import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [currency] = useState("₹");

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || {};
      const tempData = [];

      for (const id in cart) {
        for (const size in cart[id]) {
          if (cart[id][size] > 0) {
            tempData.push({
              _id: id,
              size,
              quantity: cart[id][size],
            });
          }
        }
      }

      setCartData(tempData);
    };

    loadCart();

    // Optional: Listen for changes (e.g., from other tabs or `dispatchEvent`)
    window.addEventListener("storage", loadCart);

    return () => window.removeEventListener("storage", loadCart);
  }, []);

  useEffect(() => {
    // 2. Fetch product data
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:8000/get_all_products/`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error loading products", err);
      }
    };

    fetchProducts();
  }, []);

  const updateQuantity = (id, size, newQuantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!cart[id]) cart[id] = {};
    if (newQuantity <= 0) {
      delete cart[id][size];
      if (Object.keys(cart[id]).length === 0) {
        delete cart[id];
      }
    } else {
      cart[id][size] = newQuantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify others that the cart has been updated
    window.dispatchEvent(new Event("cart-updated"));

    // Refresh state
    const updatedCart = [];
    for (const productId in cart) {
      for (const sz in cart[productId]) {
        updatedCart.push({
          _id: productId,
          size: sz,
          quantity: cart[productId][sz],
        });
      }
    }
    setCartData(updatedCart);
  };

  return (
    <div className="pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const product = products.find((p) => p.id === Number(item._id));
          if (!product) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={product.images?.[0]?.image || assets.default_image}
                  alt={product.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency} {product.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 1) updateQuantity(item._id, item.size, val);
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />
              <img
                src={assets.bin_icon}
                alt=""
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal cartItems={cartData} products={products} />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
