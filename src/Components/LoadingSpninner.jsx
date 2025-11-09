import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json"; 

const LoadingSpninner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Lottie animationData={loaderAnimation} loop={true} />
    </div>
  );
};

export default LoadingSpninner;
