import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpninner from "../Components/LoadingSpninner";
import { useNavigate, useParams } from "react-router";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://cars-server-wine.vercel.app/cars/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Car not found");
        return res.json();
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to load car details", "error");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedCar = {
      name: form.name.value,
      description: form.description.value,
      category: form.category.value,
      rentPrice: parseInt(form.rentPrice.value), 
      location: form.location.value,
      image: form.image.value,
      status: form.status.value,
    };

    try {
      console.log("Updating car:", id, updatedCar); 
      const res = await fetch(`https://cars-server-wine.vercel.app/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCar),
      });

      if (!res.ok) throw new Error("Failed to update car");

      Swal.fire("Success!", "Car updated successfully", "success");
      navigate("/my-listings");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Could not update car", "error");
    }
  };

  if (loading) return <LoadingSpninner />;

  return (
    <div className="flex justify-center items-center bg-blue-50 min-h-screen px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Update Car Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Car Name</label>
            <input type="text" name="name" defaultValue={car.name} className="w-full p-3 border rounded-lg" required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea name="description" defaultValue={car.description} className="w-full p-3 border rounded-lg" rows="3"></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <select name="category" defaultValue={car.category} className="w-full p-3 border rounded-lg">
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Rent Price (per day)</label>
              <input type="number" name="rentPrice" defaultValue={car.rentPrice} className="w-full p-3 border rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Location</label>
              <input type="text" name="location" defaultValue={car.location} className="w-full p-3 border rounded-lg" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Status</label>
              <select name="status" defaultValue={car.status || "Available"} className="w-full p-3 border rounded-lg">
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input type="text" name="image" defaultValue={car.image} className="w-full p-3 border rounded-lg" />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
            Update Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
