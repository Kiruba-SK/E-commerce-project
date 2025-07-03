import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosInstance from "../components/AxiosInstance";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    const pwd = forgotPassword ? newPassword : password;
    if (pwd.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (loading) return;
    if (!validateInputs()) return;

    setLoading(true);

    try {
      let response;

      if (forgotPassword) {
        response = await AxiosInstance.post("/reset-password/", {
          email,
          new_password: newPassword,
        });

        if (response.status === 200) {
          toast.success("Password reset successful!");
          setForgotPassword(false);
          setNewPassword("");
          setEmail("");
          setCurrentState("Login");
          navigate("/login");
        } else {
          toast.error(response.data?.error || "Password reset failed.");
        }
        setLoading(false);
        return;
      }

      const endpoint = currentState === "Login" ? "/login/" : "/create_user/";

      const payload =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };

      response = await AxiosInstance.post(endpoint, payload);
      const data = response.data;

      if (response.status === 200 || response.status === 201 || data.success) {
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

        navigate("/");
      } else {
        toast.error(data.error || "Failed.");
      }
    } catch (err) {
      console.error("API Error:", err);
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 400) {
        toast.error(data?.error || "Invalid input.");
      } else if (status === 401) {
        toast.error(data?.error || "Invalid credentials.");
      } else if (status === 409) {
        toast.error(data?.error || "User already exists.");
      } else if (status === 404) {
        toast.error(data?.error || "User not found.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white/30 via-gray-400 to-white/30 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl border border-gray-200"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            {forgotPassword ? "Reset Password" : currentState}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {forgotPassword
              ? "Enter your email to reset password"
              : currentState === "Login"
              ? "Welcome back! Please login."
              : "Create an account to get started."}
          </p>
        </div>

        {!forgotPassword && currentState === "Sign Up" && (
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

        <div className="relative">
          <input
            type={
              forgotPassword
                ? showNewPassword
                  ? "text"
                  : "password"
                : showPassword
                ? "text"
                : "password"
            }
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
            placeholder={forgotPassword ? "New Password" : "Password"}
            value={forgotPassword ? newPassword : password}
            onChange={(e) =>
              forgotPassword
                ? setNewPassword(e.target.value)
                : setPassword(e.target.value)
            }
            required
          />
          <span
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            onClick={() =>
              forgotPassword
                ? setShowNewPassword((prev) => !prev)
                : setShowPassword((prev) => !prev)
            }
          >
            {forgotPassword ? (
              showNewPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )
            ) : showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </span>
        </div>

        {currentState === "Login" && !forgotPassword && (
          <div className="text-sm text-gray-600 mb-4 text-right">
            <span
              className="hover:underline cursor-pointer"
              onClick={() => setForgotPassword(true)}
            >
              Forgot password?
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:scale-105 transition"
        >
          {loading
            ? "Please wait..."
            : forgotPassword
            ? "Reset Password"
            : currentState === "Login"
            ? "Sign In"
            : "Sign Up"}
        </button>

        {!forgotPassword && (
          <div className="text-sm text-center text-gray-600 mt-4">
            {currentState === "Login" ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => {
                    setCurrentState("Sign Up");
                  }}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => {
                    setCurrentState("Login");
                  }}
                >
                  Login here
                </span>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
