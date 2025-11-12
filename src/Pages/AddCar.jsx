import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Auth } from "../Components/AuthContext";
import LoadingSpninner from "../Components/LoadingSpninner";

const AddCar = () => {
  const { user, loading: authLoading } = Auth(); 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Sedan",
    rentPrice: "",
    location: "",
    image: "",
    providerName: "",
    providerEmail: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        providerName: user.displayName || "",
        providerEmail: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://cars-server-wine.vercel.app/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add car");

      Swal.fire({
        icon: "success",
        title: "Car Added!",
        text: "Your car has been added successfully.",
        confirmButtonColor: "#3085d6",
      });

      setFormData((prev) => ({
        name: "",
        description: "",
        category: "Sedan",
        rentPrice: "",
        location: "",
        image: "",
        providerName: prev.providerName,
        providerEmail: prev.providerEmail,
      }));
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message || "Could not add the car. Try again!",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="text-center py-20"><LoadingSpninner></LoadingSpninner></div>;
  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500"><NoData/></p>
    );
  }
  return (
    <div className="bg-blue-50 min-h-screen py-8 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-center text-gray-800">
          Add New Car
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Car Name</label>
            <input
              type="text"
              name="name"
              placeholder="CarName"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Description......."
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Sedan</option>
                <option>SUV</option>
                <option>Hatchback</option>
                <option>Luxury</option>
                <option>Electric</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Rent Price (per day)</label>
              <input
                type="number"
                placeholder="Price"
                name="rentPrice"
                value={formData.rentPrice}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/car.jpg"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Provider Name</label>
              <input
                type="text"
                name="providerName"
                value={formData.providerName}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Provider Email</label>
              <input
                type="email"
                name="providerEmail"
                value={formData.providerEmail}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 font-semibold rounded-lg text-white transition ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding..." : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
