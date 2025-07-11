import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSignInAlt,
  FaEnvelope,
  FaLock,
  FaPlug,
  FaShippingFast,
  FaGift,
  FaStar,
} from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    signIn(email, password)
      .then(() => {
        toast.success('Login successful!');
        setLoading(false);
        navigate('/'); // লগইন সফল হলে হোম বা ড্যাশবোর্ডে নিয়ে যাবে
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4 py-10">
      {/* Sidebar Content */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#629D23] mb-4 leading-tight">
          Welcome to GadgetzWorld
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 leading-relaxed">
          Discover the most advanced gadgets that make your life easier, smarter, and more exciting.
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
            Special discounts for registered members
          </li>
          <li className="flex items-center gap-2">
            <FaStar className="text-[#629D23] flex-shrink-0" />
            Verified customer reviews & support
          </li>
        </ul>

        <p className="mt-6 text-xs sm:text-sm text-gray-500 max-w-md mx-auto md:mx-0">
          Already a member? Log in to continue shopping or manage your profile!
        </p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md bg-white text-gray-400 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-500 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded px-3">
              <FaEnvelope className="text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
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
              <FaLock className="text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full py-2 focus:outline-none"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#629D23] text-white py-2 rounded hover:bg-[#4b7c1a] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="loading loading-infinity loading-xl"></span>
            ) : (
              <>
                <FaSignInAlt />
                Login
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#629D23] font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
