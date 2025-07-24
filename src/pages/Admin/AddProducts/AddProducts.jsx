import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { imageUpload } from '../../../Api/utils';

const AddProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState(['', '', '']);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    newImages[index] = file;
    newPreviews[index] = URL.createObjectURL(file);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const productName = form.productName.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const discount = parseFloat(form.discount.value) || 0;
    const quantity = parseInt(form.quantity.value);
    const bkashNumber = form.bkashNumber.value;
    const nagadNumber = form.nagadNumber.value;
    const category = form.category.value;

    if (!images[0] || !images[1] || !images[2]) {
      toast.error('সব ৩টি ছবি আপলোড করুন');
      return;
    }

    setLoading(true);
    toast.dismiss();

    try {
      // Upload all images and get URLs
      const uploadedImageUrls = await Promise.all(
        images.map((img) => imageUpload(img))
      );

      // Calculate total price after discount
      const totalPrice =
        discount > 0
          ? Math.round(price - (price * discount) / 100)
          : price;

      const productData = {
        productName,
        description,
        price,
        quantity,
        bkashNumber,
        nagadNumber,
        discount,
        totalPrice,
        category,
        images: uploadedImageUrls,
        seller: {
          name: user?.displayName,
          email: user?.email,
        },
        createdAt: new Date(),
      };

      await axiosSecure.post('/products', productData);
      toast.success('✅ Product added successfully!');

      // Reset form and images
      form.reset();
      setImages([null, null, null]);
      setImagePreviews(['', '', '']);
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to add product!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-gray-600 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-3xl p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-600 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Product Name */}
          <div>
            <label className="block mb-1 font-semibold">Product Name</label>
            <input
              type="text"
              name="productName"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full border rounded px-3 py-2 resize-none"
              placeholder="Write product description"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block mb-1 font-semibold">Upload Product Images (3)</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(i, e.target.files[0])}
                    required
                    className="w-full"
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
            <label className="block mb-1 font-semibold">Price (BDT)</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter price"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block mb-1 font-semibold">Discount (%)</label>
            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter discount percentage"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              required
              min="1"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter available quantity"
            />
          </div>

          {/* Bkash Number */}
          <div>
            <label className="block mb-1 font-semibold">Bkash Number</label>
            <input
              type="tel"
              name="bkashNumber"
              required
              pattern="\d{11}"
              className="w-full border rounded px-3 py-2"
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* Nagad Number */}
          <div>
            <label className="block mb-1 font-semibold">Nagad Number</label>
            <input
              type="tel"
              name="nagadNumber"
              required
              pattern="\d{11}"
              className="w-full border rounded px-3 py-2"
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <input
              type="text"
              name="category"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter category name"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4cb648] text-white font-semibold py-3 rounded transition flex justify-center items-center gap-2"
          >
            {loading && (
              <span className="loading loading-infinity loading-xl text-white"></span>
            )}
            {loading ? 'Submitting...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
