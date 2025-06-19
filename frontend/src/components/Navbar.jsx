import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowSearch }) => {
  const [visible, setVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || {};
      let count = 0;
      for (const productId in cart) {
        for (const size in cart[productId]) {
          count += cart[productId][size];
        }
      }
      setCartCount(count);
    };

    calculateCartCount();

    const handleCartUpdate = () => calculateCartCount();
    const handleStorageChange = (e) => {
      if (e.key === "cart") calculateCartCount();
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("storage", handleStorageChange);

    // 👇 NEW: Listen for login cart restoration
    window.addEventListener("cart-restored", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cart-restored", handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    const email = (localStorage.getItem("email") || "").toLowerCase().trim();
    const currentCart = localStorage.getItem("cart");

    if (email && currentCart) {
      localStorage.setItem(`cart_${email}`, currentCart); // save cart to user-specific key
    }

    localStorage.removeItem("cart"); // ✅ Remove current session cart
    localStorage.removeItem("email"); // clear everything (including cart and email)

    window.dispatchEvent(new Event("cart-updated"));
    // console.log("Saving cart before logout:", email, currentCart);
    navigate("/");
  };


  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/home">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/home" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700  hidden " />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch((prev) => !prev)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <Link to="/profile">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p
                className="cursor-pointer hover:text-black"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </p>
              <p
                className="cursor-pointer hover:text-black"
                onClick={() => navigate("/orders")}
              >
                Orders
              </p>
              <p
                className="cursor-pointer hover:text-black"
                onClick={handleLogout}
              >
                Log-out
              </p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {cartCount}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* {sidebar menu for small screen} */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/home"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// const calculateCartCount = () => {
//   const cart = JSON.parse(localStorage.getItem("cart")) || {};
//   let count = 0;

//   for (const productId in cart) {
//     if (isNaN(Number(productId))) continue;

//     for (const size in cart[productId]) {
//       count += cart[productId][size];
//     }
//   }

//   setCartCount(count);
// };
