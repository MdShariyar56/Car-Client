import { motion } from "framer-motion";
import { Link } from "react-router";

const TopRatedCars = ({ cars = [] }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const topCars = [...cars]
    .sort((a, b) => (b.rentPrice || 0) - (a.rentPrice || 0))
    .slice(0, 3);

  return (
    <section className="my-20 px-4 md:px-12 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
        Top Rated Cars
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {topCars.map((car, i) => (
          <motion.div
            key={car._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer"
            variants={cardVariants}
            whileHover={{
              scale: 1.07,
              y: -8,
              boxShadow: "0px 25px 50px rgba(0,0,0,0.25)",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
          >
            <motion.div
              className="relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-56 w-full object-cover rounded-t-xl transition-transform duration-500"
              />
            </motion.div>

            <div className="p-5">
              <h3 className="font-bold text-xl text-gray-800">{car.name}</h3>
              <p className="text-yellow-500 font-semibold mt-1">
                ${car.rentPrice || 50}/day
              </p>
              <p className="text-gray-600 font-medium mt-1">Type: {car.category || "Sedan"}</p>
              <p className="text-gray-700 font-medium mt-1">
                Provider: {car.providerName || "N/A"}
              </p>
              <div className="mt-4 text-right">
                <Link
                  to={`/cars/${car._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TopRatedCars;
