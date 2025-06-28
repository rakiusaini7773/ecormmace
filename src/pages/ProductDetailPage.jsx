import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const ProductDetailsPage = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [imageIndex, setImageIndex] = useState(0);
  const [showStickyVideo, setShowStickyVideo] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState("0% 0%");
  const [showShareMenu, setShowShareMenu] = useState(false);

  const imgRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!showStickyVideo) setShowStickyVideo(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showStickyVideo]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition(`${x}% ${y}%`);
  };

  const handleShareClick = () => {
    setShowShareMenu((prev) => !prev);
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
    setShowShareMenu(false);
  };

  if (!product) {
    return (
      <div className="p-6 text-center">
        <p>Product not found. Please go back.</p>
        <button
          className="mt-4 bg-black text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % product.imageUrls.length);
  };

  const handlePrev = () => {
    setImageIndex((prev) => (prev - 1 + product.imageUrls.length) % product.imageUrls.length);
  };

  return (
    <>
      <Navbar />

      <div className="px-4 md:px-8 py-10 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left - Main Image with Zoom */}
          <div
            className="md:w-1/2 relative w-full"
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Share Button */}
            <div className="absolute top-3 right-3 z-30">
              <button
                className="bg-white p-2 rounded-full shadow hover:shadow-md"
                onClick={handleShareClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.03-.47-.09-.7l7.02-4.11A2.995 2.995 0 0 0 18 7.91c1.66 0 3-1.34 3-3s-1.34-3-3-3S15 3.25 15 4.91c0 .24.04.47.09.7l-7.02 4.11a2.995 2.995 0 0 0-1.96-.77c-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 1.96-.77l7.12 4.14c-.05.21-.08.43-.08.66 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-40">
                  <div className="flex flex-col text-sm">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaWhatsapp className="text-green-500" /> WhatsApp
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaFacebook className="text-blue-600" /> Facebook
                    </a>
                    <a
                      href={`mailto:?subject=Check this product&body=${encodeURIComponent(window.location.href)}`}
                      className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaEnvelope className="text-gray-600" /> Email
                    </a>
                    <button
                      onClick={copyLink}
                      className="px-4 py-2 hover:bg-gray-100 text-left flex items-center gap-2"
                    >
                      <FaLink className="text-gray-700" /> Copy Link
                    </button>
                  </div>
                </div>
              )}
            </div>

            <img
              ref={imgRef}
              src={product.imageUrls?.[imageIndex]}
              alt="product"
              className="rounded-xl shadow-md w-full"
            />

            {showZoom && (
              <div
                className="absolute top-0 left-full ml-6 z-20 hidden md:block"
                style={{ transform: "translateX(60px)" }}
              >
                <div
                  className="border shadow-xl rounded-xl overflow-hidden"
                  style={{
                    width: "500px",
                    height: "500px",
                    backgroundImage: `url(${product.imageUrls?.[imageIndex]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `350%`,
                    backgroundPosition: zoomPosition,
                  }}
                />
              </div>
            )}

            {product.imageUrls.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            <span className="absolute left-2 top-2 bg-white text-xs px-2 py-1 rounded shadow font-medium flex items-center gap-1">
              <FaStar className="text-yellow-500" /> {product.rating?.toFixed(1)}
            </span>
          </div>

          <div className="md:w-1/2 space-y-6 px-2 md:px-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">{product.heading}</h1>
            <h2 className="text-xl text-gray-700 font-medium">{product.subHeading}</h2>

            <p className="text-base text-gray-600 leading-relaxed">{product.subDescription}</p>

            <div className="mt-4">
              <p className="text-3xl font-extrabold text-orange-600">₹ {product.price}</p>
              <p className="text-sm text-gray-500 mt-1">MRP: ₹ {product.price} inclusive of all taxes</p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>

              <div className="flex flex-wrap gap-3">
                {product.helpsWith?.map((hw, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-full text-sm bg-white"
                  >
                    {hw.icon && (
                      <img
                        src={hw.icon}
                        alt={hw.text}
                        className="w-5 h-5 object-contain"
                      />
                    )}
                    <span className="text-gray-800">{hw.text}</span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm">
                <strong className="text-gray-700">Ingredients:</strong>{" "}
                <span className="text-red-500">{product.ingredientText}</span>
              </p>

              <p className="text-sm mt-2">
                <strong className="text-gray-700">For:</strong> {product.for}
              </p>

              <p className="text-sm mt-2">
                <strong className="text-gray-700">Routine:</strong> Daily, morning & night
              </p>
            </div>

            {product.offers?.length > 0 && (
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Offers</h3>
                <div className="space-y-4">
                  {product.offers.map((offer, i) => (
                    <div
                      key={i}
                      className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex justify-between items-center text-sm"
                    >
                      <div className="text-gray-700">
                        <strong className="block text-base text-orange-600 mb-1">
                          {offer.title || offer.code}
                        </strong>
                        {offer.description}
                      </div>
                      <div className="ml-4">
                        <div className="bg-gray-200 px-3 py-1 rounded text-sm font-medium text-gray-800">
                          {offer.code}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900">
                ADD TO CART
              </button>
              <button className="border border-black text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white">
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Product Description */}
      <div className="pt-6 px-4 md:px-8 py-10 max-w-7xl mx-auto relative">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {product.videoUrl && showStickyVideo && showVideo && (
        <div className="fixed bottom-4 right-4 w-44 z-50 shadow-lg rounded-lg overflow-hidden bg-white border border-gray-200">
          {/* Close Button */}
          <div className="absolute top-1 right-1">
            <button
              onClick={() => setShowVideo(false)}
              className="text-black bg-white rounded-full w-6 h-6 text-sm font-bold shadow"
            >
              ×
            </button>
          </div>

          {/* Non-Interruptible Video Player */}
          <div className="relative w-full">
            <video
              ref={videoRef}
              src={product.videoUrl}
              autoPlay
              muted
              loop
              className="w-full h-auto pointer-events-none"
              onContextMenu={(e) => e.preventDefault()}
              onPause={() => {
                videoRef.current?.play();
                setIsPlaying(true);
              }}
            />
            
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductDetailsPage;
