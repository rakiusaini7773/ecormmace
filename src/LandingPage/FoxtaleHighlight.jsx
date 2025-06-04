import React, { useState, useEffect } from "react";

const slides = [
  {
    image:
      "https://foxtale.in/cdn/shop/files/GSS_DESKTOP.jpg?v=1746193661&width=2200",
    heading: "Meet the main character!",
    text: "The lead in Rohit Saraf’s\nglow story? Glow Sunscreen!",
  },
  {
    image:
      "https://foxtale.in/cdn/shop/files/DESKTOP_c0292f84-c40c-47fb-b7d7-fba64f7742a3.jpg?v=1747893944&width=2200",
    heading: "Glow is the new bold!",
    text: "Rohit’s glow secret is finally out.\nTry it for yourself!",
  },
  {
    image:
      "https://foxtale.in/cdn/shop/files/DESKTOP_7c3fa865-9b1b-47dd-ae4c-1d1d105a6c3f.jpg?v=1747893944&width=2200",
    heading: "Sun kissed and protected",
    text: "With Foxtale’s sunscreen,\nshine all day long!",
  },
];

const FoxtaleHighlight = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-10 md:px-12 lg:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
        Peek into Foxtale HQ
      </h2>

      <div className="relative w-full">
        {/* Slide Image */}
        <div className="w-full rounded-xl overflow-hidden">
          <img
            src={slides[current].image}
            alt={`Slide ${current + 1}`}
            className="w-full rounded-xl shadow-lg object-cover max-h-[400px] md:max-h-[600px]"
          />
        </div>

        {/* Slide Content - overlay on all screen sizes */}
        <div
          className="
            absolute
            top-1/2
            left-0
            transform
            -translate-y-1/2
            p-4
            md:p-6
            w-[85%]
            sm:w-[70%]
            bg-gradient-to-r
            from-white
            via-[#ffffffcc]
            to-transparent
            rounded-r-xl
          "
        >
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2">
            {slides[current].heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-4 font-bold whitespace-pre-line">
            {slides[current].text}
          </p>

          {/* Dots */}
          <div className="flex space-x-2 mt-2">
            {slides.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full cursor-pointer transition ${
                  index === current ? "bg-black" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoxtaleHighlight;
