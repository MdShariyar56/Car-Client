import React, {useState } from "react";
import { FaEye, FaEyeSlash, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router";



const RegisterPage = () => {

    const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8 border border-green-200 select-none mt-10 mb-10">
         <div className="w-55 h-10   mx-auto flex items-center justify-center mb-2">
                        <img src="https://i.ibb.co/DH1srVG6/Gemini-Generated-Image-ycpm1xycpm1xycpm-removebg-preview.png" alt="" />
                    </div>
        <h2 className="text-3xl font-semibold text-center text-black mb-2">
          Create an Account 
        </h2>
        <p className="text-center text-gray-600 mb-6">
           Register to start your RentWheels journey
        </p>

        <form  className="space-y-4">
             <div>
            <label className="block text-black font-semibold mb-1 select-none">Full Name</label>
            <input 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
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
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

           <div className="relative">
                       <label className="block text-black font-semibold mb-1 ">Password</label>
                       <input   type={showPassword ? "text" : "password"} name="password" placeholder="Enter a strong password" className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"  />
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
            
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all duration-300 flex justify-center items-center gap-2 `}
            >
                Login
            </button>

        </form>

        <div className="flex items-center justify-center mt-4">
          <div className="w-1/3 border-t border-gray-300"></div>
          <span className="mx-2 text-gray-800 text-sm">or</span>
          <div className="w-1/3 border-t border-gray-300"></div>
        </div>

        <button
        
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
