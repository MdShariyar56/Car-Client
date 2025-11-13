import React, { useEffect, useState } from "react";
import LoadingSpninner from "./LoadingSpninner";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/NotFound.json";
import { MdBookmarkAdd } from "react-icons/md";
import { IoCaretBackSharp } from "react-icons/io5";

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpninner />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-center text-white px-6">
      <div className="w-80 md:w-230">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-blue-500 mt-4 drop-shadow-lg">
        404 - Page Not Found
      </h1>

      <p className="text-gray-300 mt-3 max-w-md">
        Oops! The page you’re looking for doesn’t exist or might have been moved.
      </p>

      <a
        href="/"
        className="mt-6 inline-block bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out"
      >
         <div className="flex  gap-2  items-center">
                             <IoCaretBackSharp size={20} /> Go Back Home
                     </div>
        
      </a>

      <p className="text-gray-500 text-sm mt-6">
        You can always return to the homepage and explore available cars 🚗
      </p>
    </div>
  );
};

export default NotFound;
