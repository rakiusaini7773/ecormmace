import React from "react";

const ProductDetailContent = ({ product }) => {
  return (
    <div>
      {/* Product Name & Free Gift Tag */}
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-2xl font-bold text-blue-900">{product.name}</h2>
        <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
          FREE GIFT
        </span>
      </div>

      {/* Rating & Price */}
      <div className="mb-2">
        <p className="text-yellow-600 font-semibold">
          {"★".repeat(Math.floor(product.rating))} {product.rating} • {product.reviews} reviews
        </p>
        <p className="text-lg mt-1">
          ₹{product.discountPrice}{" "}
          <span className="line-through text-gray-500">₹{product.price}</span>{" "}
          <span className="text-green-600 text-sm">({product.offerPercentage}% off)</span>
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center mb-4">
        <button className="px-3 py-1 border rounded">−</button>
        <span className="px-4">1</span>
        <button className="px-3 py-1 border rounded">+</button>
      </div>

      {/* Add to Cart Button */}
      <button className="bg-green-300 hover:bg-green-400 text-green-900 font-bold py-2 px-6 rounded w-full mb-4">
        ADD TO CART
      </button>

      {/* Offer Gift Box */}
      <div className="border rounded p-4 mb-4">
        <p className="font-semibold mb-2">Free No Shine Eco Sunscreen on ₹1999+</p>
        <img
          src="/images/gift-sunscreen.png"
          alt="Free Gift"
          className="w-16 h-16 object-contain"
        />
        <p className="text-xs text-gray-500 mt-1">1 gift item included</p>
      </div>

      {/* Expandable Sections */}
      <details className="mb-2">
        <summary className="font-semibold cursor-pointer">DESCRIPTION</summary>
        <p className="mt-1 text-sm text-gray-700">{product.description}</p>
      </details>
      <details className="mb-2">
        <summary className="font-semibold cursor-pointer">HOW TO USE</summary>
        <ul className="list-disc ml-6 mt-1 text-sm text-gray-700">
          {product.howToUse.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </details>
      <details className="mb-2">
        <summary className="font-semibold cursor-pointer">BENEFITS</summary>
        <ul className="list-disc ml-6 mt-1 text-sm text-gray-700">
          {product.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </details>
      <details>
        <summary className="font-semibold cursor-pointer">INGREDIENTS</summary>
        <ul className="list-disc ml-6 mt-1 text-sm text-gray-700">
          {product.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default ProductDetailContent;
