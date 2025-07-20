import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axios.get("https://gadgetzworld-server.vercel.app/banners");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl text-[#ef8220]"></span>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="w-full mx-auto">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <img
              src={banner.image}
              alt={`Banner ${index + 1}`}
              className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[550px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
