import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { auth } from "../FireBase/firebase.config";
import { signOut } from "firebase/auth";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setProfileOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `block px-2 py-2 rounded transition ${
      isActive
        ? "text-white font-semibold bg-blue-700"
        : "text-black  font-semibold hover:bg-blue-700 hover:text-white"
    }`;

  const authLinkClass = ({ isActive }) =>
    `block px-4 py-2 text-sm font-semibold rounded border transition text-center ${
      isActive
        ? "bg-blue-500 text-black border-blue-500"
        : "text-black border-blue-500 hover:bg-blue-600 hover:text-black"
    }`;

  return (
    <nav className="bg-white border-gray-200 text-gray-800 fixed w-full z-50 shadow">
      <div className="mx-auto px-4 lg:px-15">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-1">
            <Link to="/" className="">
              <img
                src="https://i.ibb.co/DH1srVG6/Gemini-Generated-Image-ycpm1xycpm1xycpm-removebg-preview.png"
                alt="RentWheels Logo"
                className="w-72 h-62 rounded"
              />
            </Link>
          </div>

         
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/add-car" className={navLinkClass}>
              Add Car
            </NavLink>
            <NavLink to="/my-listings" className={navLinkClass}>
              My Listings
            </NavLink>
            <NavLink to="/bookings" className={navLinkClass}>
              My Bookings
            </NavLink>
            <NavLink to="/browserCars" className={navLinkClass}>
              Browse Cars
            </NavLink>
          </div>

   
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <NavLink to="/login" className={authLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={authLinkClass}>
                  Signup
                </NavLink>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-3 focus:outline-none"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png"}
                    alt={user.displayName || user.email}
                    className="w-11 h-11 rounded-full border-2 border-blue-600 hover:scale-105 transition"
                  />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-3 w-56 bg-gray-800 border border-gray-700 rounded shadow-lg py-2 z-40"
                  >
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-semibold text-gray-200">
                        {user.displayName || "No Name"}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-700 text-gray-200"
                      onClick={() => setProfileOpen(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white text-red-400"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>


          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((s) => !s)}
              className="p-1 rounded focus:outline-none"
            >
              <svg
                className="w-7 h-7 text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-gray-200 text-gray-800 border-t px-6 py-4 space-y-3">
          <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/add-car" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Add Car
          </NavLink>
          <NavLink to="/my-listings" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            My Listings
          </NavLink>
          <NavLink to="/bookings" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            My Bookings
          </NavLink>
          <NavLink to="/browserCars" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Browse Cars
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={authLinkClass} onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className={authLinkClass} onClick={() => setMenuOpen(false)}>
                Signup
              </NavLink>
            </>
          ) : (
            <div className="pt-2 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png"}
                    alt={user.displayName || user.email}
                    className="w-10 h-10 rounded-full border-2 border-blue-400"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-200">{user.displayName || "No Name"}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
