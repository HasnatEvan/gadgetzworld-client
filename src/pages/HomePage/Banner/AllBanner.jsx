import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaSpinner, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AllBanner = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: banners = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/banners");
      return data;
    },
  });

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/banners/${id}`);
        if (res.data.deletedCount > 0) {
          MySwal.fire("Deleted!", "Banner has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        console.error("Delete failed:", error);
        MySwal.fire("Error!", "Failed to delete banner.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-gray-500 text-lg font-medium gap-3 min-h-screen w-full">
        <FaSpinner className="animate-spin text-4xl" />
        Loading banners...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Error loading banners.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4 p-4 max-w-screen-xl mx-auto">
      {banners.map((banner) => (
        <div
          key={banner._id}
          className="relative border rounded-xl overflow-hidden shadow hover:shadow-md transition"
          style={{ height: "80px" }} // উচ্চতা ছোট
        >
          <img
            src={banner.image}
            alt="Banner"
            className="w-full h-full object-cover rounded-t-xl"
          />
          <button
            onClick={() => handleDelete(banner._id)}
            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-lg transition"
            title="Delete Banner"
          >
            <FaTrash size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllBanner;
