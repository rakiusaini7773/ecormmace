import React from "react";
import { FaTag } from "react-icons/fa";
import CustomButton from "../components/common/CustomButton";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const products = [
  {
    id: 1,
    label: "TOP RATED",
    image:
      "https://foxtale.in/cdn/shop/files/1_16_22be3ab1-07e4-49ad-bed6-ea527b501b99.jpg?v=1743841022&width=400",
    rating: 4.8,
    name: "Exfoliating Body Wash",
    description: "Gently exfoliates tan away",
    price: "399",
    coupon: "BODY10",
  },
  {
    id: 2,
    label: "TOP SELLER",
    image:
      "https://foxtale.in/cdn/shop/files/1_4_f8dd6699-ef44-44de-a319-89b0244b82e7.jpg?v=1743840898&width=400",
    rating: 4.8,
    name: "Brightening Body Wash",
    description: "Exfoliates tan & brightens skin",
    price: "399",
    coupon: "BODY10",
  },
  {
    id: 3,
    label: "NEW",
    image:
      "https://foxtale.in/cdn/shop/files/BRIGHTENING-BODY-LOTION.jpg?v=1743843873&width=400",
    rating: 4.7,
    name: "SPF 30 Detan Body Lotion",
    description: "With Vitamin C and Niacinamide",
    price: "499",
    coupon: "BODY10",
  },
];

const BodycareSpotlight = () => { 
  const dispatch = useDispatch();
  return (
    <section className="py-10 px-4 xl:px-20">
      {/* Heading */}
      <div className="flex justify-between items-start mb-6 max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
          Bodycare Spotlight
        </h2>
        <a
          href="#"
          className="text-[#FF8359] font-semibold text-lg sm:text-xl"
        >
          See All
        </a>
      </div>

      {/* Grid view for desktop */}
      <div className="hidden lg:grid gap-8 grid-cols-3 justify-items-center max-w-7xl mx-auto hidden-scrollbar">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} dispatch={dispatch} />
        ))}
      </div>

      {/* Horizontal scroll for mobile/tablet */}
      <div className="lg:hidden overflow-x-auto hidden-scrollbar">
        <div className="flex gap-4">
          {products.map((product) => (
            <div key={product.id} className="min-w-[70%] max-w-[80%] flex-shrink-0">
              <ProductCard product={product} dispatch={dispatch}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product ,  dispatch }) => (
  <div className="rounded-2xl overflow-hidden flex flex-col w-full">
    {/* Product Image with Label and Rating */}
    <div className="relative w-full">
      {/* Label */}
      {product.label && (
        <div className="absolute top-2 left-2 text-[11px] font-bold text-[#d83c6e] px-2 py-1 rounded bg-white z-10">
          {product.label}
        </div>
      )}

      {/* Rating (at bottom-left inside the image) */}
      <div className="absolute bottom-2 left-2 flex items-center bg-white bg-opacity-90 px-2 py-[2px] rounded text-[13px] z-10">
        <span className="text-[#ffd166] text-[14px]">⭐</span>
        <span className="text-black font-semibold ml-1">{product.rating}</span>
      </div>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto object-cover"
      />
    </div>

    {/* Product Details */}
    <div className="flex flex-col pt-4 pb-5 text-[#4b4b4b] font-[Poppins]">
      {/* Name */}
      <h3 className="font-semibold text-[15px] text-black leading-snug mb-1">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-[13px] leading-snug mb-3">{product.description}</p>

      {/* Divider and Bottom Section */}
      <div className="border-t border-black pt-4 flex justify-between items-end">
        <div>
          <p className="text-black text-[16px] font-semibold"> ₹ {product.price}</p>
          <p className="flex items-center gap-1 text-[13px] mt-[2px]">
            <FaTag size={12} /> {product.coupon}
          </p>
        </div>

        <CustomButton onClick={() => dispatch(addToCart(product))} className="bg-black text-white text-sm px-4 py-1 rounded">
          Add
        </CustomButton>
      </div>
    </div>
  </div>
);

export default BodycareSpotlight;
