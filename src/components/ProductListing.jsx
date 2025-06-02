import React, { useState, useEffect } from "react";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToLike, removeFromLike } from "../app/slice/slices";
import allProducts from '../data/products';

import { Link } from "react-router-dom";

const FilteredProductList = () => {
  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.like.likedItems);
console.log('allProducts', allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts || []);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [hoveredReviewId, setHoveredReviewId] = useState(null);

  useEffect(() => {
    const filterProducts = () => {
      let result = [...allProducts];
      if (selectedCategory) {
        result = result.filter((p) => p.category === selectedCategory);
      }
      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split("-").map(Number);
        result = result.filter((p) => p.price >= min && p.price <= max);
      }
      return result;
    };

    setFilteredProducts(filterProducts());
  }, [selectedCategory, selectedPriceRange]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange("");
  };

  const isLiked = (id) => likedItems.some((item) => item.id === id);

  const toggleLike = (product) => {
    if (isLiked(product.id)) {
      dispatch(removeFromLike(product.id));
    } else {
      dispatch(addToLike(product));
    }
  };

  const getReviewBreakdown = (totalReviews) => {
    const breakdown = {
      5: Math.floor(totalReviews * 0.4),
      4: Math.floor(totalReviews * 0.3),
      3: Math.floor(totalReviews * 0.15),
      2: Math.floor(totalReviews * 0.1),
      1:
        totalReviews -
        (Math.floor(totalReviews * 0.4) +
          Math.floor(totalReviews * 0.3) +
          Math.floor(totalReviews * 0.15) +
          Math.floor(totalReviews * 0.1)),
    };
    return breakdown;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm"
        >
          <option value="">All Categories</option>
          <option value="day">Day Cream</option>
          <option value="night">Night Cream</option>
          <option value="moisturizer">Moisturizer</option>
        </select>

        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm"
        >
          <option value="">All Prices</option>
          <option value="0-1000">₹0 - ₹1000</option>
          <option value="1001-3000">₹1001 - ₹3000</option>
          <option value="3001-5000">₹3001 - ₹5000</option>
        </select>

        {(selectedCategory || selectedPriceRange) && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-100"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Filter Tags & Count */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full">
              Category: {selectedCategory}
            </span>
          )}
          {selectedPriceRange && (
            <span className="bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full">
              Price: ₹{selectedPriceRange.replace("-", " - ₹")}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-700">
          Showing <b>{filteredProducts.length}</b> of{" "}
          <b>{allProducts.length}</b> products
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const breakdown = getReviewBreakdown(product.reviews);
          return (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg relative"
            >
              <button
                onClick={() => toggleLike(product)}
                className="absolute top-3 right-3 text-red-500"
              >
                {isLiked(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              <Link to={`/product/${product.id}`} state={{ product }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2 rounded cursor-pointer"
                />
              </Link>

              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-700 font-semibold">₹{product.price}</p>

              <div
                className="flex items-center gap-1 text-yellow-500 mt-1 relative group"
                onMouseEnter={() => setHoveredReviewId(product.id)}
                onMouseLeave={() => setHoveredReviewId(null)}
              >
                {Array.from({ length: Math.round(product.rating) }).map(
                  (_, i) => (
                    <FaStar key={i} />
                  )
                )}
                <span className="text-sm text-gray-500 ml-1">
                  ({product.reviews} reviews)
                </span>

                {hoveredReviewId === product.id && (
                  <div className="absolute top-full left-0 z-10 mt-2 bg-white shadow-lg p-2 rounded border w-48 text-xs">
                    {Object.entries(breakdown)
                      .sort((a, b) => b[0] - a[0])
                      .map(([star, count]) => (
                        <div key={star} className="flex justify-between">
                          <span>{star} star</span> <span>{count}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => dispatch(addToCart(product))}
                className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilteredProductList;
