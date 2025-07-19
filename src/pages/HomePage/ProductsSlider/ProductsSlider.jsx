import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const ProductsSlider = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://gadgetzworld-server.vercel.app/products");
      return res.data;
    },
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

 if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl text-[#629D23]"></span>
      </div>
    );
  }
  return (
    <section className="w-full py-6 px-2 sm:px-6 md:px-10 overflow-x-hidden">
      <Slider {...settings} className="overflow-hidden">
        {[...products].reverse().map((product) => (
          <div key={product._id} className="px-3 box-border">
            <Link to={`/product/${product._id}`}>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 sm:p-6 text-center cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <img
                  src={product.images?.[0]}
                  alt={product.productName || "Product Image"}
                  className="mx-auto mb-4 w-16 h-16 sm:w-24 sm:h-24 object-contain"
                />
                <h3
                  className="text-sm sm:text-md font-semibold mb-1 text-gray-800 truncate"
                  title={product.productName}
                >
                  {product.productName || "Organic Vegetable"}
                </h3>
                <p
                  className={`font-medium text-xs sm:text-sm ${
                    product.quantity > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.quantity > 0 ? `${product.quantity} ITEMS` : "Out of stock"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductsSlider;
