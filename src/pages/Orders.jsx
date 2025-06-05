import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Orders = () => {
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
  }, []);

  useEffect(() => {
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

  return (
    <div className="boder-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const product = products.find((p) => p.id === Number(item._id));
          if (!product) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={product.images?.[0]?.image || assets.default_image}
                  alt={product.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{product.name}</p>
                  <div className="flex items-center mt-2 gap-3 text-base text-gray-700">
                    <p className="text-lg">
                      {currency} {product.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">25 Jan 2025</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between mr-5">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">Ready to Ship</p>
                </div>
                <button className="border px-2 py-2 text-sm font-medium rounded-sm hover:bg-black hover:text-white transition-all duration-500">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
