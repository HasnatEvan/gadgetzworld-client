import { FaPhoneAlt, FaEnvelope, FaLaptopCode, FaShippingFast, FaShieldAlt, FaHeadset, FaTags } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
      {/* মূল About Text */}
      <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
        <p className="flex items-start gap-3">
          <MdCelebration className="text-blue-600 mt-1 text-2xl sm:text-3xl" />
          <span>
            Welcome to <span className="font-semibold text-[#4cb648]">Gadget&apos;z World</span> – your trusted destination for the most reliable and up-to-date electronic items in Bangladesh! Since our inception, we have been committed to providing top-notch electronics that combine quality, performance, and affordability.
          </span>
        </p>

        <p>
          At Gadget&apos;z World, we are passionate about technology and innovation. We believe that everyone should have access to the latest tech without compromising on quality or price. Whether you&apos;re a student, a professional, a gamer, or a tech enthusiast — we have the perfect solution for your everyday needs.
        </p>

        <p>
          We specialize in a wide range of electronic items, from essential accessories to advanced tech gadgets. Our inventory is carefully selected and updated regularly to ensure that you always get the newest products on the market. We prioritize durability, design, and user experience, offering you the very best in tech gear.
        </p>

        <p>
          All of our products are directly imported from trusted manufacturers in <span className="bg-yellow-200 px-1 rounded animate-pulse">China</span>. This allows us to maintain competitive prices without compromising on quality. Each product is thoroughly tested before it reaches your hands.
        </p>

        <p>
          What sets us apart is our commitment to excellent customer service. We understand the value of trust, and that&apos;s why all our products go through quality checks before reaching your hands. With fast shipping, easy returns, and dedicated support, we aim to make your shopping experience smooth and enjoyable.
        </p>

        <p>
          Our vision is to become Bangladesh&apos;s leading electronics brand by building a community of happy customers. We are continuously expanding, adding new categories and features to serve you better. Stay connected with us for exciting deals, exclusive launches, and helpful tech tips.
        </p>

        {/* Contact Info */}
        <div>
          <p className="font-semibold mb-3 flex items-center gap-2 text-base sm:text-lg">
            Contact Information:
          </p>

          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-600" />
              <span className="font-medium">+8801607728405</span>
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              <span className="font-medium">gadgetzworld03@gmail.com</span>
            </p>
          </div>
        </div>

        <p className="flex items-center gap-2">
          <FaLaptopCode className="text-blue-600" />
          <span>
            Thank you for choosing Gadget&apos;z World. Let’s explore the future of technology together. We look forward to serving you with pride, integrity, and innovation.
          </span>
        </p>
      </div>

      {/* ৪টি কার্ড সেকশন */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-600">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
          <FaShippingFast className="text-green-500 mx-auto text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">
            Experience quick and reliable shipping across Bangladesh. Your orders reach you on time, every time.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
          <FaShieldAlt className="text-green-500 mx-auto text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
          <p className="text-gray-600">
            All products undergo strict quality checks to ensure you get only the best electronics.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
          <FaHeadset className="text-green-500 mx-auto text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600">
            Our dedicated support team is always ready to assist you with any queries or issues.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
          <FaTags className="text-green-500 mx-auto text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
          <p className="text-gray-600">
            Get the best deals and discounts on top electronics without compromising quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
