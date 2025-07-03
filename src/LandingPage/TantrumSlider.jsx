import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { toast } from "react-toastify";
import BaseApiManager from "../networking/baseAPIManager";
import { API_ENDPOINTS, API_BASE_URL } from "../networking/apiConfig";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TantrumSlider = () => {
  const [bannerData, setBannerData] = useState([]);

  const fetchBanners = async () => {
    try {
      const response = await BaseApiManager.get(
        `${API_BASE_URL}${API_ENDPOINTS.GET_ALL_BANNERS}`
      );
      
      const formatted = response.map((banner) => ({
        ...banner,
        imageUrl: banner.imageUrl,
        status:
          banner.status?.charAt(0).toUpperCase() +
          banner.status?.slice(1).toLowerCase(),
      }));

      // Only keep banners with "Active" status
      const activeBanners = formatted.filter(b => b.status === "Active");

      setBannerData(activeBanners);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      toast.error("Failed to load banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

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
        {bannerData.map((banner, index) => (
          <div key={banner._id || index}>
            <img
              src={banner.imageUrl}
              alt={banner.title || `Slide ${index + 1}`}
              className="w-full h-[600px] lg:w-full lg:h-full flex-shrink-0 object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TantrumSlider;
