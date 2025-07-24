import {
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaTools,
  FaCalendarAlt,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/user/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            queryClient.invalidateQueries(["all-users"]);
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

 const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  }).format(date);
};

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaUserShield className="text-red-600 inline-block mr-1" />;
      case "moderator":
        return <FaTools className="text-yellow-500 inline-block mr-1" />;
      default:
        return <FaUser className="text-gray-400 inline-block mr-1" />;
    }
  };

  const sortedUsers = [...users].sort((a, b) => b.timestamp - a.timestamp);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-gray-500 text-lg font-medium gap-3 min-h-screen w-full">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        Loading users...
      </div>
    );
  }

  if (!isLoading && users.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center text-gray-600 text-lg font-medium gap-4 px-4">
        <FaExclamationTriangle className="text-yellow-500 text-5xl" />
        <p>You have no users yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto text-gray-700">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 text-center min-w-[700px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Joined</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((u, idx) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{u.name}</td>
                <td className="py-2 px-4 break-all">{u.email}</td>
                <td className="py-2 px-4 capitalize whitespace-nowrap">
                  {getRoleIcon(u.role)} {u.role || "user"}
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  {u.timestamp ? formatTimestamp(u.timestamp) : "N/A"}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {sortedUsers.map((u, idx) => (
          <div
            key={u._id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
          >
            <p className="text-sm text-gray-400 mb-2 font-mono">User #{idx + 1}</p>

            <p className="flex justify-between items-center gap-2">
              <span className="font-semibold flex items-center gap-1 text-indigo-600 whitespace-nowrap">
                <FaUser className="text-indigo-600" /> Name:
              </span>
              <span className="break-words">{u.name}</span>
            </p>

            <p className="flex justify-between items-center gap-2">
              <span className="font-semibold flex items-center gap-1 text-green-600 whitespace-nowrap">
                <FaEnvelope className="text-green-600" /> Email:
              </span>
              <span className="break-all">{u.email}</span>
            </p>

            <p className="flex justify-between items-center gap-2">
              <span className="font-semibold flex items-center gap-1 text-red-600 whitespace-nowrap">
                {getRoleIcon(u.role)} Role:
              </span>
              <span className="capitalize">{u.role || "user"}</span>
            </p>

            <p className="flex justify-between items-center gap-2">
              <span className="font-semibold flex items-center gap-1 text-yellow-600 whitespace-nowrap">
                <FaCalendarAlt className="text-yellow-600" /> Joined:
              </span>
              <span>{u.timestamp ? formatTimestamp(u.timestamp) : "N/A"}</span>
            </p>

            <div className="text-right mt-3">
              <button
                onClick={() => handleDelete(u._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
