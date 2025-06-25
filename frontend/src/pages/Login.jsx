import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../components/AxiosInstance";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const endpoint = currentState === "Login" ? "/login/" : "/create_user/";

    const payload =
      currentState === "Login"
        ? { email, password }
        : { name, email, password };

    try {
      const response = await AxiosInstance.post(endpoint, payload);
      const data = response.data;

      if (data.success) {
        toast.success(data.message || "Success!");
        const normalizedEmail = email.toLowerCase().trim();
        localStorage.setItem("email", normalizedEmail);

        if (currentState === "Login") {
          const storedCart = localStorage.getItem(`cart_${normalizedEmail}`);

          if (storedCart) {
            localStorage.setItem("cart", storedCart);
          } else {
            localStorage.removeItem("cart");
          }

          window.dispatchEvent(new Event("cart-restored"));
        }

        navigate("/home");
      } else {
        toast.info(data.error || data.message || "Failed.");
      }
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white/30 via-gray-400 to-white/30 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl border border-gray-200"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            {currentState}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {currentState === "Login"
              ? "Welcome back! Please login."
              : "Create an account to get started."}
          </p>
        </div>

        {currentState !== "Login" && (
          <input
            type="text"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-between text-sm text-gray-600 mb-6">
          <p className="hover:underline cursor-pointer">Forgot password?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="hover:underline cursor-pointer text-gray-600"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="hover:underline cursor-pointer text-gray-600"
            >
              Login here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:scale-105 transition"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
