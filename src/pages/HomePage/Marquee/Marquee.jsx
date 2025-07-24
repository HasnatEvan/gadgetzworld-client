import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const MarqueeComponent = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: marquee = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["marquee"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/marquee");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-gray-500 text-lg font-medium gap-3 min-h-screen w-full">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to load marquee text.
      </div>
    );
  }

  return (
  <div className="py-2  text-[#4cb648]">
  <Marquee
    gradient={false}
    speed={50}
    pauseOnHover={true}
    pauseOnClick={true}
  >
    {marquee.map((item, index) => (
      <span
        key={index}
        className="mx-6 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl font-semibold"
      >
        {item.text}
      </span>
    ))}
  </Marquee>
</div>

  );
};

export default MarqueeComponent;
