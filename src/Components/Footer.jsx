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

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 pt-8 pb-2 border-t border-gray-300 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Company Info with Logo */}
        <div className="flex flex-col items-center sm:items-start space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="GadgetzWorld Logo"
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-xl font-bold">𝑮𝒂𝒅𝒈𝒆𝒕𝒛𝑾𝒐𝒓𝒍𝒅</h2>
          </div>
          <div className="text-sm text-center sm:text-left space-y-1">
            <p>
              Contact:{" "}
              <a
                href="tel:+8801814197707"
                className="hover:text-black transition"
              >
                +880 1814 197 707
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:your.email@example.com"
                className="hover:text-black transition"
              >
                your.email@example.com
              </a>
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center sm:items-start space-y-3">
          <h3 className="font-semibold text-lg text-[#629D23] mb-1">Quick Link</h3>
          <Link
            to="/"
            className="hover:text-black transition flex items-center space-x-2"
          >
            <FaHome /> <span>Home</span>
          </Link>
          <Link
            to="/about"
            className="hover:text-black transition flex items-center space-x-2"
          >
            <FaInfoCircle /> <span>About</span>
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-black transition flex items-center space-x-2"
          >
            <FaTachometerAlt /> <span>Dashboard</span>
          </Link>
          <Link
            to="/contact"
            className="hover:text-black transition flex items-center space-x-2"
          >
            <FaPhone /> <span>Contact</span>
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center sm:items-start space-y-3">
          <h3 className="font-semibold text-lg text-[#629D23] mb-1">Follow Us</h3>
          <div className="flex space-x-6 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/01814197707"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="hover:text-black transition"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} 𝑮𝒂𝒅𝒈𝒆𝒕𝒛𝑾𝒐𝒓𝒍𝒅. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
