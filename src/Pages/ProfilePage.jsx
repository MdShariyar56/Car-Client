import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { auth } from "../FireBase/firebase.config";
import LoadingSpninner from "../Components/LoadingSpninner";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhotoChange = (e) => setPhotoURL(e.target.value);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "User",
          email: currentUser.email,
          photo: currentUser.photoURL || "https://i.ibb.co/7d04Jj8v/default.png",
        });
        setName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    const confirm = await Swal.fire({
      title: "Confirm Update",
      text: "Do you want to update your profile?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      setUser({
        ...user,
        name: name,
        photo: photoURL,
      });

      setEditing(false);
      Swal.fire("Updated!", "Your profile has been updated successfully.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update profile. Try again later.", "error");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
        <LoadingSpninner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white px-6">
      <img
        src={user.photo}
        alt={user.name}
        className="w-32 h-32 rounded-full border-4 border-blue-400"
      />
      <h2 className="text-4xl font-bold py-5">Name : {user.name}</h2>
      <p className="text-lg mb-4">Email : {user.email}</p>

      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-500 px-5 py-2 rounded-md text-white font-semibold hover:bg-orange-600 transition"
        >
          Update Information
        </button>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="flex flex-col gap-4 mt-6 w-full max-w-sm bg-gray-100 p-5 rounded-lg"
        >
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter new name"
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            value={photoURL}
            onChange={handlePhotoChange}
            placeholder="Enter new photo URL"
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div className="flex gap-3 justify-center">
            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                Swal.fire("Cancelled", "Profile update cancelled.", "info");
              }}
              className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
