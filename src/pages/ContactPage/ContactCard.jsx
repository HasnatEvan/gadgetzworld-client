import { FaPhoneAlt, FaShoppingCart, FaTruck, FaEnvelope, FaLock } from "react-icons/fa";

const ContactCard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-gray-600">
      
      {/* Card 1 */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <FaPhoneAlt className="text-5xl mb-4 text-green-600" />
        <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
        <p className="text-sm text-gray-600">Reach out to us for 24/7 customer support anytime.</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <FaShoppingCart className="text-5xl mb-4 text-blue-600" />
        <h3 className="text-xl font-semibold mb-2">Online Store</h3>
        <p className="text-sm text-gray-600">
          Order your desired products from our online store.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <FaTruck className="text-5xl mb-4 text-yellow-500" />
        <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
        <p className="text-sm text-gray-600">
          We deliver products quickly right to your doorstep.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <FaLock className="text-5xl mb-4 text-purple-600" />
        <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
        <p className="text-sm text-gray-600">
          All your transactions are protected and encrypted for maximum security.
        </p>
      </div>

    </div>
  );
};

export default ContactCard;
