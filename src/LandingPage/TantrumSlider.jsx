import React from "react";
import Slider from "react-slick";
import slider1 from "../images/slider1.jpg";
import slider2 from "../images/slider2.jpg";
import slider3 from "../images/slider3.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  { id: 1, image: slider1 },
  { id: 2, image: slider2 },
  { id: 3, image: slider3 },
];

const TantrumSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={slide.id}>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full flex-shrink-0 object-cover"
            />
          </div>
        ))}
      </Slider>

  
    </div>
  );
};

export default TantrumSlider;
