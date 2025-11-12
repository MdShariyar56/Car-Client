import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpninner from "../Components/LoadingSpninner";
import { useParams } from "react-router";
import NoData from "../Components/NoData";
import { getAuth } from "firebase/auth";

const ViewDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`https://cars-server-wine.vercel.app/cars/${id}`);
        if (!res.ok) throw new Error("Failed to fetch car details");
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch car details",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpninner />
      </div>
    );
  }

  if (!car) {
    return (
      <p className="text-center mt-10 text-red-500">
        <NoData />
      </p>
    );
  }

  const handleBooking = async () => {
    try {
      const bookingData = {
        carId: car._id,
        carName: car.name,
        rentPrice: car.rentPrice,
        providerName: car.providerName,
        providerEmail: car.providerEmail,
       userEmail: user.email ,  
       userName:  user.displayName ,      
        status: "Booked",
      };

      const res = await fetch("https://cars-server-wine.vercel.app/bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Booked Successfully!",
          text: "Your booking has been saved.",
          confirmButtonColor: "#3085d6",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: err.message || "Something went wrong.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="bg-blue-50 py-10">
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-3xl font-bold mb-4">{car.name}</h2>
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p><strong>Description:</strong> {car.description}</p>
        <p><strong>Category:</strong> {car.category}</p>
        <p><strong>Rent Price:</strong> ${car.rentPrice}</p>
        <p><strong>Location:</strong> {car.location}</p>
        <p><strong>Status:</strong> {car.status || "Available"}</p>
        <p><strong>Provider Name:</strong> {car.providerName}</p>
        <p><strong>Provider Email:</strong> {car.providerEmail}</p>

        <button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ViewDetails;
