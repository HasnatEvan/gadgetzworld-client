import { FaTrashAlt, FaEdit, FaTag, FaDollarSign, FaBoxes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyInventoryCard = ({ product, refetch }) => {
  const axiosSecure = useAxiosSecure();

  // ডিলিট ফাংশন
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete product "${product.productName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/products/${product._id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        refetch && refetch();
      } else {
        Swal.fire("Failed!", "Failed to delete product.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  // আপডেট ফাংশন
  const handleUpdate = () => {
    toast.info(`Update function for "${product.productName}" to be implemented.`);
    // প্রয়োজনে navigate() ব্যবহার করতে পারো:
    // navigate(`/dashboard/edit-products/${product._id}`);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white text-black">
      {/* Product ID */}
      <p className="text-xs text-gray-400 break-all mb-1">ID: {product._id}</p>

      {/* Product Name */}
      <h2 className="text-xl font-semibold text-[#222] mb-2">
        {product.productName}
      </h2>

      {/* Category */}
      <div className="flex justify-between items-center text-sm mb-1">
        <div className="flex items-center gap-2 text-gray-600">
          <FaTag />
          <span>Category:</span>
        </div>
        <span className="font-medium text-black">{product.category}</span>
      </div>

      {/* Price */}
      <div className="flex justify-between items-center text-sm mb-1">
        <div className="flex items-center gap-2 text-green-600">
          <FaDollarSign />
          <span>Price:</span>
        </div>
        <span className="font-medium text-black">{product.totalPrice} ৳</span>
      </div>

      {/* Quantity */}
      <div className="flex justify-between items-center text-sm mb-3">
        <div className="flex items-center gap-2 text-blue-600">
          <FaBoxes />
          <span>Quantity:</span>
        </div>
        <span className="font-medium text-black">{product.quantity}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-between">
        <Link to={`/dashboard/edit-products/${product._id}`}>
          <button
            onClick={handleUpdate}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Update Product"
          >
            <FaEdit size={18} />
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 transition"
          title="Delete Product"
        >
          <FaTrashAlt size={18} />
        </button>
      </div>
    </div>
  );
};

export default MyInventoryCard;
