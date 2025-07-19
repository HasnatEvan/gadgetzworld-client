import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ProductCard from "./ProductCard";

const AllProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // প্রোডাক্ট ডাটা লোড
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("https://gadgetzworld-server.vercel.app/products");
      return data;
    },
  });

  // ইউনিক ক্যাটাগরি লিস্ট তৈরি
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // ফিল্টারড প্রোডাক্টস: ক্যাটাগরি আর সার্চ টার্ম মিলিয়ে
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl text-[#629D23]"></span>
      </div>
    );
  }

 

  return (
    <div>
      {/* ফিল্টার সেকশন: সব ডিভাইসে পাশে পাশে থাকবে */}
      <div className="p-4 text-black flex flex-row flex-wrap items-center gap-4">
        {/* ক্যাটাগরি ড্রপডাউন */}
        <div>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#629D23]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* সার্চ ইনপুট */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#629D23]"
          />
        </div>
      </div>

      {/* প্রোডাক্টস গ্রিড */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
