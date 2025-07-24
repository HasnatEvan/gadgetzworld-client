import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FaUserShield,
  FaBoxes,
  FaPlusCircle,
  FaTasks,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt,
} from 'react-icons/fa';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../src/assets/Logo/logo.jpg";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, isLoading] = useRole();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && location.pathname === '/dashboard') {
      if (role === 'admin') {
        navigate('/dashboard/admin-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [role, isLoading, location.pathname, navigate]);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed');
    }
  };

  const adminMenu = [
    { name: 'Admin Panel', path: '/dashboard/admin-dashboard', icon: <FaUserShield /> },
    { name: 'Inventory Overview', path: '/dashboard/my-inventory', icon: <FaBoxes /> },
    { name: 'Add New Product', path: '/dashboard/add-product', icon: <FaPlusCircle /> },
    { name: 'Manage Orders', path: '/dashboard/manage-orders', icon: <FaTasks /> },
  ];

  const userMenu = [];
  const menuItems = role === 'admin' ? adminMenu : userMenu;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="loading loading-bars loading-xl text-[#4cb648]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`
          bg-white shadow-md p-5 space-y-6 w-64 fixed top-0 left-0 h-screen z-30
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:fixed md:flex-shrink-0
        `}
      >
        {/* Logo Instead of Text */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-auto rounded-full" />
        </div>

        <nav className="flex flex-col space-y-3">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 border rounded transition ${
                  isActive
                    ? 'bg-green-200 text-black font-semibold'
                    : 'text-gray-700 border-gray-300 hover:bg-green-100'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <hr className="my-4 border-gray-300" />

        {/* Home + Logout */}
        <nav className="flex flex-col space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 border rounded transition ${
                isActive
                  ? 'bg-green-200 text-[#ef8220] font-semibold'
                  : 'text-gray-700 border-gray-300 hover:bg-green-100'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome className="text-lg" />
            <span>Home</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 border border-gray-300 rounded text-gray-700 hover:bg-green-100 transition"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Hamburger Menu */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded bg-[#4cb648] text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
