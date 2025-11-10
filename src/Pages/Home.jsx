import React, { useEffect, useState } from "react";
import HeroSlider from "./HeroSlider";
import { motion } from "framer-motion";
import { Link } from "react-router";
import WhyRentWithUs from "./WhyRentWithUs";
import TopRatedCars from "./TopRatedCars";
import Testimonials from "./Testimonials";
import LoadingSpninner from "../Components/LoadingSpninner";
import NoData from "../Components/NoData";


function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/cars?limit=6&sort=-createdAt")
      .then((res) => res.json())
      .then((data) => {
        const latest6 = data.slice(-6).reverse();
        setCars(latest6);
        setFilteredCars(latest6);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleSearch = debounce(() => {
      if (search.trim() === "") {
        setFilteredCars(cars);
      } else {
        const filtered = cars.filter((car) =>
          car.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCars(filtered);
      }
    }, 100);
    handleSearch();
  }, [search, cars]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpninner />
    </div>
  );
}
if (!cars || cars.length === 0) return <p className="text-center mt-10"><NoData></NoData> </p>;

  return (
    <div className="bg-blue-50">
      <div className="container mx-auto px-4 mb-4">
        <HeroSlider />
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          Featured Cars
        </h2>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search cars by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[500px] bg-gray-200 animate-pulse rounded-xl"
              ></div>
            ))}
          </div>
        ) : filteredCars.length === 0 ? (
          <div className=""><NoData></NoData> </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {filteredCars.map((car) => (
              <motion.div
                key={car._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer flex flex-col h-[500px]"
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
                    loading="lazy"
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

 
        <div className="flex justify-center mt-10">
          <Link
            to="/Browsercars"
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            Show All Cars
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-2">
        <WhyRentWithUs />
        <TopRatedCars cars={cars} />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
