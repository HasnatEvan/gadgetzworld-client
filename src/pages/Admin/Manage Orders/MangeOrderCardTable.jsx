import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MangeOrderCardTable = ({ order, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);

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
        refetch();
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

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this order cancellation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      // Delete order
      const response = await axiosSecure.delete(`/orders/${order._id}`);

      if (response.data.deletedCount > 0) {
        // After deletion, increase product quantity
        await axiosSecure.patch(`/products/quantity/${order.productId}`, {
          quantityToUpdate: order.quantity,  // increase by order quantity
          status: "increase",                // fix spelling
        });

        Swal.fire("Cancelled!", "The order has been cancelled.", "success");
        refetch();
      } else {
        Swal.fire("Failed!", "Order was not cancelled.", "warning");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong while cancelling the order.", "error");
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="border px-3 py-2 text-center">{index + 1}</td>
      <td className="border px-3 py-2">{order.customer.name}</td>
      <td className="border px-3 py-2">{order.productName}</td>
      <td className="border px-3 py-2">{order.quantity}</td>
      <td className="border px-3 py-2">৳{order.totalPrice}</td>
      <td className="border px-3 py-2">{order.orderDate}</td>

      <td className="border px-3 py-2 font-semibold">
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={updating}
          className={`border rounded px-2 py-1 cursor-pointer font-medium
            ${status === "pending" && "text-yellow-600"}
            ${status === "approved" && "text-blue-600"}
            ${status === "shipped" && "text-purple-600"}
            ${status === "completed" && "text-green-600"}
            ${status === "cancelled" && "text-red-600"}
          `}
        >
          <option value="pending">🕒 Pending</option>
          <option value="approved">✅ Approved</option>
          <option value="shipped">🚚 Shipped</option>
          <option value="completed">🎉 Completed</option>
          <option value="cancelled">❌ Cancelled</option>
        </select>
      </td>

      <td className="py-6 flex gap-2 justify-center">
        <Link to={`/dashboard/order-details/${order._id}`}>
          <button
            title="View Order"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaEye />
          </button>
        </Link>

        <button
          onClick={handleDelete}
          title="Cancel Order"
          className="text-red-600 hover:text-red-800 transition"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default MangeOrderCardTable;
