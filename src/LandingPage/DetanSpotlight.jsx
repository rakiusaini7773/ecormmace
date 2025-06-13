import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import CustomButton from "../components/common/CustomButton";

const products = [
  {
    id: 1,
    label: "TRENDING",
    image:
      "https://foxtale.in/cdn/shop/files/1_70f32a6d-19bb-49ea-9940-8d522ba8df2c.jpg?v=1743841351&width=600",
    rating: 4.7,
    name: "Skin Radiance Mask",
    description: "8+ hours of oil control + pearlescent",
    price: "₹ 545",
    coupon: "DETAN15",
  },
  {
    id: 2,
    label: "NEW LAUNCH",
    image:
      "https://foxtale.in/cdn/shop/files/SGFW-01_1.jpg?v=1746782458&width=600",
    rating: 4.8,
    name: "Super Glow Face Wash",
    description: "Daily tan remover that boosts glow",
    price: "₹ 249",
    coupon: "DETAN15",
  },
  {
    id: 3,
    label: "CELEBRITY–APPROVED",
    image:
      "https://foxtale.in/cdn/shop/files/FXN-ESDS50_1.jpg?v=1743841754&width=600",
    rating: 4.8,
    name: "SPF 50 Glow Sunscreen",
    description: "Prevents tan & boosts glow",
    price: "₹ 349",
    coupon: "DETAN15",
  },
  {
    id: 4,
    label: "",
    image:
      "https://foxtale.in/cdn/shop/files/1_16_22be3ab1-07e4-49ad-bed6-ea527b501b99.jpg?v=1743841022&width=600",
    rating: 4.8,
    name: "Exfoliating Body Wash",
    description: "Gently exfoliates tan away",
    price: "₹ 399",
    coupon: "DETAN15",
  },
];

const DetanSpotlight = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-10 px-4 xl:px-20">
      {/* Grid view for desktop */}
      <div className="hidden xl:grid gap-8 grid-cols-4 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isMobile={isMobile} />
        ))}
      </div>

      {/* Horizontal scroll for mobile/tablet */}
      <div className="xl:hidden overflow-x-auto hidden-scrollbar">
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[55%] max-w-[30%] flex-shrink-0"
            >
              <ProductCard product={product} isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, isMobile }) => (
  <div className="rounded-2xl overflow-hidden flex flex-col w-full">
    {/* Product Image with Label and Rating */}
    <div className="relative w-full">
      {/* Label */}
      {product.label && (
        <div className="absolute top-2 left-2 text-[11px] font-bold text-[#d83c6e] px-2 py-1 rounded bg-white z-10">
          {product.label}
        </div>
      )}

      {/* Rating at bottom inside image */}
      <div className="absolute bottom-2 left-2 flex items-center bg-white bg-opacity-90 px-2 py-[2px] rounded text-[13px] z-10">
        <span className="text-[#ffd166] text-[14px]">⭐</span>
        <span className="text-black font-semibold ml-1">{product.rating}</span>
      </div>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto object-cover"
        style={isMobile ? { width: "100%", borderRadius: "21px" } : {}}
      />
    </div>

    {/* Product Details */}
    <div
      className="flex flex-col pt-4 pb-5 text-[#4b4b4b] font-[Poppins]"
      style={isMobile ? { paddingLeft: "5px" } : {}}
    >
      {/* Name */}
      <h3 className="font-semibold text-[15px] text-black leading-snug mb-1">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-[13px] leading-snug mb-3">{product.description}</p>

      {/* Divider and Bottom Section */}
      <div className="border-t border-black pt-4 flex justify-between items-end">
        <div>
          <p className="text-black text-[16px] font-semibold">
            {product.price}
          </p>
          <p className="flex items-center gap-1 text-[13px] mt-[2px]">
            <FaTag size={12} /> {product.coupon}
          </p>
        </div>

        <CustomButton className="bg-black text-white text-sm px-4 py-1 rounded">
          Add
        </CustomButton>
      </div>
    </div>
  </div>
);

export default DetanSpotlight;
