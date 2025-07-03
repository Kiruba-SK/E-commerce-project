import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import AxiosInstance from "../components/AxiosInstance";


const PlaceOrder = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

    window.addEventListener("storage", loadCart);

    return () => window.removeEventListener("storage", loadCart);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await AxiosInstance.get(`/get_all_products/`);
        const data = await res.data;
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error loading products", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* ----------Left Side ----------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Pincode"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* ---------- Right Side --------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal cartItems={cartData} products={products} />
        </div>

        <div className="mt-14 ">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          {/* ---------Payment Method Selection --------- */}

          <div className="w-full">
            {/* ---UPI method---- */}

            <div
              className={` border-2 px-3 py-3 ${
                selectedPaymentMethod === "upi"
                  ? "border-black"
                  : "border-gray-200"
              }`}
            >
              <div
                className="flex flex-row gap-5 cursor-pointer "
                onClick={() =>
                  setSelectedPaymentMethod(
                    selectedPaymentMethod === "upi" ? "" : "upi"
                  )
                }
              >
                <img className="w-10" src={assets.upi_icon} alt="" />
                <div className="flex justify-between w-full pr-3">
                  <div>
                    <p className="text-gray-800 ">UPI</p>
                    <p className="text-gray-400 text-sm">Pay by any UPI app</p>
                  </div>
                  <div>
                    <img
                      className="w-3 h-4 rotate-90"
                      src={assets.dropdown_icon}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div>
                {selectedPaymentMethod === "upi" && (
                  <div className="flex flex-col mt-3 mr-2 ml-2 gap-2">
                    {[
                      { name: "Google Pay", icon: assets.gpay_icon },
                      { name: "PhonePe", icon: assets.phonepe_icon },
                      { name: "Paytm", icon: assets.paytm_icon },
                    ].map((app) => (
                      <div
                        key={app.name}
                        className="flex items-center gap-4 pr-5 cursor-pointer py-1"
                        onClick={() => setSelectedUpiApp(app.name)}
                      >
                        <img className="w-6" src={app.icon} alt={app.name} />
                        <p>{app.name}</p>
                        <div className="w-4 h-4 rounded-full border border-black ml-auto flex items-center justify-center">
                          {selectedUpiApp === app.name && (
                            <div className="w-2.5 h-2.5 rounded-full bg-black" />
                          )}
                        </div>
                      </div>
                    ))}
                    <button className="bg-gray-500 py-2 px-20 mt-3 text-gray-100 text-center transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-105">
                      Proceed to pay
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* --------Credit/Debit card method----------- */}

            <div
              className={`flex flex-col gap-2 border-2 px-3 py-3 mt-4 cursor-pointer ${
                selectedPaymentMethod === "card"
                  ? "border-black"
                  : "border-gray-200"
              }`}
            >
              <div
                className="flex flex-row gap-5 items-center"
                onClick={() =>
                  setSelectedPaymentMethod(
                    selectedPaymentMethod === "card" ? "" : "card"
                  )
                }
              >
                <img className="w-10" src={assets.card_icon} alt="" />
                <div className="flex justify-between w-full pr-3">
                  <div>
                    <p className="text-gray-800 ">Credit / Debit Card</p>
                    <p className="text-gray-400 text-sm">Visa, Rupay & more</p>
                  </div>
                  <div>
                    <img
                      className="w-3 h-4 rotate-90"
                      src={assets.dropdown_icon}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div>
                {selectedPaymentMethod === "card" && (
                  <div className="flex flex-col mt-3 mr-2 ml-2 gap-2 ">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="border rounded px-2 py-1 w-full mb-2 bg-gray-100"
                    />
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      className="border rounded px-2 py-1 w-full mb-2 bg-gray-100"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="border rounded px-2 py-1 w-full mb-2 bg-gray-100"
                    />
                    <button className="bg-gray-500 py-2 px-20 mt-3 text-gray-100 text-center transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-105">
                      Proceed to pay
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* -----------Cash On Delivery------------ */}

            <div
              className={`flex flex-col gap-2 border-2 mt-4 px-3 py-3 cursor-pointer ${
                selectedPaymentMethod === "cod"
                  ? "border-black"
                  : "border-gray-200"
              }`}
            >
              <div
                className="flex flex-row gap-5 items-center"
                onClick={() =>
                  setSelectedPaymentMethod(
                    selectedPaymentMethod === "cod" ? "" : "cod"
                  )
                }
              >
                <img className="w-10" src={assets.cash_icon} alt="" />
                <div className="flex justify-between w-full pr-3">
                  <div>
                    <p className="text-gray-800 ">Cash On Delivery</p>
                    <p className="text-gray-400 text-sm">
                      Pay at your doorstep
                    </p>
                  </div>
                  <div>
                    <img
                      className="w-3 h-4 rotate-90 "
                      src={assets.dropdown_icon}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div>
                {selectedPaymentMethod === "cod" && (
                  <div className="flex flex-col ml-2 mr-2 mt-3">
                    <p className="text-gray-600 text-m mb-2">
                      You will pay in cash upon delivery.{" "}
                    </p>
                    <button
                      onClick={() => navigate("/orders")}
                      className="bg-gray-500 py-2 px-20 mt-3 text-gray-100 text-center transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-105"
                    >
                      Confirm Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
