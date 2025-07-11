import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { imageUpload } from '../../../Api/utils';

const AddProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        images: [null, null, null],
        imagePreviews: ['', '', ''],
        price: '',
        quantity: '',
        bkashNumber: '',
        nagadNumber: '',
        discount: '',
        category: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index, file) => {
        const newImages = [...formData.images];
        const previews = [...formData.imagePreviews];
        newImages[index] = file;
        previews[index] = URL.createObjectURL(file);

        setFormData((prev) => ({
            ...prev,
            images: newImages,
            imagePreviews: previews,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        toast.dismiss();

        try {
            const uploadedImageUrls = await Promise.all(
                formData.images.map((img) => imageUpload(img))
            );

            const discountValue = parseFloat(formData.discount) || 0;
            const priceValue = parseFloat(formData.price);
            const totalPrice =
                discountValue > 0
                    ? Math.round(priceValue - (priceValue * discountValue) / 100)
                    : priceValue;

            const productData = {
                productName: formData.productName,
                description: formData.description,
                price: priceValue,
                quantity: formData.quantity,
                bkashNumber: formData.bkashNumber,
                nagadNumber: formData.nagadNumber,
                discount: discountValue,
                totalPrice,
                category: formData.category,
                images: uploadedImageUrls,
                seller: {
                    name: user?.displayName,
                    email: user?.email,
                },
                createdAt: new Date(),
            };

            await axiosSecure.post('/products', productData);
            toast.success('✅ Product added successfully!');

            setFormData({
                productName: '',
                description: '',
                images: [null, null, null],
                imagePreviews: ['', '', ''],
                price: '',
                quantity: '',
                bkashNumber: '',
                nagadNumber: '',
                discount: '',
                category: '',
            });
        } catch (error) {
            console.error(error);
            toast.error('❌ Failed to add product!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-600 flex items-center justify-center px-2 sm:px-4">
            <div className="w-full max-w-3xl p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#629D23] mb-6">
                    Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Product Name */}
                    <div>
                        <label className="block mb-1 font-semibold">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
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
                            value={formData.description}
                            onChange={handleChange}
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
                                    {formData.imagePreviews[i] && (
                                        <img
                                            src={formData.imagePreviews[i]}
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
                            value={formData.price}
                            onChange={handleChange}
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
                            value={formData.discount}
                            onChange={handleChange}
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
                            value={formData.quantity}
                            onChange={handleChange}
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
                            value={formData.bkashNumber}
                            onChange={handleChange}
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
                            value={formData.nagadNumber}
                            onChange={handleChange}
                            required
                            pattern="\d{11}"
                            className="w-full border rounded px-3 py-2"
                            placeholder="01XXXXXXXXX"
                        />
                    </div>

                    {/* Category (with suggestion typing) */}
                    <div>
                        <label className="block mb-1 font-semibold">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter category name"
                        />
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#629D23] text-white font-semibold py-3 rounded transition flex justify-center items-center gap-2"
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
