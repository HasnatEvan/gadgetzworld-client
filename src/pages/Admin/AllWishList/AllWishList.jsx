import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUser, FaEnvelope, FaTags, FaSpinner } from "react-icons/fa";

const AllWishList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allWishlist");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-gray-500 text-lg font-medium gap-3 min-h-screen w-full">
        <FaSpinner className="animate-spin text-4xl" />
        Loading Wishlist...
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-700">
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const product = item.product;
          return (
            <li
              key={item._id}
              className="p-4 hover:shadow-lg transition duration-300 ease-in-out flex flex-col"
            >
              <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
                <img
                  src={product.images?.[0] || "/default-image.jpg"}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
                <p className="absolute top-2 right-2 bg-[#4cb648] bg-opacity-60 text-white font-bold text-sm px-2 py-0.5 rounded shadow-lg">
                  ৳ {product.totalPrice}
                </p>
              </div>

              <h3
                className="text-lg font-semibold mb-2 truncate flex items-center gap-2"
                title={product.productName}
              >
                {product.productName}
              </h3>

              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <FaUser className="text-gray-500" />
                <span className="font-medium">{item.user?.name || "Unknown"}</span>
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                <span className="text-[12px] font-normal">{item.user?.email || "No email provided"}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllWishList;
