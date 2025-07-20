import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaHeart,
  FaSpinner,
  FaDollarSign,
  FaTag,
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

  // Chart Data তৈরি
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

  return (
    <div className="p-4 md:p-6 lg:p-8 text-gray-700 space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          {
            icon: <FaUsers className="text-3xl text-[#ef8220] mx-auto mb-2" />,
            title: "Total Users",
            value: stats.totalUsers,
          },
          {
            icon: <FaBoxOpen className="text-3xl text-[#ef8220] mx-auto mb-2" />,
            title: "Total Products",
            value: stats.totalProducts,
          },
          {
            icon: (
              <FaShoppingCart className="text-3xl text-[#ef8220] mx-auto mb-2" />
            ),
            title: "Total Orders",
            value: stats.totalOrders,
          },
          {
            icon: <FaHeart className="text-3xl text-[#ef8220] mx-auto mb-2" />,
            title: "Total Wishlist",
            value: stats.totalWishlist,
          },
          {
            icon: (
              <FaDollarSign className="text-3xl text-[#ef8220] mx-auto mb-2" />
            ),
            title: "Total Sell",
            value: stats.overallTotalSell || 0,
            isCurrency: true,
          },
          {
            icon: <FaTag className="text-3xl text-[#ef8220] mx-auto mb-2" />,
            title: "Discount Items",
            value: stats.totalDiscountItems || 0,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 text-center border-t-4 border-[#ef8220]"
          >
            {item.icon}
            <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
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
                <CountUp start={0} end={item.value} duration={2} separator="," />
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Last 30 Days Orders Chart */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-t-4 border-[#ef8220]">
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
              <Bar dataKey="orders" name="Orders" fill="#ef8220" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Last 30 Days Sell Chart */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-t-4 border-[#ef8220]">
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
                fill="#ef8220"
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
