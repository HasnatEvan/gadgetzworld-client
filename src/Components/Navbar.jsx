// Import Icons
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
  FaFacebookF,
  FaWhatsapp,
  FaShoppingBag,
} from "react-icons/fa";

// Import Dependencies
import logo from "../../src/assets/Logo/logo.jpg";
import mobileNavbarLogo from "../../src/assets/Logo/mobileNavbarLogo.png";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useRole from "../Hooks/useRole";

// Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [role] = useRole();

  const { data: wishlist = [] } = useQuery({
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
      toast.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="font-sans relative">
      <ToastContainer position="top-center" />

      {/* Mobile Topbar */}
      <div className="block md:hidden bg-white text-gray-800 text-sm px-4 pt-2 text-center border-b border-gray-200">
        <p className="mt-2">Welcome to our Gadget'z World!</p>
        <div className="flex justify-center mt-2 space-x-4 text-xl">
          <a href="https://www.facebook.com/share/15wotKbrH7" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a
            href="mailto:gadgetzworld03@gmail.com"
            className="text-red-600 hover:text-red-800"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>

          <a
            href="https://wa.me/8801607728405"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-700"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Desktop Topbar */}
      <div className="hidden md:flex bg-white text-gray-800 text-sm px-4 py-2 justify-between items-center">
        <span>Welcome to our Gadget'z World!</span>
        <div className="space-x-4">
          <NavLink to="/track-order" className="hover:underline">Track Order</NavLink>
          <NavLink to="/about" className="hover:underline">About Us</NavLink>
          <NavLink to="/contact" className="hover:underline">Contact</NavLink>
          <NavLink to="/faq" className="hover:underline">FAQ</NavLink>
        </div>
      </div>

      {/* Middle Nav */}
      <div className="bg-white text-gray-800 px-4 py-4 flex flex-col md:flex-row items-center justify-between border-b border-gray-100 gap-4">
      <Link to={'/'}>
        <div className="hidden md:flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-20 h-12" />
         
        </div>
      </Link>

        <div className="hidden md:flex flex-wrap justify-end space-x-2">
          {user ? (
            <button onClick={handleLogout} className="text-gray-800 px-4 py-2 flex items-center space-x-2 hover:text-[#4cb648] transition bg-transparent border border-gray-300 rounded">
              <FaUser />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink to="/login" className="text-gray-800 px-4 py-2 flex items-center space-x-2 hover:text-[#4cb648] transition">
              <FaUser />
              <span>Account</span>
            </NavLink>
          )}
          <NavLink to="/wishlist" className="text-gray-800 px-4 py-2 flex items-center space-x-2 relative hover:text-[#4cb648] transition">
            <FaHeart />
            <span>Wishlist</span>
            <span className="absolute -top-1 -right-2 bg-[#4cb648] text-white text-xs px-1 rounded-full">
              {wishlist.length}
            </span>
          </NavLink>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#ef8220] text-white px-4 py-3 -mt-4 flex justify-between items-center">
        <h2 className="md:hidden">
          <img src={mobileNavbarLogo} alt="Mobile Navbar Logo" className="w-24 mx-auto" />
        </h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl md:hidden" aria-label="Toggle menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-semibold text-lg">
          <NavLink to="/" className="flex items-center space-x-1 hover:text-[#0f0f0e]"><FaHome /><span>Home</span></NavLink>
          <NavLink to="/about" className="flex items-center space-x-1 hover:text-[#151514]"><FaInfoCircle /><span>About</span></NavLink>
          {role === "customer" ? (
            <NavLink to="/my-orders" className="flex items-center space-x-1 hover:text-[#121212]"><FaShoppingBag /><span>My Orders</span></NavLink>
          ) : (
            <NavLink to="/dashboard" className="flex items-center space-x-1 hover:text-[#121212]"><FaTachometerAlt /><span>Dashboard</span></NavLink>
          )}
          <NavLink to="/contact" className="flex items-center space-x-1 hover:text-[#050404]"><FaEnvelope /><span>Contact</span></NavLink>
        </nav>

        <div className="hidden md:flex items-center text-sm text-right text-white/90">
          <FaMapMarkerAlt className="mr-2" />
          <span>Delivery: <span className="font-bold">258 FKD Street, Berlin</span></span>
        </div>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-transparent z-40 md:hidden" aria-hidden="true" />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-800 shadow-lg transform transition-transform duration-300 z-50 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`} aria-label="Mobile menu">
        <div className="flex justify-end items-center p-4 border-b border-gray-200">
          <button onClick={() => setMenuOpen(false)} className="text-gray-800 text-2xl" aria-label="Close menu">
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4 font-semibold text-lg">
          <NavLink to="/" className="flex items-center space-x-2 hover:text-[#151312]"><FaHome /><span>Home</span></NavLink>
          <NavLink to="/about" className="flex items-center space-x-2 hover:text-[#1c1c1b]"><FaInfoCircle /><span>About</span></NavLink>
          {role === "customer" ? (
            <NavLink to="/my-orders" className="flex items-center space-x-2 hover:text-[#060606]"><FaShoppingBag /><span>My Orders</span></NavLink>
          ) : (
            <NavLink to="/dashboard" className="flex items-center space-x-2 hover:text-[#060606]"><FaTachometerAlt /><span>Dashboard</span></NavLink>
          )}
          <NavLink to="/contact" className="flex items-center space-x-2 hover:text-[#212121]"><FaEnvelope /><span>Contact</span></NavLink>
          <hr className="border-gray-300 my-2" />
          {user ? (
            <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-800"><FaUser /><span>Logout</span></button>
          ) : (
            <NavLink to="/login" className="flex items-center space-x-2 hover:text-[#ef8220]"><FaUser /><span>Account</span></NavLink>
          )}
          <NavLink to="/wishlist" className="flex items-center space-x-2 relative hover:text-[#ef8220]">
            <FaHeart />
            <span>Wishlist</span>
            <span className="absolute -top-1 -right-2 bg-[#4cb648] text-white text-xs px-1 rounded-full">
              {wishlist.length}
            </span>
          </NavLink>
        </nav>
      </aside>
    </div>
  );
};

export default Navbar;
