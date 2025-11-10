import React, { useEffect, useState } from "react";
import LoadingSpninner from "../Components/LoadingSpninner";
import HeroSlider from "./HeroSlider";
import { motion } from "framer-motion";
import { Link } from "react-router";
import WhyRentWithUs from "./WhyRentWithUs";
import TopRatedCars from "./TopRatedCars";
import Testimonials from "./Testimonials";

const Home = () => {
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
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpninner />;
  if (!cars || cars.length === 0)
    return <p className="text-center mt-10">No cars found</p>;

  const featuredCars = cars.slice(-6).reverse();
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-blue-50">
      <div className="container mx-auto px-4 mb-4">
        <HeroSlider />
      </div>


      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Featured Cars
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {featuredCars.map((car) => (
            <motion.div
              key={car._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer relative"
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

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
                <p className="text-gray-600 mt-2">
                  {car.description.slice(0, 80)}...
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-semibold text-blue-600">
                    ${car.rentPrice}/day
                  </span>
                  <span className="text-sm text-gray-500">{car.location}</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-700 font-medium">
                    Provider: {car.providerName}
                  </p>
                  <Link
                    to={`/cars/${car._id}`}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      car.status === "Available"
                        ? "bg-yellow-500 text-black hover:bg-yellow-600"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                  >
                    {car.status === "Available" ? "Book Now" : "Unavailable"}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-10">
          <Link
            to="/cars"
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            Show All Cars
          </Link>
        </div>
      </div>

      {/* Other Sections */}
      <div className="container mx-auto px-4 py-2">
        <WhyRentWithUs />
        <TopRatedCars cars={cars} />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
