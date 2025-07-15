import React from "react";
import {
  FaHashtag,
  FaBoxOpen,
  FaSortAmountUp,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaInfoCircle,
} from "react-icons/fa";

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-600 font-semibold";
    case "approved":
      return "text-blue-600 font-semibold";
    case "shipped":
      return "text-purple-600 font-semibold";
    case "completed":
      return "text-green-600 font-semibold";
    case "cancelled":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-600";
  }
};

const MyOrdersCardList = ({ orders }) => {
  const rowStyle = "flex justify-between items-center py-1";

  return (
    <div className="space-y-4 sm:hidden">
      {orders.map((order, index) => (
        <div
          key={order._id}
          className=" rounded p-4 shadow bg-white text-black space-y-2"
        >
          <p className={rowStyle}>
            <span className="flex items-center gap-2 font-semibold">
              <FaHashtag className="text-gray-500" /> Order #
            </span>
            <span>{index + 1}</span>
          </p>

          <p className={rowStyle}>
            <span className="flex items-center gap-2 font-semibold">
              <FaBoxOpen className="text-indigo-600" /> Product Name:
            </span>
            <span>{order.productName}</span>
          </p>

          <p className={rowStyle}>
            <span className="flex items-center gap-2 font-semibold">
              <FaSortAmountUp className="text-orange-500" /> Quantity:
            </span>
            <span>{order.quantity}</span>
          </p>

          <p className={rowStyle}>
            <span className="flex items-center gap-2 font-semibold">
              <FaCalendarAlt className="text-blue-500" /> Order Date:
            </span>
            <span>{order.orderDate}</span>
          </p>

          <p className={rowStyle}>
            <span className="flex items-center gap-2 font-semibold">
              <FaMoneyBillWave className="text-green-600" /> Total Price:
            </span>
            <span>৳{order.totalPrice}</span>
          </p>

          <p className={`${rowStyle} ${getStatusClass(order.status)}`}>
            <span className="flex items-center gap-2 font-semibold">
              <FaInfoCircle className="text-gray-600" /> Status:
            </span>
            <span className="uppercase">{order.status}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyOrdersCardList;
