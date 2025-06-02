import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/slice/slices";

const StarIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.959c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.374 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.959a1 1 0 00-.364-1.118L3.636 9.386c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.959z" />
  </svg>
);

const ProductDetailContent = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQtyChange = (type) => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={"full" + i} filled />
        ))}
        {halfStar && (
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-grad">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-grad)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.959c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.374 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.959a1 1 0 00-.364-1.118L3.636 9.386c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.959z"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={"empty" + i} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900">{product.name}</h2>
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold tracking-wide">
            FREE GIFT
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          {renderStars(product.rating)}
          <span className="text-gray-600 font-semibold">{product.rating.toFixed(1)}</span>
          {/* <span className="text-gray-400">•</span> */}
          {/* <span className="text-gray-600">{product.reviews?.length || 0} reviews</span> */}
        </div>

        <p className="text-2xl mt-4 font-extrabold text-gray-900">
          ₹{product.discountPrice.toLocaleString("en-IN")}
          <span className="line-through text-gray-400 text-base ml-3">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-green-600 font-semibold ml-3">
            ({product.offerPercentage}% OFF)
          </span>
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={() => handleQtyChange("dec")}
          aria-label="Decrease quantity"
          className="w-12 h-12 flex items-center justify-center text-3xl rounded-full border border-gray-300 hover:bg-gray-100 transition"
          disabled={quantity === 1}
        >
          −
        </button>
        <span className="text-xl font-semibold">{quantity}</span>
        <button
          onClick={() => handleQtyChange("inc")}
          aria-label="Increase quantity"
          className="w-12 h-12 flex items-center justify-center text-3xl rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          +
        </button>
      </div>

      <button
        onClick={() => dispatch(addToCart({ ...product, quantity }))}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 rounded-lg shadow-lg transition duration-300"
        aria-label="Add to Cart"
      >
        ADD TO CART
      </button>

      {product.availableOffers?.length > 0 && (
        <div className="border border-dashed rounded-md p-5 bg-gray-50 mt-8">
          <h4 className="font-semibold mb-3 text-gray-800 text-lg">Available Offers</h4>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
            {product.availableOffers.map((offer, idx) => (
              <li key={idx}>{offer}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4 mt-6">
        {product.description && (
          <details className="border rounded-lg p-4 group" open>
            <summary className="font-semibold cursor-pointer text-gray-800 group-open:mb-3 select-none">
              DESCRIPTION
            </summary>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </details>
        )}

        {product.howToUse?.length > 0 && (
          <details className="border rounded-lg p-4 group">
            <summary className="font-semibold cursor-pointer text-gray-800 group-open:mb-3 select-none">
              HOW TO USE
            </summary>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm mt-2">
              {product.howToUse.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </details>
        )}

        {product.benefits?.length > 0 && (
          <details className="border rounded-lg p-4 group">
            <summary className="font-semibold cursor-pointer text-gray-800 group-open:mb-3 select-none">
              BENEFITS
            </summary>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm mt-2">
              {product.benefits.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </details>
        )}

        {product.ingredients?.length > 0 && (
          <details className="border rounded-lg p-4 group">
            <summary className="font-semibold cursor-pointer text-gray-800 group-open:mb-3 select-none">
              INGREDIENTS
            </summary>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm mt-2">
              {product.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <div className="text-xs text-gray-600 mt-6 space-y-2 border-t pt-4">
        {product.technology && (
          <p>
            <strong>Technology:</strong> {product.technology}
          </p>
        )}
        {product.info?.shelfLife && (
          <p>
            <strong>Shelf Life:</strong> {product.info.shelfLife}
          </p>
        )}
        {product.info?.skinType && (
          <p>
            <strong>Skin Type:</strong> {product.info.skinType}
          </p>
        )}
        {product.info?.countryOfOrigin && (
          <p>
            <strong>Origin:</strong> {product.info.countryOfOrigin}
          </p>
        )}
        {product.info?.manufacturedBy && (
          <p>
            <strong>Manufacturer:</strong> {product.info.manufacturedBy}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailContent;
