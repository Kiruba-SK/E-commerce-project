import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category, subCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/get_related_products/?category=${category}&sub_category=${subCategory}`
        );
        const data = await response.json();

        // Format each product to pick the first image
        const formattedData = data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0]?.image || "", // Get first image only
        }));

        setRelatedProducts(formattedData);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    if (category && subCategory) {
      fetchRelatedProducts();
    }
  }, [category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;