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
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('অবৈধ ইমেইল ঠিকানা।');
      return;
    }

    setLoading(true);
    signIn(email, password)
      .then(() => {
        toast.success('Login successful!');
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code || '';
        let message = 'লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।';

        if (errorCode === 'auth/wrong-password') {
          message = 'ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।';
        } else if (errorCode === 'auth/user-not-found') {
          message = 'এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।';
        } else if (errorCode === 'auth/invalid-email') {
          message = 'অবৈধ ইমেইল ঠিকানা।';
        } else if (errorCode === 'auth/invalid-credential') {
          message = 'ভুল তথ্য প্রদান করা হয়েছে।';
        } else if (errorCode === 'auth/too-many-requests') {
          message = 'অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।';
        }

        toast.error(message);
        setLoading(false);
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error('Please enter your email');
      return;
    }
    setResetLoading(true);
    resetPassword(resetEmail)
      .then(() => {
        toast.success('Password reset email sent! Check your inbox.');
        setResetLoading(false);
        setShowResetModal(false);
        setResetEmail('');
      })
      .catch((error) => {
        toast.error(error.message);
        setResetLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4 py-10 gap-10">
      {/* Sidebar Content */}
      <div className="w-full md:w-1/2 max-w-lg text-center md:text-left px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-600 mb-6 leading-tight">
          Welcome to Gadget'z World
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
          Discover the most advanced gadgets that make your life easier, smarter, and more exciting.
        </p>

        <ul className="text-gray-600 space-y-4 text-left max-w-md mx-auto md:mx-0">
          <li className="flex items-center gap-3">
            <FaPlug className="text-[#ef8220] flex-shrink-0 text-xl sm:text-2xl" />
            Wide range of electronic accessories
          </li>
          <li className="flex items-center gap-3">
            <FaShippingFast className="text-[#1e90ff] flex-shrink-0 text-xl sm:text-2xl" />
            Fast & secure delivery across Bangladesh
          </li>
          <li className="flex items-center gap-3">
            <FaGift className="text-[#32cd32] flex-shrink-0 text-xl sm:text-2xl" />
            Special discounts for registered members
          </li>
          <li className="flex items-center gap-3">
            <FaStar className="text-[#ffa500] flex-shrink-0 text-xl sm:text-2xl" />
            Verified customer reviews & support
          </li>
        </ul>

        <p className="mt-8 text-xs sm:text-sm text-gray-500 max-w-md mx-auto md:mx-0">
          Already a member? Log in to continue shopping or manage your profile!
        </p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md bg-gray-100 text-gray-700 p-8 ">
        <h2 className="text-2xl font-bold text-center text-gray-600 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3">
              <FaEnvelope className="text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                name="email"
                className="w-full py-2 focus:outline-none"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3">
              <FaLock className="text-gray-400 mr-2 flex-shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                name="password"
                className="w-full py-2 focus:outline-none"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="text-right text-sm mt-1">
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="text-gray-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ef8220] text-white py-2 rounded hover:bg-[#d66f00] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm relative shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-600">Reset Password</h3>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="resetEmail" className="block text-gray-700 mb-1 font-medium">
                  Enter your email
                </label>
                <input
                  id="resetEmail"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="px-4 py-2 bg-[#ef8220] text-white rounded hover:bg-[#d66f00] transition disabled:opacity-60"
                >
                  {resetLoading ? 'Sending...' : 'Send Reset Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
