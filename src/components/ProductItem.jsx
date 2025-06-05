import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductItem = ({ id, image, name, price, currency }) => {
  const fallbackImage = "https://via.placeholder.com/300";

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer block">
      <div className="overflow-hidden w-full ">
        <img
          src={image || fallbackImage}
          alt={name || "Product"}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency} {price}
      </p>
    </Link>
  );
};

ProductItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string,
};

ProductItem.defaultProps = {
  image: "",
  currency: "₹",
};

export default ProductItem;
