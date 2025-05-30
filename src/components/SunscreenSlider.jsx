// components/SunscreenSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SunscreenSlider = () => {
 const slides = [
    'https://thefaceshop.in/cdn/shop/files/2000_x_400_5819bea4-7433-4420-955f-a14d90c91185.jpg?v=1746192180&width=2000', 
    'https://thefaceshop.in/cdn/shop/files/2000_x_400.png?v=1744799774&width=2000',
    'https://thefaceshop.in/cdn/shop/files/2000_x_400_2_42781772-4500-4857-8550-dff62b7ec3b4.jpg?v=1747116071&width=2000',
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
