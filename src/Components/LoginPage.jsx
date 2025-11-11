import React, { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../FireBase/firebase.config";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    let errorMessage = "";

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${user.displayName || "User"}!`,
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/"); 
      });
    } catch (error) {
      setLoading(false);

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please check your email.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email. Please register first.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid credentials. Please check your login method.";
          break;
        case "auth/popup-closed-by-user":
          errorMessage = "You closed the Google login popup. Please try again.";
          break;
        default:
          errorMessage = `Something went wrong: ${error.message}`;
      }

      Swal.fire({
        icon: error.code === "auth/popup-closed-by-user" ? "info" : "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });

      setPassword("");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      if (res._tokenResponse.isNewUser) {
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: `Hello, ${user.displayName || "New User"}! Your account has been created.`,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Already Registered",
          text: `Hello again, ${user.displayName || "User"}! You are already registered.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
      navigate("/"); 
    } catch (err) {
      let message = "";
      if (err.code === "auth/popup-closed-by-user") {
        message = "You closed the Google login popup. Please try again.";
        Swal.fire({
          icon: "info",
          title: "Sign-in Cancelled",
          text: message,
          confirmButtonColor: "#3085d6",
        });
      } else {
        message = "Google sign-in failed: " + err.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8 border border-blue-200 select-none mt-10 mb-10">
        <div className="w-55 h-10 mx-auto flex items-center justify-center mb-2">
          <img
            src="https://i.ibb.co/DH1srVG6/Gemini-Generated-Image-ycpm1xycpm1xycpm-removebg-preview.png"
            alt="logo"
          />
        </div>

        <h2 className="text-3xl font-semibold text-center text-black mb-2">
          Welcome to RentWheels
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your RentWheels account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-black font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border text-gray-800 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-black font-semibold mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-10 text-gray-800 hover:text-gray-800"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all duration-300 flex justify-center items-center gap-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <div className="w-1/3 border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="w-1/3 border-t border-gray-300"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full mt-4 border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline hover:text-blue-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
