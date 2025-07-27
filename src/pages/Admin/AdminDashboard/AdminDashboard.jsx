import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaHeart,
  FaSpinner,
  FaDollarSign,
  FaTags,
  FaBullhorn,
  FaImages,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stat");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-gray-500 text-lg font-medium gap-3 min-h-screen w-full">
        <FaSpinner className="animate-spin text-4xl" />
        Loading dashboard...
      </div>
    );
  }

  const chartData = [];
  if (stats.orderCounts && stats.sellCounts) {
    for (const [date, orderCount] of Object.entries(stats.orderCounts)) {
      chartData.push({
        name: date,
        orders: orderCount,
        totalSell: stats.sellCounts[date] || 0,
      });
    }
  }

  const statsItems = [
    {
      icon: <FaUsers className="text-3xl text-[#4cb648] mx-auto mb-2" />,
      title: "Total Users",
      value: stats.totalUsers,
      link: "/dashboard/users",
    },
    {
      icon: <FaBoxOpen className="text-3xl text-[#4cb648] mx-auto mb-2" />,
      title: "Total Products",
      value: stats.totalProducts,
    },
    {
      icon: <FaShoppingCart className="text-3xl text-[#4cb648] mx-auto mb-2" />,
      title: "Total Orders",
      value: stats.totalOrders,
      link: "/dashboard/manage-orders",
    },
    {
      icon: <FaHeart className="text-3xl text-[#4cb648] mx-auto mb-2" />,
      title: "Total Wishlist",
      value: stats.totalWishlist,
      link: "/dashboard/all-wishlist",

    },
    {
      icon: <FaDollarSign className="text-3xl text-[#4cb648] mx-auto mb-2" />,
      title: "Total Sell",
      value: stats.overallTotalSell || 0,
      isCurrency: true,
    },
    {
      icon: <FaTags className="text-3xl text-[#4cb648] mx-auto mb-2" />,
      title: "Discount Items",
      value: stats.totalDiscountItems || 0,
    },
    {
      icon: <FaBullhorn className="text-3xl text-[#4cb648] mx-auto mb-2" />,
      title: "Add-Marquee",
      value: stats.totalMarquee || 0,
      link: "/dashboard/marquee",
    },
    {
      icon: <FaImages className="text-3xl text-[#4cb648] mx-auto mb-2" />,
      title: "Add-Banners",
      value: stats.totalBanner || 0,
      link: "/dashboard/add-banner",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 text-gray-700 space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {statsItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 text-center border-t-4 border-[#4cb648]"
          >
            {item.icon}
            <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
            {item.link ? (
              <Link
                to={item.link}
                className="text-xl md:text-2xl font-bold hover:text-[#d66f00] transition"
              >
                {item.isCurrency ? (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={2}
                    separator=","
                    prefix="৳ "
                  />
                ) : (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={2}
                    separator=","
                  />
                )}
              </Link>
            ) : (
              <p className="text-xl md:text-2xl font-bold">
                {item.isCurrency ? (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={2}
                    separator=","
                    prefix="৳ "
                  />
                ) : (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={2}
                    separator=","
                  />
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Last 30 Days Orders Chart */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-t-4 border-[#24365f]">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
          Last 30 Days Orders Overview
        </h3>
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" name="Orders" fill="#24365f" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Last 30 Days Sell Chart */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-t-4 border-[#4cb648]">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
          Last 30 Days Sell Overview
        </h3>
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => `৳ ${value}`} />
              <Legend />
              <Bar
                dataKey="totalSell"
                name="Total Sell"
                fill="#4cb648"
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
