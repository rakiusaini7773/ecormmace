import React from "react";

const AppPromoBanner = () => {
  return (
    <div className="bg-[#e9e9e9] px-4 py-5 md:px-6 md:py-6 rounded-md max-w-7xl mx-auto mt-6 mb-14 w-full">
      <div className="flex flex-row-reverse md:flex-row items-center justify-between gap-4 md:gap-6">
        
        {/* Mascot */}
        <div className="flex-shrink-0">
          <img
            src="https://foxtale.in/cdn/shop/files/MASCOT_300x.png?v=1745827805"
            alt="Fox Mascot"
            className="w-20 md:w-24 h-auto"
          />
        </div>

        {/* Text and Buttons */}
        <div className="flex-1 text-left">
          <h2 className="font-semibold text-gray-900 text-sm md:text-base">
            Earn 2X cashback via Foxcoins with every order, only on the app!
          </h2>
          <p className="text-sm text-gray-800 mt-1 font-semibold">
            Download the app now.
          </p>

          <div className="flex gap-3 mt-3">
            <a href="#">
              <img
                src="https://foxtale.in/cdn/shop/files/Mobile_app_store_badge_1.svg?v=1745826029"
                alt="App Store"
                className="h-10"
              />
            </a>
            <a href="#">
              <img
                src="https://foxtale.in/cdn/shop/files/Mobile_app_store_badge.svg?v=1745826009"
                alt="Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPromoBanner;
