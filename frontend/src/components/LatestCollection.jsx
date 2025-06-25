import React, { useState, useEffect } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import AxiosInstance from "../components/AxiosInstance";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await AxiosInstance.get("/get_all_products/");
        const data = await res.data;

        // Get latest 10 products (assuming newest are at the end of array)
        const latest = data.products.slice(-10).reverse(); // Most recent first
        setLatestProducts(latest);
      } catch (error) {
        console.error("Failed to fetch latest products:", error);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals for the season | New In Stock 🛍️
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {latestProducts.map((item) => {
          const imageUrl = item.images?.[0]?.image || null;

          return (
            <ProductItem
              key={item.id}
              id={item.id}
              image={imageUrl}
              name={item.name}
              price={item.price}
              currency="₹"
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollection;
