import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/NoData.json"; 

const NoData = () => {
  return (
    <div className="flex justify-center items-center py-10  bg-blue-100">
      <Lottie animationData={loaderAnimation} loop={true} />
    </div>
  );
};

export default NoData;
