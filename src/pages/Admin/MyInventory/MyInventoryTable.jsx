import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyInventoryTable = ({ product, refetch }) => {
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

    // আপডেট ফাংশন (এখানে তুমি প্রয়োজন অনুযায়ী পপআপ বা অন্য UI যোগ করতে পারো)
    const handleUpdate = () => {
        toast.info(`Update function for "${product.productName}" to be implemented.`);
        // অথবা অন্য কোথাও নেভিগেট করো, যেমন:
        // navigate(`/dashboard/products/update/${product._id}`);
    };

    return (
        <tr className="hover:bg-gray-200 border-b-2 border-gray-200">
            <td className="border-2 border-gray-700 px-4 py-2 text-center">{product._id}</td>
            <td className="border-2 border-gray-700 px-4 py-2">{product.productName}</td>
            <td className="border-2 border-gray-700 px-4 py-2 text-center">{product.category}</td>
            <td className="border-2 border-gray-700 px-4 py-2 text-center">{product.totalPrice} ৳</td>
            <td className="border-2 border-gray-700 px-4 py-2 text-center">{product.quantity}</td>
            <td className="border-2 border-gray-700 px-4 py-2 text-center space-x-4">

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
            </td>
        </tr>
    );
};

export default MyInventoryTable;
