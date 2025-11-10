import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json";

const LoadingSpninner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <Lottie animationData={loaderAnimation} loop={true} />
    </div>
  );
};

export default LoadingSpninner;
