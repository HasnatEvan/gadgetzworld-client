import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { imageUpload } from "../../../Api/utils";
import { toast } from "react-toastify";

const EditInventory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [nagadNumber, setNagadNumber] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);

  // Fetch existing product for editing
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/product/${id}`);
        const product = res.data;

        if (product) {
          setProductName(product.productName || "");
          setDescription(product.description || "");
          setPrice(product.price !== undefined ? String(product.price) : "");
          setDiscount(product.discount !== undefined ? String(product.discount) : "");
          setQuantity(product.quantity !== undefined ? String(product.quantity) : "");
          setBkashNumber(product.bkashNumber || "");
          setNagadNumber(product.nagadNumber || "");
          setCategory(product.category || "");
          if (product.images?.length === 3) {
            setImagePreviews(product.images);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [axiosSecure, id]);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = URL.createObjectURL(file);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < 3; i++) {
      if (!images[i] && !imagePreviews[i]) {
        toast.error("সব ৩টি ছবি আপলোড করুন");
        return;
      }
    }

    setLoading(true);
    toast.dismiss();

    try {
      const uploadedImageUrls = await Promise.all(
        images.map(async (img, i) => {
          return img ? await imageUpload(img) : imagePreviews[i];
        })
      );

      const priceNum = parseFloat(price);
      const discountNum = parseFloat(discount) || 0;
      const quantityNum = parseInt(quantity);
      const totalPrice = discountNum > 0 ? Math.round(priceNum - (priceNum * discountNum) / 100) : priceNum;

      const productData = {
        productName,
        description,
        price: priceNum,
        quantity: quantityNum,
        bkashNumber,
        nagadNumber,
        discount: discountNum,
        totalPrice,
        category,
        images: uploadedImageUrls,
        seller: {
          name: user?.displayName,
          email: user?.email,
        },
        createdAt: new Date(),
      };

      if (id) {
        await axiosSecure.put(`/products/${id}`, productData);
        toast.success("✅ Product updated successfully!");
      } else {
        await axiosSecure.post("/products", productData);
        toast.success("✅ Product added successfully!");
      }

      navigate("/dashboard/my-inventory");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen b text-gray-700 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 ">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#629D23] mb-6">
          {id ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Product Name</label>
            <input
              type="text"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full border rounded px-3 py-2 resize-none text-sm"
              placeholder="Write product description"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Upload Product Images (3)</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(i, e.target.files[0])}
                    required={!imagePreviews[i]}
                    className="w-full text-sm"
                  />
                  {imagePreviews[i] && (
                    <img
                      src={imagePreviews[i]}
                      alt={`Preview ${i + 1}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Price (BDT)</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter price"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min="0"
              max="100"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter discount percentage"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min="0"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter available quantity"
            />
          </div>

          {/* Bkash Number */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Bkash Number</label>
            <input
              type="tel"
              name="bkashNumber"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              required
              pattern="\d{11}"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* Nagad Number */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Nagad Number</label>
            <input
              type="tel"
              name="nagadNumber"
              value={nagadNumber}
              onChange={(e) => setNagadNumber(e.target.value)}
              required
              pattern="\d{11}"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Category</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter category name"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#629D23] text-white font-semibold py-3 rounded transition flex justify-center items-center gap-2"
          >
            {loading && <span className="loading loading-spinner text-white"></span>}
            {loading ? "Submitting..." : id ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditInventory;
