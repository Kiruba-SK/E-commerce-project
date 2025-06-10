import React from "react";
import Title from "./Title";

const CartTotal = ({ cartItems = [], products = [] }) => {
  const currency = "₹";
  const delivery_fee = 60;

  // Helper to get subtotal
  const getCartAmount = () => {
    let total = 0;

    cartItems.forEach((item) => {
      const product = products.find((p) => Number(p.id) === Number(item._id));
      if (product) {
        const price = parseFloat(product.price);
        total += price * item.quantity;
      }
    });

    return total;
  };

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {subtotal === 0 ? "0.00" : delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <p>
            {currency} {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
