import React, { useState, useRef, useEffect } from "react";
import { Slider, Typography, Box } from "@mui/material";

const skinTypes = ["Oily", "Normal", "Dry"];

const products = [
  {
    id: 1,
    image:
      "https://foxtale.in/cdn/shop/files/MATTE_SUNSCREEN_PDP_fd1a6e57-f191-4c52-97f8-395058bb1c58.jpg?v=1743842525",
  },
  {
    id: 2,
    image: "https://foxtale.in/cdn/shop/files/FXN-ESDS50_1.jpg?v=1748864892",
  },
  {
    id: 3,
    image:
      "https://foxtale.in/cdn/shop/files/1_7_25983d24-38d2-40cb-80c0-26e52b9bfbf9.jpg?v=1743840991",
  },
];

const SunscreenSelector = () => {
  const [value, setValue] = useState(0);
  const scrollRef = useRef(null);
  const isManualScroll = useRef(false); // prevent loop feedback

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (container) {
      const card = container.children[index];
      if (card) {
        const scrollLeft = card.offsetLeft - container.offsetLeft;
        isManualScroll.current = true;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });

        // Allow some time for scroll to finish before re-enabling detection
        setTimeout(() => {
          isManualScroll.current = false;
        }, 500);
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    scrollToCard(newValue);
  };

  const handleScroll = () => {
    if (isManualScroll.current) return;

    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, offsetWidth } = container;
      const center = scrollLeft + offsetWidth / 2;

      let closestIdx = 0;
      let closestDist = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - childCenter);

        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = index;
        }
      });

      setValue(closestIdx);
    }
  };

  return (
    <section className="lg:hidden px-2 py-4">
      <h2 className="text-lg font-semibold mb-1">
        Pick your perfect sunscreen
      </h2>
      <p className="text-gray-500 mb-3 text-sm">
        Meet the SPF match for your skin type.
      </p>

      {/* Horizontal Scroll Images */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-3 pb-4 scroll-smooth hidden-scrollbar"
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`min-w-[240px] h-[280px] relative flex-shrink-0 bg-white transition-transform duration-300 ease-in-out rounded-md shadow ${value === index ? "scale-105" : "scale-100"
              }`}
          >
            <div className="relative w-full h-60 p-2 z-10">
              <img
                src={product.image}
                alt={`Product ${product.id}`}
                className="w-full h-full object-contain rounded-md"
              />
              {value === index && (
                <button
                  className="absolute right-1 bottom-1 bg-black text-white py-1 px-4 rounded-full text-xs animate-pulse"
                  style={{
                    zIndex: 20,
                    transformOrigin: "right top",
                    animationDuration: "1.5s",
                    animationIterationCount: "infinite",
                  }}
                >
                  + Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skin Type Slider */}
      <Box sx={{ width: "100%", px: 1 }}>
        <Typography align="center" fontWeight={600} mb={0.5}>
          Skin type
        </Typography>

        <Slider
          value={value}
          min={0}
          max={products.length - 1}
          step={1}
          onChange={handleChange}
          marks={skinTypes.map((_, i) => ({ value: i, label: "" }))}
          sx={{
            color: "transparent",
            height: 6,
            "& .MuiSlider-thumb": {
              backgroundColor: "orange",
              border: "3px solid white",
              width: 18,
              height: 18,
              boxShadow: "0 0 0 3px rgba(255, 165, 0, 0.3)",
              "&:hover": {
                boxShadow: "0 0 0 5px rgba(255, 165, 0, 0.4)",
              },
            },
            "& .MuiSlider-track": {
              background: "transparent",
            },
            "& .MuiSlider-rail": {
              opacity: 0.1,
              backgroundColor: "#000",
            },
            "& .MuiSlider-mark": {
              backgroundColor: "#ccc",
              height: 10,
              width: 10,
              borderRadius: "50%",
              marginTop: "-2px",
            },
          }}
        />

        <Box className="flex justify-between text-xs mt-1 px-1">
          {skinTypes.map((label, idx) => (
            <Typography
              key={idx}
              sx={{
                color: value === idx ? "orange" : "gray",
                fontWeight: value === idx ? 600 : "normal",
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default SunscreenSelector;
