import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";

import {
    FaBoxOpen,
    FaDollarSign,
    FaMoneyCheckAlt,
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaInfoCircle,
    FaEnvelope,
    FaHashtag,
} from "react-icons/fa";

const OrderDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: order, isLoading, error } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading)
        return (
            <div className="flex flex-col justify-center items-center text-gray-500 text-lg font-medium gap-3 min-h-[300px] h-full w-full">
                <FaSpinner className="animate-spin text-4xl" />
                Loading order details...
            </div>
        );

    if (error)
        return (
            <div className="flex flex-col justify-center items-center text-red-600 text-lg font-semibold gap-3 min-h-[300px] h-full w-full">
                <FaExclamationTriangle className="text-4xl" />
                Failed to load order details
            </div>
        );



    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8  text-gray-800">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 flex items-center justify-center gap-4 text-indigo-700">
                <FaBoxOpen className="text-4xl sm:text-5xl" /> Order Details
            </h2>


            {/* Product Info Card */}
            <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-10 bg-indigo-50 rounded-lg p-5 sm:p-6 shadow-inner border border-indigo-100">
                <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-24 h-24 sm:w-40 sm:h-40 object-cover rounded-lg border border-indigo-200 shadow-md"
                />
                <div className="flex-1 space-y-2 sm:space-y-3">
                    <h3 className="text-xl sm:text-3xl font-semibold flex items-center gap-2 text-indigo-900">
                        <FaHashtag className="text-indigo-600" /> {order.productName}
                    </h3>
                    <p className="text-sm sm:text-lg flex items-center gap-1 sm:gap-2 text-indigo-800">
                        <FaDollarSign className="text-green-600" /> Unit Price:{" "}
                        <span className="font-bold">৳{order.unitPrice}</span>
                    </p>
                    <p className="text-sm sm:text-lg flex items-center gap-1 sm:gap-2 text-yellow-700">
                        <FaInfoCircle /> Quantity: <span className="font-semibold">{order.quantity}</span>
                    </p>
                    <p className="text-lg sm:text-xl flex items-center gap-1 sm:gap-2 text-purple-700 font-extrabold">
                        <FaMoneyCheckAlt /> Total Price: ৳{order.totalPrice}
                    </p>
                </div>
            </section>

            {/* Payment Info Card */}
            <section className="mb-10 bg-green-50 rounded-lg p-5 sm:p-6 shadow-inner border border-green-200">
                <h4 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3 text-green-700">
                    <FaDollarSign className="text-green-800" /> Payment Details
                </h4>
                <p className="flex items-center gap-2 sm:gap-3 text-green-900 text-sm sm:text-lg mb-2">
                    <FaMoneyCheckAlt /> <span className="font-semibold">Method:</span> {order.paymentMethod}
                </p>
                <p className="flex items-center gap-2 sm:gap-3 text-green-800 text-sm sm:text-lg mb-2">
                    <FaHashtag /> <span className="font-semibold">Transaction ID:</span> {order.transactionId}
                </p>
                <p className="flex items-center gap-2 sm:gap-3 text-green-700 text-sm sm:text-lg">
                    <FaPhone /> <span className="font-semibold">Sender Number:</span> {order.senderNumber}
                </p>
            </section>

            {/* Customer Info Card */}
            <section className="mb-10 bg-blue-50 rounded-lg p-5 sm:p-6 shadow-inner border border-blue-200">
                <h4 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3 text-blue-700">
                    <FaUser className="text-blue-800" /> Customer Information
                </h4>
                <p className="flex items-center gap-2 sm:gap-3 text-blue-900 text-sm sm:text-lg mb-2">
                    <FaUser /> <span className="font-semibold">Name:</span> {order.customer.name}
                </p>
                <p className="flex items-center gap-2 sm:gap-3 text-blue-900 text-sm sm:text-lg mb-2">
                    <FaEnvelope /> <span className="font-semibold">Email:</span> {order.customer.email}
                </p>
                <p className="flex items-center gap-2 sm:gap-3 text-blue-900 text-sm sm:text-lg mb-2">
                    <FaPhone /> <span className="font-semibold">Phone:</span> {order.customer.phone}
                </p>
                <p className="flex items-center gap-2 sm:gap-3 text-blue-800 text-sm sm:text-lg mb-2">
                    <FaMapMarkerAlt /> <span className="font-semibold">District:</span> {order.customer.district}
                </p>
                <p className="flex items-center gap-2 sm:gap-3 text-blue-800 text-sm sm:text-lg mb-2">
                    <FaMapMarkerAlt /> <span className="font-semibold">Thana:</span> {order.customer.thana}
                </p>
                <p className="flex items-center gap-2 sm:gap-3 text-blue-800 text-sm sm:text-lg">
                    <FaMapMarkerAlt /> <span className="font-semibold">Address:</span> {order.customer.fullAddress}
                </p>
            </section>

            {/* Order Meta Info */}
            <section className="bg-gray-50 rounded-lg p-5 sm:p-6 shadow-inner border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                <p className="flex items-center gap-2 sm:gap-3 text-gray-700 text-base sm:text-lg font-semibold">
                    <FaCalendarAlt className="text-indigo-600" /> Order Date: {order.orderDate}
                </p>
                <p className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-semibold">
                    <FaInfoCircle
                        className={`${order.status === "pending" ? "text-yellow-600" : "text-green-600"
                            }`}
                    />
                    Status:{" "}
                    <span
                        className={`${order.status === "pending" ? "text-yellow-600" : "text-green-600"
                            }`}
                    >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </p>
            </section>
        </div>
    );
};

export default OrderDetails;
