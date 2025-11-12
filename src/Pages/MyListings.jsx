import React, { useEffect, useState } from "react";
import { Auth } from "../Components/AuthContext";
import Swal from "sweetalert2";
import LoadingSpninner from "../Components/LoadingSpninner";
import NoData from "../Components/NoData";
import { useNavigate } from "react-router";

const MyListings = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = Auth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://cars-server-wine.vercel.app/cars/");
      const data = await res.json();
      const myCars = data.filter((car) => car.providerEmail === user.email);
      setCars(myCars);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not fetch cars", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCars();
  }, [user]);

  const handleDelete = async (carId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This car will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://cars-server-wine.vercel.app/cars/${carId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete car");
        Swal.fire("Deleted!", "Car has been deleted.", "success");
        fetchCars();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", err.message || "Could not delete car", "error");
      }
    }
  };

  const handleUpdate = (car) => {
    navigate(`/update/${car._id}`);
  };

  if (authLoading) return <LoadingSpninner />;

  return (
    <div className="bg-blue-50 min-h-screen py-8 px-4 sm:px-6 lg:px-20">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpninner />
        </div>
      ) : cars.length === 0 ? (
        <p className="text-center text-gray-700 mt-10">
          <NoData />
        </p>
      ) : (
        <div className="overflow-x-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            My Listings
          </h2>
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Car Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Rent Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{car.name}</td>
                  <td className="py-3 px-4">{car.category}</td>
                  <td className="py-3 px-4">${car.rentPrice}/day</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                        car.status === "Booked" ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {car.status || "Available"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleUpdate(car)}
                      className="px-3 py-1 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyListings;
