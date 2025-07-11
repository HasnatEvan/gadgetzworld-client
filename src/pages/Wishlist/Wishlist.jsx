import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ProductCard from "../HomePage/AllProduct/ProductCard";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: wishlists = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

if (isLoading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-bars loading-xl text-[#629D23]"></span>
    </div>
  );
}

  if (wishlists.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        No wishlist items found.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {wishlists.map((wishlistItem) => (
          <ProductCard key={wishlistItem._id} product={wishlistItem.product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
