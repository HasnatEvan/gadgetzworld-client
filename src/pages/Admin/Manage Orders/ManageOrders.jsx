import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MangeOrderCardTable from "./MangeOrderCardTable";
import MobileOrderCard from "./MobileOrderCard";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders`);
      return data;
    },
  });

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
      <div className="flex flex-col justify-center items-center text-red-600 text-lg font-semibold gap-3 min-h-screen w-full">
        <FaExclamationTriangle className="text-4xl" />
        Error loading orders
      </div>
    );
  }

  // যদি কোনো order না থাকে
  if (orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center text-gray-600 text-lg font-medium gap-2 min-h-screen w-full">
        <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4" />
        <p>No orders found.</p>
        <p>Please check back later.</p>
      </div>
    );
  }

  // Summary Data
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;

  const reversedOrders = [...orders].reverse();

  return (
    <div className="p-4 text-black max-w-[1200px] mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold">{totalOrders}</span>
          <span className="text-sm font-medium text-blue-700 mt-1">Total Orders</span>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold text-yellow-700">{pendingOrders}</span>
          <span className="text-sm font-medium text-yellow-800 mt-1">Pending Orders</span>
        </div>

        <div className="bg-green-100 p-4 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold text-green-700">{completedOrders}</span>
          <span className="text-sm font-medium text-green-800 mt-1">Completed Orders</span>
        </div>

        <div className="bg-red-100 p-4 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold text-red-700">{cancelledOrders}</span>
          <span className="text-sm font-medium text-red-800 mt-1">Cancelled Orders</span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="w-full hidden sm:block overflow-x-auto rounded border border-gray-300">
        <table className="w-full min-w-[700px] text-center border-collapse border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Customer Name</th>
              <th className="border px-3 py-2">Product Name</th>
              <th className="border px-3 py-2">Quantity</th>
              <th className="border px-3 py-2">Total Price</th>
              <th className="border px-3 py-2">Order Date</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reversedOrders.map((order, index) => (
              <MangeOrderCardTable
                key={order._id}
                order={order}
                index={index}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {reversedOrders.map((order, index) => (
          <MobileOrderCard
            key={order._id}
            order={order}
            index={index}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
