import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MangeOrderCardTable from "./MangeOrderCardTable";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], refetch, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders`);
      return data;
    },
  });

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <div className="overflow-x-auto text-black">
      <table className="min-w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Product Name</th>
            <th className="border px-3 py-2">Product Image</th>
            <th className="border px-3 py-2">Quantity</th>
            <th className="border px-3 py-2">Total Price</th>
            <th className="border px-3 py-2">Payment Method</th>
            <th className="border px-3 py-2">Transaction ID</th>
            <th className="border px-3 py-2">Sender Number</th>
            <th className="border px-3 py-2">Order Date</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Customer Name</th>
            <th className="border px-3 py-2">Customer Phone</th>
            <th className="border px-3 py-2">District</th>
            <th className="border px-3 py-2">Thana</th>
            <th className="border px-3 py-2">Full Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <MangeOrderCardTable
              key={order._id}
              order={order}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
