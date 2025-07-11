import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaBoxes, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify"; // ✅ Toast import

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/product/${id}`);
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 mt-12 font-semibold text-lg">
                কোনো সমস্যা হয়েছে পণ্য তথ্য লোড করার সময়।
            </div>
        );
    }

    const isDiscounted =
        product.category === "Discount" && product.totalPrice < product.price;

    const mainImage = selectedImage || product.images[1];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
            {/* Back Button */}
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#629D23] hover:text-[#527619] transition-colors duration-300 font-semibold text-sm sm:text-base"
                    aria-label="Go back"
                    title="Back"
                >
                    <FaArrowLeft size={18} />
                    Back
                </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Image Section */}
                <div className="relative">
                    <div className="absolute top-4 right-4 bg-[#629D23] text-white px-3 py-1 rounded-full text-base sm:text-lg font-bold shadow-lg z-20 select-none">
                        ৳{product.totalPrice.toLocaleString()}
                    </div>

                    <img
                        src={mainImage}
                        alt={product.productName}
                        className="w-full h-60 sm:h-72 md:h-[450px] object-cover rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => setIsFullScreen(true)}
                        loading="lazy"
                    />

                    <div className="flex gap-3 mt-4 sm:mt-6 overflow-x-auto scrollbar-thin scrollbar-thumb-[#629D23] scrollbar-track-gray-200">
                        {product.images?.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${product.productName} thumbnail ${idx + 1}`}
                                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 cursor-pointer transition-transform duration-300 hover:scale-110 flex-shrink-0 ${img === mainImage ? "border-[#629D23]" : "border-gray-300"}`}
                                onClick={() => setSelectedImage(img)}
                                loading="lazy"
                            />
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                            {product.productName}
                        </h1>

                        {product.quantity === 0 && (
                            <p className="text-red-600 text-sm sm:text-base font-semibold mb-4">
                                ⚠️ This product is currently <span className="underline">Out of Stock</span>.
                            </p>
                        )}

                        <div className="flex items-center gap-5 mb-8 flex-wrap">
                            {isDiscounted && (
                                <p className="text-lg sm:text-xl line-through text-gray-400 font-medium">
                                    ৳{product.price.toLocaleString()}
                                </p>
                            )}
                            {product.discount && (
                                <span className="bg-red-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full select-none shadow">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>

                        <section>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                                Description
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify text-sm sm:text-base">
                                {product.description}
                            </p>
                        </section>

                        <section className="mt-8 sm:mt-10 text-gray-700 text-base space-y-4">
                            <p className="flex items-center gap-2 sm:gap-3 font-medium text-sm sm:text-base">
                                <FaBoxes className="text-blue-600" size={20} />
                                Available Quantity:{" "}
                                <span className="text-lg">{product.quantity}</span>
                            </p>
                        </section>

                        {/* ✅ Updated Purchase Button */}
                        <div className="mt-8">
                            <button
                                onClick={() => {
                                    if (product.quantity > 0) {
                                        navigate(`/confirmOrder/${product._id}`);
                                    } else {
                                        toast.warn("⚠️ এই পণ্যটি স্টকে নেই!", {
                                            position: "top-center",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            theme: "colored",
                                        });
                                    }
                                }}
                                className="w-full bg-[#629D23] hover:bg-[#527619] text-white py-3 rounded-lg text-base font-semibold transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {product.quantity === 0 ? "Out of Stock" : "Purchase Now"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Image View */}
            {isFullScreen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50 cursor-pointer p-6"
                    onClick={() => setIsFullScreen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Fullscreen view of ${product.productName}`}
                >
                    <img
                        src={mainImage}
                        alt={product.productName}
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                        loading="lazy"
                    />
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
