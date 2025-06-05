import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-xl shadow-md border hover:shadow-xl transition duration-300 overflow-hidden">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        {product.isNewLaunch && (
          <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
            NEW LAUNCH
          </span>
        )}
        <span className="absolute bottom-2 left-2 bg-white px-2 py-0.5 rounded text-sm font-semibold flex items-center gap-1">
          ⭐ {product.rating}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description?.slice(0, 40)}...</p>
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="font-bold text-lg">₹ {product.discountPrice || product.price}</p>
            <p className="text-xs text-red-500">{product.availableOffers?.[0]}</p>
          </div>
          <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">ADD</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
