import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPlug,
  FaShippingFast,
  FaGift,
  FaStar,
} from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    try {
      await createUser(email, password);
      await updateUserProfile(name);

      // Save user to database
      const userData = { name, email };
      await axios.post(`http://localhost:5000/users/${email}`, userData);

      toast.success('Account created successfully!');
      form.reset();
      navigate('/');
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4 py-10">
      {/* Sidebar */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#629D23] mb-4 leading-tight">
          Join GadgetzWorld Today!
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 leading-relaxed">
          Get access to the latest and smartest gadgets that simplify your life.
        </p>

        <ul className="text-gray-600 space-y-3 text-left max-w-md mx-auto md:mx-0">
          <li className="flex items-center gap-2">
            <FaPlug className="text-[#629D23] flex-shrink-0" />
            Wide range of electronic accessories
          </li>
          <li className="flex items-center gap-2">
            <FaShippingFast className="text-[#629D23] flex-shrink-0" />
            Fast & secure delivery across Bangladesh
          </li>
          <li className="flex items-center gap-2">
            <FaGift className="text-[#629D23] flex-shrink-0" />
            Exclusive member discounts
          </li>
          <li className="flex items-center gap-2">
            <FaStar className="text-[#629D23] flex-shrink-0" />
            Verified reviews & expert support
          </li>
        </ul>

        <p className="mt-6 text-xs sm:text-sm text-gray-500 max-w-md mx-auto md:mx-0">
          Already have an account? Log in to start shopping and manage your profile!
        </p>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md bg-white text-gray-400 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-500 mb-6">Create Your Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <div className="flex items-center border rounded px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full py-2 focus:outline-none"
                autoComplete="name"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full py-2 focus:outline-none"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="flex items-center border rounded px-3">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full py-2 focus:outline-none"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#629D23] text-white py-2 rounded hover:bg-[#4b7c1a] transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="loading loading-infinity loading-xl text-white"></span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#629D23] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
