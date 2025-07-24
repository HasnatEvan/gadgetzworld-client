import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const AllMarquee = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all marquees
  const { data: marquees = [], isLoading, error } = useQuery({
    queryKey: ["marquees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/marquee");
      return data;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/marquee/${id}`);
      toast.success("Marquee deleted successfully");
      queryClient.invalidateQueries(["marquees"]);
    } catch (error) {
      toast.error("Failed to delete marquee: " + (error.message || ""));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg gap-3">
        <FaSpinner className="animate-spin text-4xl" />
        Loading marquees...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4 px-4">
        Failed to load marquees: {error.message || "Unknown error"}
      </div>
    );
  }

  if (marquees.length === 0) {
    return (
      <div className="text-center text-gray-600 py-6 px-4">
        No marquees found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 md:p-8 ">
      <ul>
        {marquees.map((marquee) => (
          <li
            key={marquee._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 py-3"
          >
            <span className="text-gray-700 text-base sm:text-lg md:text-xl mb-2 sm:mb-0">
              {marquee.text}
            </span>
            <button
              onClick={() => handleDelete(marquee._id)}
              className="text-red-600 hover:text-red-800 transition self-end sm:self-auto"
              title="Delete Marquee"
            >
              <FaTrash size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMarquee;
