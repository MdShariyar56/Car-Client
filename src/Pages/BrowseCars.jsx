import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import LoadingSpninner from "../Components/LoadingSpninner";
import NoData from "../Components/NoData";
import { motion } from "framer-motion";
import { MdLocationPin } from "react-icons/md";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching cars:", err);
        setLoading(false);
      });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <LoadingSpninner />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[500px] bg-gray-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoData />
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Browse All Cars
      </h2>

      <motion.div
        className="  mx-auto px-4 lg:mb-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {cars.map((car) => (
          <motion.div
            key={car._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-[500px] cursor-pointer"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <img
                src={car.image}
                alt={car.name}
                className="h-56 w-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {car.category}
              </span>
              <span
                className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                  car.status === "Available"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {car.status || "Available"}
              </span>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-bold text-gray-800 truncate">
                  {car.name}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {car.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-semibold text-blue-600">
                    ${car.rentPrice}/day
                  </span>
                   <span className="text-sm text-gray-700 flex items-center gap-1">
                                              <MdLocationPin  className="text-red-700" />
                                              {car.location}  
                                          </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-700 font-medium">
                    Provider: {car.providerName}
                  </p>
                  <Link
                     to={`/cars/${car._id}`}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-500 text-black hover:bg-yellow-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BrowseCars;
