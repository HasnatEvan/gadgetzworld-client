import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";

const AllProduct = () => {
  const { data: Products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/products");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl text-[#629D23]"></span>
      </div>
    );
  }

  if (Products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-500 text-center px-4">
        <p className="text-xl mb-4">No products available right now.</p>
        <p className="mb-6">Please check back later or explore other categories.</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No products"
          className="w-24 h-24 mb-6 opacity-50"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {Products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
