import {
  FaSearch,
  FaUser,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaTachometerAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: wishlist = [],
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  const handleLogout = async () => {
    try {
      await logOut();
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="font-sans relative">
      {/* Topbar for desktop */}
      <div className="hidden md:flex bg-white text-gray-800 text-sm px-4 py-2 justify-between items-center">
        <span>Welcome to our GadgetzWorld!</span>
        <div className="space-x-4">
          <NavLink to="/track-order" className="hover:underline">
            Track Order
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About Us
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
          <NavLink to="/faq" className="hover:underline">
            FAQ
          </NavLink>
        </div>
      </div>

      {/* Middle Nav */}
      <div className="bg-white text-gray-800 px-4 py-4 flex flex-col md:flex-row items-center justify-between border-b border-gray-100 gap-4">
        {/* Logo (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-2">
          <img
            src="https://i.ibb.co/4grztcp/logo-icon.png"
            alt="logo"
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold whitespace-nowrap">
            <span className="text-[#629D23]">Gadgetz</span>World
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex w-full md:w-1/2 items-center">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full py-2 px-4 text-gray-800 outline-none border border-gray-200 rounded-l"
          />
          <button className="bg-[#629D23] text-white px-5 py-2 flex items-center rounded-r whitespace-nowrap hover:bg-[#51711A] transition">
            Search <FaSearch className="ml-2" />
          </button>
        </div>

        {/* Right Buttons (Desktop Only) */}
        <div className="hidden md:flex flex-wrap justify-end space-x-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-800 px-4 py-2 flex items-center space-x-2 hover:text-[#629D23] transition bg-transparent border border-gray-300 rounded"
            >
              <FaUser />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-gray-800 px-4 py-2 flex items-center space-x-2 hover:text-[#629D23] transition"
            >
              <FaUser />
              <span>Account</span>
            </NavLink>
          )}

          <NavLink
            to="/wishlist"
            className="text-gray-800 px-4 py-2 flex items-center space-x-2 relative hover:text-[#629D23] transition"
          >
            <FaHeart />
            <span>Wishlist</span>
            <span className="absolute -top-1 -right-2 bg-[#629D23] text-white text-xs px-1 rounded-full">
              {wishlist.length}
            </span>
          </NavLink>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#629D23] text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white whitespace-nowrap md:hidden">
          GadgetzWorld
        </h2>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className="hidden md:flex space-x-6 font-semibold text-lg">
          <NavLink to="/" className="flex items-center space-x-1 hover:text-white/80">
            <FaHome />
            <span>Home</span>
          </NavLink>
          <NavLink to="/about" className="flex items-center space-x-1 hover:text-white/80">
            <FaInfoCircle />
            <span>About</span>
          </NavLink>
          <NavLink to="/dashboard" className="flex items-center space-x-1 hover:text-white/80">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/contact" className="flex items-center space-x-1 hover:text-white/80">
            <FaEnvelope />
            <span>Contact</span>
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center text-sm text-right text-white/90">
          <FaMapMarkerAlt className="mr-2" />
          <span>
            Delivery: <span className="font-bold">258 FKD Street, Berlin</span>
          </span>
        </div>
      </div>

      {/* Sidebar + Overlay for mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-transparent z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-800 shadow-lg transform transition-transform duration-300 z-50 md:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="Mobile menu"
      >
        <div className="flex justify-end items-center p-4 border-b border-gray-200">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-800 text-2xl"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4 font-semibold text-lg">
          <NavLink to="/" className="flex items-center space-x-2 hover:text-[#629D23]">
            <FaHome />
            <span>Home</span>
          </NavLink>
          <NavLink to="/about" className="flex items-center space-x-2 hover:text-[#629D23]">
            <FaInfoCircle />
            <span>About</span>
          </NavLink>
          <NavLink to="/dashboard" className="flex items-center space-x-2 hover:text-[#629D23]">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/contact" className="flex items-center space-x-2 hover:text-[#629D23]">
            <FaEnvelope />
            <span>Contact</span>
          </NavLink>

          <hr className="border-gray-300 my-2" />

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800"
            >
              <FaUser />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink to="/login" className="flex items-center space-x-2 hover:text-[#629D23]">
              <FaUser />
              <span>Account</span>
            </NavLink>
          )}

          <NavLink to="/wishlist" className="flex items-center space-x-2 relative hover:text-[#629D23]">
            <FaHeart />
            <span>Wishlist</span>
            <span className="absolute -top-1 -right-2 bg-[#629D23] text-white text-xs px-1 rounded-full">
              {wishlist.length}
            </span>
          </NavLink>
        </nav>
      </aside>
    </div>
  );
};

export default Navbar;
