import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import AllMarquee from "./AllMarquee";

const AddMarquee = () => {
  const axiosSecure = useAxiosSecure();
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.warn("Marquee text cannot be empty!");
      return;
    }

    try {
      const res = await axiosSecure.post("/marquee", { text });

      if (res.data.insertedId) {
        toast.success("Marquee added successfully!");
        setText(""); // Clear input
      } else {
        toast.error("Failed to add marquee.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-3xl mx-auto py-10 text-gray-600">
      <div className="bg-white p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
          Add Marquee
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter marquee text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#4cb648]"
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-[#4cb648] hover:bg-[#3da53c] text-white font-medium py-3 rounded-md transition duration-200"
          >
            Add Marquee
          </button>
        </div>
      </div>

      <div className="mt-10">
        <AllMarquee />
      </div>
    </div>
  );
};

export default AddMarquee;
