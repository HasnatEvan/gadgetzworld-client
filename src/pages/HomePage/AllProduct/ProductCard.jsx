import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const isDiscounted =
    product.category === "Discount" && product.totalPrice < product.price;

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/wishlist?email=${user.email}`
        );
        const alreadyExists = res.data.some(
          (item) => item.product._id === product._id
        );
        setIsLoved(alreadyExists);
      } catch (err) {
        console.error("Wishlist check error:", err);
      }
    };

    checkWishlist();
  }, [user?.email, product._id]);

  const handleLoveClick = async (e) => {
    e.stopPropagation(); // ⛔ prevent Link from triggering
    e.preventDefault();  // ⛔ prevent redirect

    if (!user?.email) {
      toast.warning("Please login first");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      if (isLoved) {
        const res = await axios.delete("http://localhost:5000/wishlist", {
          data: {
            productId: product._id,
            email: user.email,
          },
        });

        if (res.status === 200) {
          setIsLoved(false);
          toast.info("Removed from wishlist");
        }
      } else {
        const res = await axios.post("http://localhost:5000/wishlist", {
          product,
          user: {
            name: user.displayName || "Unknown",
            email: user.email,
          },
        });

        if (res.status === 200) {
          setIsLoved(true);
          toast.success("Added to wishlist");
        }
      }
    } catch (err) {
      console.error("Wishlist update error:", err);
      toast.error("Wishlist operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* ❤️ Heart Button */}
      <button
        onClick={handleLoveClick}
        disabled={loading}
        className={`absolute top-3 right-3 z-20 text-xl transition-colors duration-200 ${
          isLoved ? "text-red-500" : "text-gray-300 hover:text-red-500"
        }`}
        aria-label={isLoved ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FaHeart />
      </button>

      {/* 🛍️ Product Card Link */}
      <Link to={`/product/${product._id}`}>
        <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col group">
          {/* 🔖 Discount Badge */}
          {isDiscounted && (
            <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Discount
            </span>
          )}

          {/* Image */}
          <div className="relative">
            <img
              src={product.images[1]}
              alt={product.productName}
              className="w-full h-52 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>

          {/* Info */}
          <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
            <h2 className="text-lg font-bold text-gray-800 truncate">
              {product.productName}
            </h2>

            <div className="flex items-center justify-between mt-auto">
              <p className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                ৳{product.totalPrice}
              </p>
              {product.price && isDiscounted && (
                <p className="text-sm line-through text-gray-400">
                  ৳{product.price}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
