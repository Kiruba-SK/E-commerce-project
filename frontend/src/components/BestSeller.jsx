import React, { useState, useEffect } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import AxiosInstance from "./AxiosInstance";

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await AxiosInstance.get("/get_all_products/");
        const data = await res.data;
        const bestProduct = data.products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch best sellers:", error);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Best of the best — handpicked for you | Customer favorites that never
          go out of style ✨{" "}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => {
          const imageUrl =
            item.images && item.images.length > 0 ? item.images[0].image : null;

          return (
            <ProductItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={imageUrl}
              currency="₹"
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
