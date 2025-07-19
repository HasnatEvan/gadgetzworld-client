// src/pages/Dashboard/TrackOrder/TrackOrder.jsx

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaSpinner,
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaTimesCircle,
  FaCheckDouble,
  FaHashtag,
  FaCalendarAlt,
} from "react-icons/fa";

const TrackOrder = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/orders");
      return data;
    },
  });

  useEffect(() => {
    if (data) setOrders(data);
  }, [data]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          icon: <FaClock className="text-yellow-600" />,
        };
      case "approved":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          icon: <FaCheckCircle className="text-blue-600" />,
        };
      case "shipped":
        return {
          bg: "bg-purple-100",
          text: "text-purple-800",
          icon: <FaTruck className="text-purple-600" />,
        };
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: <FaCheckDouble className="text-green-600" />,
        };
      case "cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: <FaTimesCircle className="text-red-600" />,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: null,
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-gray-500 text-lg font-medium gap-3 min-h-screen w-full">
        <FaSpinner className="animate-spin text-4xl" />
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load orders!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FaBoxOpen className="text-blue-600" />
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't placed any orders yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {[...orders]
            .reverse()
            .map((order) => {
              const { bg, text, icon } = getStatusStyle(order.status);

              return (
                <li
                  key={order._id}
                  className="p-4 sm:p-6 rounded shadow-sm hover:shadow-md transition bg-white"
                >
                  {/* Order ID */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm mb-2 text-gray-500 gap-1 sm:gap-0">
                    <span className="flex items-center gap-1">
                      <FaHashtag /> <strong>Order ID:</strong>
                    </span>
                    <span className="break-all">{order._id}</span>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                    <strong className="flex items-center gap-1">Status:</strong>
                    <span
                      className={`px-2 py-1 text-xs sm:text-sm rounded inline-flex items-center gap-1 font-medium ${bg} ${text}`}
                    >
                      {icon}{" "}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 gap-1 sm:gap-0">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-pink-500" /> <strong>Date:</strong>
                    </span>
                    <span>{order.orderDate}</span>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default TrackOrder;
