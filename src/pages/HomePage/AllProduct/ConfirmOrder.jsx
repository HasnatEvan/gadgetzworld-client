import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
    FaCreditCard,
    FaExchangeAlt,
    FaMapMarkerAlt,
    FaRegCopy,
} from "react-icons/fa";

const districts = [ /* জেলা লিস্ট এখানে আগের মতোই থাকবে */
    "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria",
    "Chandpur", "Chattogram", "Chuadanga", "Comilla", "Cox’s Bazar", "Dhaka",
    "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj",
    "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna",
    "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur",
    "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh",
    "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona",
    "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari",
    "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj",
    "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

const ConfirmOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

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
            const { data } = await axios.get(`http://localhost:5000/product/${id}`);
            return data;
        },
    });

    if (isLoading) return <div className="text-center mt-10">পণ্য তথ্য লোড হচ্ছে...</div>;
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
            await axios.post("http://localhost:5000/orders", {
                productId: id,
                ...formData,
                orderDate: new Date(),
            });
            toast.success("✅ আপনার অর্ডার সফলভাবে নিশ্চিত হয়েছে!");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("❌ কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 py-6 bg-white rounded-lg shadow-md text-black">
            <h1 className="text-3xl font-bold mb-8 text-center text-[#629D23]">আপনার অর্ডার নিশ্চিত করুন</h1>

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

                    {/* Delivery Info */}
                    <div className="my-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm rounded leading-relaxed">
                        ⚠️ <strong>অর্ডার নিশ্চিত করার আগে দয়া করে নিচের নির্দেশনাগুলো ভালোভাবে পড়ুন:</strong>
                        <br /><br />
                        🚚 <strong>চট্টগ্রাম জেলার ভিতরে:</strong> ডেলিভারি চার্জ <strong>৮০ টাকা</strong><br />
                        🚛 <strong>চট্টগ্রাম জেলার বাইরে:</strong> ডেলিভারি চার্জ <strong>১৫০ টাকা</strong>
                        <br /><br />
                        ✅ অনুগ্রহ করে অর্ডার কনফার্ম করার আগে উপরে দেওয়া বিকাশ/নগদ নাম্বারে ডেলিভারি চার্জ <strong>Send Money</strong> করুন।
                        <br /><br />
                        💳 <strong>Send Money</strong> করা নাম্বারটি “<strong>পেমেন্ট পাঠানো নাম্বার</strong>” ঘরে লিখুন।<br />
                        🧾 <strong>লেনদেন নম্বর (Transaction ID)</strong> “<strong>লেনদেন নম্বর</strong>” ঘরে লিখুন।
                        <br /><br />
                        ❗ <strong>ভুল তথ্য প্রদান করলে আপনার অর্ডার কনফার্ম করা হবে না।</strong>
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
                    {/* Fields */}
                    {[
                        { label: "আপনার নাম", name: "name", type: "text", value: formData.name, readOnly: true },
                        { label: "ইমেইল", name: "email", type: "email", value: formData.email, readOnly: true },
                        { label: "মোবাইল নাম্বার", name: "contactNumber", type: "tel", placeholder: "আপনার মোবাইল নাম্বার", required: true },
                        { label: "লেনদেন নম্বর", name: "transactionId", type: "text", placeholder: "Bkash/Nagad ট্রানজ্যাকশন ID", required: true },
                        { label: "পেমেন্ট পাঠানো নাম্বার", name: "senderNumber", type: "text", placeholder: "যে নাম্বার থেকে টাকা পাঠানো হয়েছে", required: true },
                        { label: "থানা / উপজেলা", name: "thana", type: "text", placeholder: "আপনার থানা বা উপজেলা", required: true },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block font-semibold mb-1">{field.label}</label>
                            <input
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                required={field.required}
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
                        className="w-full bg-[#629D23] text-white py-3 rounded-lg font-semibold hover:bg-[#51711A] transition"
                    >
                        {isProcessing ? "প্রসেসিং হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmOrder;
