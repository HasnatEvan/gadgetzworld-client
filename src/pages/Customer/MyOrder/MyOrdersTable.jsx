import React from "react";

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

const MyOrdersTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto hidden sm:block">
      <table className="min-w-full border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Product Name</th>
            <th className="border px-3 py-2">Quantity</th>
            <th className="border px-3 py-2">Order Date</th>
            <th className="border px-3 py-2">Total Price</th>
            <th className="border px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{index + 1}</td>
              <td className="border px-3 py-2">{order.productName}</td>
              <td className="border px-3 py-2">{order.quantity}</td>
              <td className="border px-3 py-2">{order.orderDate}</td>
              <td className="border px-3 py-2">৳{order.totalPrice}</td>
              <td className={`border px-3 py-2 uppercase ${getStatusClass(order.status)}`}>
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrdersTable;
