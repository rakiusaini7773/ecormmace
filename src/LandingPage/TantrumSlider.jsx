import { useState } from "react";
import slider1 from "../images/slider1.jpg";
import slider2 from "../images/slider2.jpg";
import slider3 from "../images/slider3.jpg";

const slides = [
  {
    id: 1,
    image: slider1,
  },
  {
    id: 2,
    image: slider2,
  },
  {
    id: 3,
    image: slider3,
  },
];

const TantrumSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-full bg-[#E4C9FF] py-10 px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Slide Image */}
      <div className="w-full flex justify-center items-center mb-6">
        <img
          src={slides[current].image}
          alt={`slide-${current + 1}`}
          className="w-full max-w-[700px] h-auto object-contain transition duration-500 ease-in-out"
        />
      </div>

      {/* Shop Button */}
      <button className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300">
        SHOP NOW
      </button>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black font-bold text-2xl"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black font-bold text-2xl"
      >
        ›
      </button>
    </div>
  );
};

export default TantrumSlider;
