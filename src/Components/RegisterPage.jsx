import React, { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../FireBase/firebase.config";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔹 Password validation
    const uppercaseReg = /[A-Z]/;
    const lowercaseReg = /[a-z]/;

    if (password.length < 6) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long.",
        confirmButtonColor: "#d33",
      });
    }

    if (!uppercaseReg.test(password)) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must contain at least one uppercase letter.",
        confirmButtonColor: "#d33",
      });
    }

    if (!lowercaseReg.test(password)) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must contain at least one lowercase letter.",
        confirmButtonColor: "#d33",
      });
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });

      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      setLoading(false);

      let errorMessage = "Something went wrong. Please try again.";

      if (err.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please use another one or login instead.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid. Please enter a valid email.";
      } else if (err.code === "auth/weak-password") {
        errorMessage =
          "Your password is too weak. Please use at least 6 characters with uppercase, lowercase, and numbers.";
      } else if (err.code === "auth/missing-password") {
        errorMessage = "Please enter your password.";
      } else if (err.code === "auth/network-request-failed") {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8 border border-blue-200 select-none mt-10 mb-10">
        <div className="w-55 h-10 mx-auto flex items-center justify-center mb-2">
          <img
            src="https://i.ibb.co/DH1srVG6/Gemini-Generated-Image-ycpm1xycpm1xycpm-removebg-preview.png"
            alt="logo"
          />
        </div>
        <h2 className="text-3xl font-semibold text-center text-black mb-2">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Register to start your RentWheels journey
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-black font-semibold mb-1 select-none">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-1">Email Address</label>
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

          <div>
            <label className="block text-black font-semibold mb-1 select-none">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Paste your photo link"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="relative">
            <label className="block text-black font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter a strong password"
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
            <p className="text-xs text-gray-500 mt-1">
              Must contain at least one uppercase, one lowercase, and at least 6 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all duration-300 flex justify-center items-center gap-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <div className="w-1/3 border-t border-gray-300"></div>
          <span className="mx-2 text-gray-800 text-sm">or</span>
          <div className="w-1/3 border-t border-gray-300"></div>
        </div>

        <button className="w-full mt-4 border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline hover:text-blue-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
