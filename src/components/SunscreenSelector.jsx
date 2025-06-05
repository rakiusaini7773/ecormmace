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
  const isManualScroll = useRef(false); // prevent loop feedback

  // Scroll container so selected card is centered
  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (container) {
      const card = container.children[index];
      if (card) {
        // Calculate scroll so card center aligns with container center
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
    <section className="lg:hidden py-6 px-4"> {/* Added padding */}
      <h2 className="text-lg font-semibold mb-2">Pick your perfect sunscreen</h2>
      <p className="text-gray-500 mb-5 text-sm">
        Meet the SPF match for your skin type.
      </p>

      {/* Horizontal Scroll Images */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-6 pb-6 scroll-smooth scrollbar-hide hidden-scrollbar" // increased gap, padding bottom for spacing
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`min-w-[260px] h-[300px] relative flex-shrink-0 bg-white transition-transform duration-300 ease-in-out rounded-md shadow-md ${value === index ? "scale-110" : "scale-95" // increased scale on selected
              }`}
            style={{ transformOrigin: "center bottom" }} // scale from bottom center for nicer effect
          >
            <div className="relative w-full h-72 p-3 z-10">
              <img
                src={product.image}
                alt={`Product ${product.id}`}
                className="w-full h-full object-contain rounded-md"
              />
              {value === index && (


                <div
                  className=" animate-pulse absolute right-2 bottom-0 bg-black text-white text-xs rounded-md flex items-center justify-center gap-2"
                  style={{
                    width: "113.76px",
                    height: "52.8px",
                    padding: "14px 24px 14px 20px",
                    fontSize: "16px", // Increases "Add" text size
                    zIndex: 20,
                    transformOrigin: "right top",
                    animationDuration: "1.5s",
                    animationIterationCount: "infinite",
                  }}
                >
                  <AiOutlinePlus className="text-xl" />
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
