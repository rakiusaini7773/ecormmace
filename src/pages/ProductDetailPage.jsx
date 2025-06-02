import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import allProducts from "../data/products";
import ProductDetailContent from "../components/ProductDetailContent";
import Reviews from "../components/common/Reviews";
import Navbar from "../components/common/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";

const ProductDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const stateProduct = location.state?.product;
  const product = stateProduct || allProducts.find((item) => item.id.toString() === id);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (product?.image) {
      setMainImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-10">

        {/* 🔙 Back Button */}
        <div>
          <Tooltip title="Go Back" arrow>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition text-sm font-semibold"
            >
              <AiOutlineArrowLeft className="text-lg" />
              Back
            </button>
          </Tooltip>
        </div>

        {/* Top Section: Images and Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side Images */}
          <div className="flex flex-col items-center w-full">
            <img
              src={mainImage}
              alt="Main Product"
              className="max-w-full max-h-[450px] object-contain border rounded-lg shadow-lg"
            />

            <div className="flex gap-3 mt-4 overflow-x-auto w-full justify-center md:justify-start">
              {[product.image, ...(product.images || [])].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx}`}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 object-contain border-2 rounded cursor-pointer transition-transform duration-200 ${
                    mainImage === img ? "border-blue-500 scale-105" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side Details */}
          <div className="w-full">
            <ProductDetailContent product={product} />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="w-full">
          <Reviews reviews={product.reviewDetails || []} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
