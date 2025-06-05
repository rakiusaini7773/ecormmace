// components/SunscreenSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SunscreenSlider = () => {
 const slides = [
    'https://foxtale.in/cdn/shop/files/DESKTOP_-_2025-05-31T230421.523.jpg?v=1748712886&width=2200', 
    'https://foxtale.in/cdn/shop/files/DESKTOP_-_2025-06-04T144804.130.jpg?v=1749028703&width=2200',
    'https://foxtale.in/cdn/shop/files/DESKTOP_-_2025-06-04T122816.951.jpg?v=1749020325&width=2200',
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
  };

  return (
    <div className="px-4 py-6">
      <Slider {...settings}>
        {slides.map((src, index) => (
          <div key={index} className="rounded-xl overflow-hidden">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full flex-shrink-0 object-cover user-select-none"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SunscreenSlider;
