import { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

const ContactIcon = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="bg-[#ef8220] text-white hover:bg-[#d76f16] p-4 rounded-full shadow-xl border border-white/30 transition-all duration-300 hover:scale-110"
      >
        <FaArrowUp className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default ContactIcon;
