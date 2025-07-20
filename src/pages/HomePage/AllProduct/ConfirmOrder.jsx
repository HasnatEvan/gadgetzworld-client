import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bkashIcon from '../../../assets/Model/bkash.jpeg';
import NagadIcon from '../../../assets/Model/nagad.jpeg';
import {
    FaPlus,
    FaMinus,
    FaMobileAlt,
    FaExchangeAlt,
    FaMapMarkerAlt,
    FaRegCopy,
    FaMoneyCheckAlt,
    FaUser,
    FaEnvelope,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";

const districts = [ /* জেলা লিস্ট */ "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria",
    "Chandpur", "Chattogram", "Chuadanga", "Comilla", "Cox’s Bazar", "Dhaka", "Dinajpur", "Faridpur", "Feni",
    "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat",
    "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur",
    "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj",
    "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur",
    "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj",
    "Sylhet", "Tangail", "Thakurgaon"
];

const ConfirmOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        paymentMethod: "",
        transactionId: "",
        senderNumber: "",
        district: "",
        thana: "",
        fullAddress: "",
        quantity: 1,
    });

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.displayName || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const { data } = await axios.get(`https://gadgetzworld-server.vercel.app/product/${id}`);
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-xl text-[#ef8220]"></span>
            </div>
        );
    }
    if (error) return <div className="text-center mt-10 text-red-600">পণ্য তথ্য লোড করতে সমস্যা হয়েছে।</div>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const increaseQuantity = () => {
        if (formData.quantity < product.quantity) {
            setFormData((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
        } else {
            toast.warning(`স্টকে শুধুমাত্র ${product.quantity}টি পণ্য রয়েছে`, { position: "top-center" });
        }
    };

    const decreaseQuantity = () => {
        if (formData.quantity > 1) {
            setFormData((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
        }
    };

    const handleConfirmPurchase = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const now = new Date();
            const date = now.toLocaleDateString('en-GB');
            const time = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            const formattedDateTime = `${date} ${time}`;

            const selectedQuantity = formData.quantity;

            const orderData = {
                productId: product._id,
                productName: product.productName,
                productImage: product.images?.[0],
                unitPrice: product.totalPrice,
                quantity: selectedQuantity,
                totalPrice: product.totalPrice * selectedQuantity,
                paymentMethod: formData.paymentMethod,
                transactionId: formData.transactionId,
                senderNumber: formData.senderNumber,
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.contactNumber,
                    district: formData.district,
                    thana: formData.thana,
                    fullAddress: formData.fullAddress,
                },
                orderDate: formattedDateTime,
                status: "pending",
            };

            // ✅ Step 1: Order Save
            const res = await axiosSecure.post("/orders", orderData);

            if (res.data.insertedId || res.data.acknowledged) {
                // ✅ Step 2: Reduce Product Quantity (stock)
                await axiosSecure.patch(`/products/quantity/${product._id}`, {
                    quantityToUpdate: selectedQuantity, // Must be number
                    status: "decrease"
                });


                toast.success("✅ আপনার অর্ডার সফলভাবে নিশ্চিত হয়েছে!");
                navigate("/");
            } else {
                toast.error("❌ অর্ডার জমা দিতে সমস্যা হয়েছে।");
            }
        } catch (err) {
            console.error(err);
            toast.error("❌ কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        } finally {
            setIsProcessing(false);
        }
    };


    return (
        <div className="max-w-6xl mx-auto px-4 mt-4 py-6 bg-white  text-black">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-500">আপনার অর্ডার নিশ্চিত করুন</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Info */}
                <div className="w-full lg:w-1/3 p-4 bg-gray-100 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">{product.productName}</h2>
                    <div className="flex justify-between mb-2"><span className="font-semibold">মূল্য:</span><span>৳{product.totalPrice?.toLocaleString()}</span></div>
                    <div className="flex justify-between mb-2"><span className="font-semibold">স্টকে আছে:</span><span>{product.quantity}</span></div>

                    {product.bkashNumber && (
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold flex items-center gap-2"><img src={bkashIcon} alt="Bkash" className="h-6" /> বিকাশ নাম্বার:</span>
                            <span className="flex items-center gap-2">
                                {product.bkashNumber}
                                <button onClick={() => {
                                    navigator.clipboard.writeText(product.bkashNumber);
                                    toast.success("Bkash নাম্বার কপি হয়েছে!");
                                }} className="text-gray-500 hover:text-green-600"><FaRegCopy /></button>
                            </span>
                        </div>
                    )}

                    {product.nagadNumber && (
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold flex items-center gap-2"><img src={NagadIcon} alt="Nagad" className="h-6" /> নগদ নাম্বার:</span>
                            <span className="flex items-center gap-2">
                                {product.nagadNumber}
                                <button onClick={() => {
                                    navigator.clipboard.writeText(product.nagadNumber);
                                    toast.success("Nagad নাম্বার কপি হয়েছে!");
                                }} className="text-gray-500 hover:text-green-600"><FaRegCopy /></button>
                            </span>
                        </div>
                    )}

                    <div className="my-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm rounded leading-relaxed">
                        ⚠️ <strong>অর্ডার নিশ্চিত করার আগে দয়া করে নিচের নির্দেশনাগুলো ভালোভাবে পড়ুন:</strong><br /><br />
                        🚚 <strong>চট্টগ্রাম জেলার ভিতরে:</strong> ডেলিভারি চার্জ <strong>৮০ টাকা</strong><br />
                        🚛 <strong>চট্টগ্রাম জেলার বাইরে:</strong> ডেলিভারি চার্জ <strong>১৫০ টাকা</strong><br /><br />
                        ✅ ডেলিভারি চার্জ <strong>Send Money</strong> করুন।<br />
                        💳 <strong>Send Money</strong> নাম্বার লিখুন।<br />
                        🧾 <strong>লেনদেন নম্বর</strong> লিখুন।<br /><br />
                        ❗ <strong>ভুল তথ্য দিলে অর্ডার কনফার্ম হবে না।</strong>
                    </div>

                    {/* Quantity */}
                    <div className="mt-4">
                        <label className="block font-semibold mb-1">পরিমাণ</label>
                        <div className="flex items-center gap-4">
                            <button type="button" onClick={decreaseQuantity} className="px-3 py-1 bg-gray-300 rounded text-xl"><FaMinus /></button>
                            <span className="text-lg font-semibold">{formData.quantity}</span>
                            <button type="button" onClick={increaseQuantity} className="px-3 py-1 bg-gray-300 rounded text-xl"><FaPlus /></button>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between font-semibold">
                        <span>মোট দাম:</span>
                        <span>৳{(product.totalPrice * formData.quantity).toLocaleString()}</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleConfirmPurchase} className="w-full lg:w-2/3 space-y-5">
                    {/* Input fields with icons */}
                    {[
                        { label: "আপনার নাম", name: "name", icon: <FaUser />, type: "text", readOnly: true },
                        { label: "ইমেইল", name: "email", icon: <FaEnvelope />, type: "email", readOnly: true },
                        { label: "মোবাইল নাম্বার", name: "contactNumber", icon: <FaMobileAlt />, type: "tel", placeholder: "আপনার মোবাইল নাম্বার" },
                        { label: "লেনদেন নম্বর", name: "transactionId", icon: <FaExchangeAlt />, type: "text", placeholder: "Bkash/Nagad ট্রানজ্যাকশন ID" },
                        { label: "পেমেন্ট পাঠানো নাম্বার", name: "senderNumber", icon: <FaMoneyCheckAlt />, type: "text", placeholder: "যে নাম্বার থেকে টাকা পাঠানো হয়েছে" },
                        { label: "থানা / উপজেলা", name: "thana", icon: <FaMapMarkerAlt />, type: "text", placeholder: "আপনার থানা বা উপজেলা" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block font-semibold mb-1 flex items-center gap-2">{field.icon} {field.label}</label>
                            <input
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                required={!field.readOnly}
                                readOnly={field.readOnly}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                            />
                        </div>
                    ))}

                    {/* Payment Method */}
                    <div>
                        <label className="block font-semibold mb-1">পেমেন্ট পদ্ধতি</label>
                        <select
                            name="paymentMethod"
                            required
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">-- নির্বাচন করুন --</option>
                            {product.bkashNumber && <option value="bkash">বিকাশ</option>}
                            {product.nagadNumber && <option value="nagad">নগদ</option>}
                        </select>
                        {formData.paymentMethod === "bkash" && <img src={bkashIcon} alt="Bkash" className="h-10 mt-2" />}
                        {formData.paymentMethod === "nagad" && <img src={NagadIcon} alt="Nagad" className="h-10 mt-2" />}
                    </div>

                    {/* District */}
                    <div>
                        <label className="block font-semibold mb-1">জেলা</label>
                        <select
                            name="district"
                            required
                            value={formData.district}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">-- আপনার জেলা নির্বাচন করুন --</option>
                            {districts.map((dist) => (
                                <option key={dist} value={dist}>{dist}</option>
                            ))}
                        </select>
                    </div>

                    {/* Full Address */}
                    <div>
                        <label className="block font-semibold mb-1">পূর্ণ ঠিকানা</label>
                        <textarea
                            name="fullAddress"
                            required
                            rows={3}
                            placeholder="উদাহরণ: বাড়ি-১২৩, রোড-৪, ধানমন্ডি, ঢাকা-১২০৫"
                            value={formData.fullAddress}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-[#ef8220] text-white py-3 rounded-lg font-semibold hover:bg-[#ef8318d1] transition flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <span className="loading loading-infinity loading-sm text-white"></span>
                                প্রসেসিং হচ্ছে...
                            </>
                        ) : (
                            "অর্ডার নিশ্চিত করুন"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ConfirmOrder;
