import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import LoadingSpninner from "../Components/LoadingSpninner";
import NoData from "../Components/NoData";
import Swal from "sweetalert2";

const MyBookings = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user) return;
    try {
      const res = await fetch(
        `https://cars-server-wine.vercel.app/bookings?userEmail=${user.email}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId) => {
    console.log("Cancelling booking:", bookingId);
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `https://cars-server-wine.vercel.app/bookings/${bookingId}`,
          { method: "DELETE" }
          
        );
        const data = await res.json();
        if (data.success || data.message === "Booking deleted successfully") {
          Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
          fetchBookings(); // Refresh the list
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", err.message || "Failed to cancel booking", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpninner />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-blue-50 min-h-screen flex justify-center items-center">
        <NoData />
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen py-8 px-4 sm:px-6 lg:p-20 ">
      <h2 className="text-3xl font-bold text-center mb-6">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th>#</th>
              <th>Car Name</th>
              <th>Rent Price</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id} className="hover">
                <td className="font-bold">{i + 1}</td>
                <td>{b.carName}</td>
                <td className="text-black font-semibold"><span className="font-bold text-blue-600">$ </span>{b.rentPrice}<span className="font-bold text-blue-600">/day </span></td>
                <td>{b.providerName}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      b.status === "Booked" ? "bg-green-600" : "bg-gray-500"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => handleCancel(b._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
