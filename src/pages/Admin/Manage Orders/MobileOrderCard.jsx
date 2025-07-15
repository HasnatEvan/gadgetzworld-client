import {
  FaEye,
  FaBox,
  FaCalendarAlt,
  FaUser,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MobileOrderCard = ({ order, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);

  // স্ট্যাটাস আপডেট হ্যান্ডলার
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    if (newStatus === order.status) {
      toast.info("Status is already set to this value.");
      return;
    }

    setStatus(newStatus);
    setUpdating(true);

    try {
      const response = await axiosSecure.patch(`/update-order-status/${order._id}`, {
        status: newStatus,
      });

      if (response.data.modifiedCount > 0) {
        toast.success(`Status updated to "${newStatus}"`);
        refetch && refetch();
      } else {
        toast.warning("Status was not updated.");
        setStatus(order.status);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
      setStatus(order.status);
    } finally {
      setUpdating(false);
    }
  };

  // ডিলিট (অর্ডার ক্যানসেল) হ্যান্ডলার
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this order cancellation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel order!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axiosSecure.delete(`/orders/${order._id}`);
      if (response.data.deletedCount > 0) {
        // quantity বাড়ানো কেবল অর্ডার ক্যানসেল হলে
        await axiosSecure.patch(`/products/quantity/${order.productId}`, {
          quantityToUpdate: order.quantity,
          status: "increase",
        });
        Swal.fire("Cancelled!", "The order has been cancelled.", "success");
        refetch && refetch();
      } else {
        Swal.fire("Failed!", "Order cancellation failed.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong while cancelling.", "error");
    }
  };

  const rowClass = "mb-1 flex justify-between items-center";

  return (
    <div className="rounded-lg p-4 shadow bg-white text-black space-y-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-lg flex items-center gap-1">
          <FaBox /> #{index + 1}
        </span>
        <div className="flex gap-2 items-center">
          <Link to={`/dashboard/order-details/${order._id}`}>
            <button
              title="View Order"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaEye size={20} />
            </button>
          </Link>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            title="Cancel Order"
            className="text-red-600 hover:text-red-800 transition"
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>

      {/* Product Name */}
      <p className={rowClass}>
        <strong className="flex items-center gap-2">
          <FaBox className="text-indigo-600" /> Product Name:
        </strong>
        <span>{order.productName}</span>
      </p>

      {/* Quantity */}
      <p className={rowClass}>
        <strong className="flex items-center gap-2">
          <FaCheckCircle className="text-green-600" /> Quantity:
        </strong>
        <span>{order.quantity}</span>
      </p>

      {/* Total Price */}
      <p className={rowClass}>
        <strong className="flex items-center gap-2">
          <FaDollarSign className="text-purple-600" /> Total Price:
        </strong>
        <span>৳{order.totalPrice}</span>
      </p>

      {/* Order Date */}
      <p className={rowClass}>
        <strong className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-600" /> Order Date:
        </strong>
        <span>{order.orderDate}</span>
      </p>

      {/* Status with Dropdown */}
      <p className={rowClass}>
        <strong className="flex items-center gap-2">
          {status === "pending" ? (
            <FaTimesCircle className="text-yellow-600" />
          ) : (
            <FaCheckCircle className="text-green-600" />
          )}
          Status:
        </strong>
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={updating}
          className={`border rounded px-2 py-1 text-sm font-medium bg-white shadow-sm ${
            status === "pending"
              ? "text-yellow-600"
              : status === "approved"
              ? "text-blue-600"
              : status === "shipped"
              ? "text-purple-600"
              : status === "completed"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          <option value="pending">🕒 Pending</option>
          <option value="approved">✅ Approved</option>
          <option value="shipped">🚚 Shipped</option>
          <option value="completed">🎉 Completed</option>
          <option value="cancelled">❌ Cancelled</option>
        </select>
      </p>

      {/* Customer Name */}
      <p className={rowClass}>
        <strong className="flex items-center gap-2">
          <FaUser className="text-gray-700" /> Customer Name:
        </strong>
        <span>{order.customer.name}</span>
      </p>
    </div>
  );
};

export default MobileOrderCard;
