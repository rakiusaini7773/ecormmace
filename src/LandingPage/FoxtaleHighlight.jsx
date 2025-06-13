import React, { useState, useEffect } from "react";

const slides = [
  {
    image:
      "https://foxtale.in/cdn/shop/files/DESKTOP_OBM.jpg?v=1748594589&width=2200",
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
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-10 md:px-12 lg:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
        Peek into Foxtale HQ
      </h2>
      <div className="block md:hidden relative h-[720px] rounded-xl overflow-hidden bg-gradient-to-b from-white via-white/80 to-pink-100 w-full">
  {/* Background Image via CSS */}
  <div
    className="absolute inset-0 z-0 bg-no-repeat bg-cover"
    style={{
      backgroundImage: `url(${slides[current].image})`,
      backgroundPosition: "85% center",
    }}
  ></div>

  {/* Overlay content */}
  <div className="absolute inset-0  z-10 flex flex-col justify-end rounded-xl space-y-5 w-full">
    {/* Combined row: Dots Left, Text Right */}
    <div className="bg-gradient-to-b from-white via-white/80 to-pink-100 backdrop-blur-sm p-4 rounded-lg flex justify-between items-start gap-4 w-full">
      
      {/* Dots Left */}
      <div className="flex flex-col items-start justify-start space-y-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition duration-300 ${
              index === current ? "bg-black scale-110" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>

      {/* Text Right */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {slides[current]?.heading}
        </h2>
        <p className="text-base text-gray-700 whitespace-pre-line">
          {slides[current]?.text}
        </p>
      </div>

    </div>
  </div>
</div>

      {/* DESKTOP layout */}
      <div className="relative w-full hidden md:block">
        <div className="w-full rounded-xl overflow-hidden">
          <img
            src={slides[current].image}
            alt={`Slide ${current + 1}`}
            className="w-full rounded-xl shadow-lg object-cover max-h-[600px]"
          />
        </div>

        <div
          className="
            absolute
            top-1/2
            left-0
            transform
            -translate-y-1/2
            p-6
            w-[70%]
            bg-gradient-to-r
            from-white
            via-[#ffffffcc]
            to-transparent
            rounded-r-xl
          "
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {slides[current].heading}
          </h2>
          <p className="text-xl text-gray-700 mb-4 font-bold whitespace-pre-line">
            {slides[current].text}
          </p>

          <div className="flex space-x-2 mt-2">
            {slides.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full cursor-pointer transition ${index === current ? "bg-black" : "bg-gray-400"
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
