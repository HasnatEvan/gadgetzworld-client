import {
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaTachometerAlt,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../src/assets/Logo/logo.jpg";
import useRole from "../Hooks/useRole";

const Footer = () => {
  const [role] = useRole();

  return (
    <footer className="bg-white text-gray-600 pt-6 pb-4 border-t border-gray-300 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {/* Company Info with Logo */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <div className="flex items-center justify-center sm:justify-start">
            <img
              src={logo}
              alt="GadgetzWorld Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full"
            />
          </div>
          <div className="text-sm text-center sm:text-left space-y-2">
            <p>
              Contact:{" "}
              <a
                href="tel:+8801814197707"
                className="hover:text-[#ef8220] transition"
              >
                +8801607728405
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:gadgetzworld03@gmail.com"
                className="hover:text-[#ef8220] transition"
              >
                gadgetzworld03@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center sm:items-start space-y-3">
          <h3 className="font-semibold text-base sm:text-lg text-[#ef8220] mb-2">
            Quick Link
          </h3>

          <Link
            to="/"
            className="hover:text-[#ef8220] transition flex items-center space-x-2 text-sm sm:text-base"
          >
            <FaHome className="text-[#ef8220] hover:text-black transition" />
            <span>Home</span>
          </Link>

          <Link
            to="/about"
            className="hover:text-[#ef8220] transition flex items-center space-x-2 text-sm sm:text-base"
          >
            <FaInfoCircle className="text-[#ef8220] hover:text-black transition" />
            <span>About</span>
          </Link>

          {/* Role-Based Dashboard/My Orders */}
          {role === "customer" ? (
            <Link
              to="/my-orders"
              className="hover:text-[#ef8220] transition flex items-center space-x-2 text-sm sm:text-base"
            >
              <FaTachometerAlt className="text-[#ef8220] hover:text-black transition" />
              <span>My Orders</span>
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="hover:text-[#ef8220] transition flex items-center space-x-2 text-sm sm:text-base"
            >
              <FaTachometerAlt className="text-[#ef8220] hover:text-black transition" />
              <span>Dashboard</span>
            </Link>
          )}

          <Link
            to="/contact"
            className="hover:text-[#ef8220] transition flex items-center space-x-2 text-sm sm:text-base"
          >
            <FaPhone className="text-[#ef8220] hover:text-black transition" />
            <span>Contact</span>
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center sm:items-start space-y-3">
          <h3 className="font-semibold text-base sm:text-lg text-[#ef8220] mb-2">
            Follow Us
          </h3>
          <div className="flex space-x-4 sm:space-x-6 text-xl sm:text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/8801607728405"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-700 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:gadgetzworld03@gmail.com"
              className="text-red-600 hover:text-red-800 transition"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-gray-300 pt-4 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} 𝑮𝒂𝒅𝒈𝒆𝒕𝒛𝑾𝒐𝒓𝒍𝒅. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
