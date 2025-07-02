import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import CustomButton from "../components/common/CustomButton";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const getUserId = () => sessionStorage.getItem("userId");

const DetanSpotlight = ({ products }) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-10 px-4 xl:px-20">
      {/* Desktop Grid */}
      <div className="hidden xl:grid gap-8 grid-cols-4 justify-items-center">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isMobile={false}
            dispatch={dispatch}
          />
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="xl:hidden overflow-x-auto hidden-scrollbar">
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[55%] max-w-[70%] flex-shrink-0"
            >
              <ProductCard
                product={product}
                isMobile={true}
                dispatch={dispatch}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, isMobile, dispatch }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const userId = getUserId();
    if (!userId) {
      toast.warning("Please login to add items to your cart.");
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-2xl overflow-hidden flex flex-col w-full">
      {/* Image */}
      <div
        className="relative w-full cursor-pointer"
        onClick={() =>
          navigate(`/product/${product._id}`, { state: { product } })
        }
      >
        {product.tag && (
          <div className="absolute top-2 left-2 text-[11px] font-bold text-[#d83c6e] px-2 py-1 rounded bg-white z-10">
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
          style={isMobile ? { borderRadius: "21px" } : {}}
        />
      </div>

      {/* Info Section */}
      <div
        className="flex flex-col pt-4 pb-5 text-[#4b4b4b] font-[Poppins]"
        style={isMobile ? { paddingLeft: "5px" } : {}}
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
          <CustomButton onClick={handleAddToCart}>Add</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default DetanSpotlight;
