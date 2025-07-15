import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MyOrdersTable from "./MyOrdersTable";
import MyOrdersCardList from "./MyOrdersCardList";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";

const MyOrder = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["orders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/customer-orders/${user.email}`);
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

    if (isError) {
        return (
            <div className="text-center mt-10 text-red-600">
                Error: {error?.message || "Failed to load orders"}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-center text-gray-600 text-lg font-medium gap-4 px-4">
                <FaExclamationTriangle className="text-yellow-500 text-5xl" />
                <p>You have no orders yet.</p>
            </div>
        );
    }



    // 👉 Reverse orders so latest appears first
    const reversedOrders = [...orders].reverse();

    // Summary calculations
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const completedOrders = orders.filter((o) => o.status === "completed").length;
    const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;

    return (
        <div className="p-4 text-black">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
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

            {/* Desktop Table */}
            <div className="hidden sm:block">
                <MyOrdersTable orders={reversedOrders} />
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden">
                <MyOrdersCardList orders={reversedOrders} />
            </div>
        </div>
    );
};

export default MyOrder;
