import React, { useState, useRef } from "react";
import { Slider, Typography, Box } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";


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
  const isManualScroll = useRef(false);

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (container) {
      const card = container.children[index];
      if (card) {
        const containerCenter = container.offsetWidth / 2;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const scrollLeft = cardCenter - containerCenter;

        isManualScroll.current = true;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });

        setTimeout(() => {
          isManualScroll.current = false;
        }, 600);
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
    <section className="sunscreen-selector show-only-mobile300 py-4 px-3 w-full">
      <h2 className="text-base font-semibold mb-2">
        Pick your perfect sunscreen
      </h2>
      <p className="text-gray-500 mb-4 text-sm">
        Meet the SPF match for your skin type.
      </p>

      {/* Horizontal Scroll Images */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-3 pb-4 scroll-smooth hidden-scrollbar"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`relative bg-white min-w-[200px] max-w-[220px] h-[260px] flex-shrink-0 rounded-md shadow-md transition-all duration-500 ease-in-out transform ${
              value === index
                ? "scale-105 translate-y-[-4px] opacity-100"
                : "scale-95 opacity-80"
            }`}
          >
            <div className="relative w-full h-full p-2">
              <img
                src={product.image}
                alt={`Product ${product.id}`}
                className="w-full h-full object-contain rounded-md"
              />
              {value === index && (
                <div
                  className="absolute right-2 bottom-2 bg-black text-white text-sm rounded-md flex items-center justify-center gap-1 px-3 py-1 "
                  style={{ zIndex: 20 }}
                >
                  <AiOutlinePlus className="text-lg" />
                  Add
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skin Type Slider */}
      <Box sx={{ width: "100%", px: 1 }}>
        <Typography align="center" fontWeight={600} mb={1}>
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
            height: 8,
            "& .MuiSlider-thumb": {
              backgroundColor: "orange",
              border: "3px solid white",
              width: 22,
              height: 22,
              boxShadow: "0 0 0 4px rgba(255, 165, 0, 0.3)",
              "&:hover": {
                boxShadow: "0 0 0 6px rgba(255, 165, 0, 0.4)",
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
              height: 12,
              width: 12,
              borderRadius: "50%",
              marginTop: "-3px",
            },
          }}
        />

        <Box className="flex justify-between text-xs mt-1 px-2">
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
