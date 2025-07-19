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
          `https://gadgetzworld-server.vercel.app/wishlist?email=${user.email}`
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
    e.stopPropagation(); // prevent Link from triggering
    e.preventDefault();  // prevent redirect

    if (!user?.email) {
      toast.warning("Please login first");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      if (isLoved) {
        const res = await axios.delete("https://gadgetzworld-server.vercel.app/wishlist", {
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
        const res = await axios.post("https://gadgetzworld-server.vercel.app/wishlist", {
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
      {/* Heart Button */}
      <button
        onClick={handleLoveClick}
        disabled={loading}
        className={`absolute top-3 right-3 z-20 text-xl transition-colors duration-200 ${isLoved ? "text-red-500" : "text-gray-300 hover:text-red-500"
          }`}
        aria-label={isLoved ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FaHeart />
      </button>

      {/* Product Card Link */}
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden hover:shadow-lg transition duration-300 flex flex-col group">
          {/* Discount Badge */}
          {isDiscounted && (
            <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Discount
            </span>
          )}

          {/* Image */}
          <div className="relative w-full overflow-hidden h-48 bg-white flex items-center justify-center">
            <img
              src={product.images[1]}
              alt={product.productName}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>

          {/* Info */}
          <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
            <h2 className="text-lg font-bold text-gray-600 truncate">
              {product.productName}
            </h2>

            {/* Quantity / Stock Status */}
            {product.quantity === 0 ? (
              <p className="text-sm text-red-600 font-semibold">
              Out of Stock
              </p>
            ) : product.quantity <= 5 ? (
              <p className="text-sm text-orange-600 font-semibold">
                Low stock! Hurry up.
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Available Quantity: <span className="font-semibold">{product.quantity}</span>
              </p>
            )}


            <div className="flex items-center justify-between mt-auto">
              <p className=" text-gray-600 text-sm font-semiboldpy-1 rounded-full">
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
