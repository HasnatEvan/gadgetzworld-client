import { useState } from "react";
import { imageUpload } from "../../../Api/utils";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllBanner from "../../HomePage/Banner/AllBanner";

const AddBanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      toast.warn("⚠️ Please select an image.");
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await imageUpload(selectedImage);
      const bannerData = {
        image: imageUrl,
        createdAt: new Date(),
      };
      const res = await axiosSecure.post("/banners", bannerData);
      if (res.data.insertedId) {
        toast.success("✅ Banner uploaded successfully!");
        setSelectedImage(null);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("❌ Failed to upload banner.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      {/* All banners displayed above form */}
      <AllBanner />

      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center mt-10">
        Upload New Banner
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Choose an image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm sm:text-base text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-200 file:text-black
              hover:file:bg-gray-300
              transition cursor-pointer"
          />
        </div>

        {previewUrl && (
          <div className="mt-4">
            <p className="text-gray-600 mb-2 font-medium text-sm sm:text-base">
              Preview:
            </p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-72 sm:max-h-96 object-cover rounded-xl shadow border"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full flex justify-center items-center gap-2
            bg-[#ef8220] hover:bg-[#d06f15] text-white font-semibold
            py-3 px-6 rounded-xl transition duration-300
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaUpload className="text-lg" />
          {uploading ? "Uploading..." : "Upload Banner"}
        </button>
      </form>
    </div>
  );
};

export default AddBanner;
