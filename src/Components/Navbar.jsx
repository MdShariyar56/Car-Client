import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = ({ user = null, onLogout = () => {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive
        ? "text-green-400 font-semibold bg-gray-700"
        : "text-gray-200 hover:text-green-400 hover:bg-gray-700"
    }`;

  const authLinkClass = ({ isActive }) =>
    `block px-4 py-2 text-sm font-semibold rounded border transition text-center ${
      isActive
        ? "bg-green-500 text-white border-green-500"
        : "text-green-400 border-green-500 hover:bg-green-600 hover:text-white"
    }`;

  return (
    <nav className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 fixed w-full z-50 shadow">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/5g8L5x5F/60860.jpg"
              alt="RentWheels Logo"
              className="w-12 h-12 rounded"
            />
            <Link to="/" className="text-2xl font-bold text-green-400 hover:text-green-300">
              RentWheels
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
            <NavLink to="/my-bookings" className={navLinkClass}>
              My Bookings
            </NavLink>
            <NavLink to="/browse" className={navLinkClass}>
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
                    className="w-10 h-10 rounded-full border-2 border-green-400 hover:scale-105 transition"
                  />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-3 w-56 bg-gray-800 border border-gray-700 rounded shadow-lg py-2 z-40"
                    onMouseLeave={() => setProfileOpen(false)}
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
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout();
                      }}
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
              <svg className="w-7 h-7 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-3">
          <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/add-car" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Add Car
          </NavLink>
          <NavLink to="/my-listings" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            My Listings
          </NavLink>
          <NavLink to="/my-bookings" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            My Bookings
          </NavLink>
          <NavLink to="/browse" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Browse Cars
          </NavLink>

           <NavLink to="/login" className={authLinkClass} onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className={authLinkClass} onClick={() => setMenuOpen(false)}>
                Signup
              </NavLink>
        </div>
      )}
    </nav>
    );
};

export default Navbar;