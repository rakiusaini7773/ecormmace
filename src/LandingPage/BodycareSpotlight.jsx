import React from "react";
import { FaTag } from "react-icons/fa";
import CustomButton from "../components/common/CustomButton";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BodycareSpotlight = ({ products }) => {
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

      {/* Grid view for desktop (only 3 products shown) */}
      <div className="hidden lg:grid gap-8 grid-cols-3 justify-items-center max-w-7xl mx-auto hidden-scrollbar">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product._id} product={product} dispatch={dispatch} />
        ))}
      </div>

      {/* Horizontal scroll for mobile/tablet (all products shown) */}
      <div className="lg:hidden overflow-x-auto hidden-scrollbar">
        <div className="flex gap-4">
          {products.map((product) => (
            <div key={product._id} className="min-w-[70%] max-w-[80%] flex-shrink-0">
              <ProductCard product={product} dispatch={dispatch} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ✅ FIXED: useNavigate inside a proper component body
const ProductCard = ({ product, dispatch }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl overflow-hidden flex flex-col w-full">
      {/* Image + Label + Rating */}
      <div
        className="relative w-full cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
      >
        {product.tag && (
          <div className="absolute top-2 left-2 text-[11px] font-bold text-[#d83c6e] px-2 py-1 rounded bg-white z-10 ">
            {product.tag}
          </div>
        )}

        <div className="absolute bottom-2 left-2 flex items-center bg-white bg-opacity-90 px-2 py-[2px] rounded text-[13px] z-10">
          <span className="text-[#ffd166] text-[14px]">⭐</span>
          <span className="text-black font-semibold ml-1">{product.rating}</span>
        </div>

        <img
          src={product.imageUrls?.[0]}
          alt={product.heading}
          className="w-full h-auto object-cover"
          style={{ width: "100%", borderRadius: "21px" }}
        />
      </div>

      {/* Product Info */}
      <div
        className="flex flex-col pt-4 pb-5 text-[#4b4b4b] font-[Poppins]"
        style={{ paddingLeft: "5px" }}
      >
        <h3 className="font-semibold text-[15px] text-black leading-snug mb-1">
          {product.heading}
        </h3>

        <p className="text-[13px] leading-snug mb-3">
          {product.subDescription?.split(" ").slice(0, 10).join(" ") +
            (product.subDescription?.split(" ").length > 10 ? "..." : "")}
        </p>

        <div className="border-t border-black pt-4 flex justify-between items-end">
          <div>
            <p className="text-black text-[16px] font-semibold">₹ {product.price}</p>
            {product.offerCode && (
              <p className="flex items-center gap-1 text-[13px] mt-[2px]">
                <FaTag size={12} /> {product.offerCode}
              </p>
            )}
          </div>

          <CustomButton onClick={() => dispatch(addToCart(product))}>
            Add
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default BodycareSpotlight;
