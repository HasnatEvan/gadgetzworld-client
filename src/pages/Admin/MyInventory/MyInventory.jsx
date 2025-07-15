import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MyInventoryTable from "./MyInventoryTable";
import MyInventoryCard from "./MyInventoryCard";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";

const MyInventory = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: products = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/products/seller`);
            return data;
        },
    });

    const totalProducts = products.length;
    const outOfStock = products.filter((p) => p.quantity === 0).length;

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center text-gray-500 text-lg font-medium gap-3 min-h-screen w-full">
                <FaSpinner className="animate-spin text-4xl" />
                Loading products...
            </div>
        );
    }


    if (isError) {
        return (
            <div className="flex justify-center items-center h-[60vh] px-4 text-red-600 text-center">
                Error: {error?.message || "Failed to load products"}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen px-4 text-gray-600 text-center">
                <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4" />
                <p className="text-lg font-medium">No products found.</p>
            </div>
        );
    }



    return (
        <div className="p-4 max-w-6xl mx-auto text-black space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <p className="text-sm">Total Products</p>
                        <h2 className="text-2xl font-bold">{totalProducts}</h2>
                    </div>
                    <span className="text-4xl">📦</span>
                </div>

                <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <p className="text-sm">Out of Stock</p>
                        <h2 className="text-2xl font-bold">{outOfStock}</h2>
                    </div>
                    <span className="text-4xl">❌</span>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-200 min-w-[700px]">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border-2 border-gray-700 px-4 py-2">Product ID</th>
                            <th className="border-2 border-gray-700 px-4 py-2">Name</th>
                            <th className="border-2 border-gray-700 px-4 py-2">Category</th>
                            <th className="border-2 border-gray-700 px-4 py-2">Price</th>
                            <th className="border-2 border-gray-700 px-4 py-2">Quantity</th>
                            <th className="border-2 border-gray-700 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <MyInventoryTable
                                key={product._id}
                                product={product}
                                refetch={refetch}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="block sm:hidden space-y-4">
                {products.map((product) => (
                    <MyInventoryCard
                        key={product._id}
                        product={product}
                        refetch={refetch}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyInventory;
