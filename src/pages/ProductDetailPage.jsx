import React from "react";
import { useParams } from "react-router-dom";
import allProducts from "../data/products";
import ProductDetailContent from "../components/ProductDetailContent";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = allProducts.find((item) => item.id.toString() === id);

  if (!product) {
    return <div className="text-center text-red-500 mt-10">Product not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto p-6">
      {/* Left Side Promo Image */}
      <div className="relative">
        <img
          src="/images/korean-toner-banner.jpg"
          alt="Product Promo"
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute top-6 left-6 bg-white/80 p-4 rounded shadow-md max-w-xs">
          <p className="text-lg font-bold">Best Korean Toner</p>
          <p className="text-sm text-gray-700">
            to deliver unmatched hydration with a dewy finish
          </p>
        </div>
      </div>

      {/* Right Side Product Details */}
      <ProductDetailContent product={product} />
    </div>
  );
};

export default ProductDetailPage;
