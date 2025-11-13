import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import LoadingSpninner from "../Components/LoadingSpninner";
import NoData from "../Components/NoData";

const MyBookings = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
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
    fetchBookings();
  }, [user]);

  if (loading) return <LoadingSpninner />;
  if (bookings.length === 0) return <NoData />;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Car Name</th>
              <th>Rent Price</th>
              <th>Provider</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id} className="hover">
                <td>{i + 1}</td>
                <td>{b.carName}</td>
                <td>${b.rentPrice}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
