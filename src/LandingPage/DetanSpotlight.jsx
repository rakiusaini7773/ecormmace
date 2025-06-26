import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import CustomButton from "../components/common/CustomButton";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import BaseApiManager from "../networking/baseAPIManager";
import { API_ENDPOINTS } from "../networking/apiConfig";
import { toast } from "react-toastify";

const DetanSpotlight = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_PRODUCTS);
        // Assuming API response structure: { products: [...] }
        const products = res.products || [];
        const activeProducts = products.filter((p) => p.status === "Active");
        setProducts(activeProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-10 px-4 xl:px-20">
      {/* Grid for desktop */}
      <div className="hidden xl:grid gap-8 grid-cols-4 justify-items-center">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isMobile={isMobile}
            dispatch={dispatch}
          />
        ))}
      </div>

      {/* Horizontal scroll for mobile */}
      <div className="xl:hidden overflow-x-auto hidden-scrollbar">
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[55%] max-w-[30%] flex-shrink-0"
            >
              <ProductCard
                product={product}
                isMobile={isMobile}
                dispatch={dispatch}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, isMobile, dispatch }) => (
  <div className="rounded-2xl overflow-hidden flex flex-col w-full">
    {/* Image + Label + Rating */}
    <div className="relative w-full">
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
        style={isMobile ? { width: "100%", borderRadius: "21px" } : {}}
      />
    </div>

    {/* Product Info */}
    <div
      className="flex flex-col pt-4 pb-5 text-[#4b4b4b] font-[Poppins]"
      style={isMobile ? { paddingLeft: "5px" } : {}}
    >
      <h3 className="font-semibold text-[15px] text-black leading-snug mb-1">
        {product.heading}
      </h3>

      <p className="text-[13px] leading-snug mb-3">{product.subDescription}</p>

      <div className="border-t border-black pt-4 flex justify-between items-end">
        <div>
          <p className="text-black text-[16px] font-semibold">₹ {product.price}</p>
          {product.offerCode && (
            <p className="flex items-center gap-1 text-[13px] mt-[2px]">
              <FaTag size={12} /> {product.offerCode}
            </p>
          )}
        </div>

        <CustomButton onClick={() => dispatch(addToCart(product))}>Add</CustomButton>
      </div>
    </div>
  </div>
);

export default DetanSpotlight;
