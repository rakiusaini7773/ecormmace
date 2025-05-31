import { useState, useEffect } from "react";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/slice/slices";
import { addToLike, removeFromLike } from "../app/slice/slices"; // adjust to your file


const FilteredProductList = () => {
    
  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.like.likedItems);

 const allProducts = [
        {
            id: 1,
            name: "Gold Radiance Day Cream",
            category: "day",
            price: 1500,
            rating: 4.5,
            reviews: 120,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Diamond Glow Night Cream",
            category: "night",
            price: 4500,
            rating: 4.8,
            reviews: 200,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Silver Moisturizing Cream",
            category: "moisturizer",
            price: 900,
            rating: 4.2,
            reviews: 90,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "Platinum Firming Night Cream",
            category: "night",
            price: 3500,
            rating: 4.7,
            reviews: 150,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            name: "Pearl Brightening Day Cream",
            category: "day",
            price: 2900,
            rating: 4.3,
            reviews: 110,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 6,
            name: "Aloe Vera Moisture Cream",
            category: "moisturizer",
            price: 1200,
            rating: 4.1,
            reviews: 85,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 7,
            name: "Rose Glow Day Cream",
            category: "day",
            price: 1700,
            rating: 4.4,
            reviews: 102,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 8,
            name: "Hydra Boost Night Cream",
            category: "night",
            price: 3300,
            rating: 4.6,
            reviews: 135,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 9,
            name: "Vitamin C Moisturizer",
            category: "moisturizer",
            price: 1500,
            rating: 4.0,
            reviews: 76,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 10,
            name: "GlowBerry Day Cream",
            category: "day",
            price: 1800,
            rating: 4.3,
            reviews: 99,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 11,
            name: "Night Repair Elixir",
            category: "night",
            price: 3700,
            rating: 4.9,
            reviews: 210,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 12,
            name: "HydraMist Moisturizer",
            category: "moisturizer",
            price: 1400,
            rating: 4.2,
            reviews: 88,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 13,
            name: "Cucumber Cooling Day Cream",
            category: "day",
            price: 1300,
            rating: 4.0,
            reviews: 65,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 14,
            name: "Lavender Calm Night Cream",
            category: "night",
            price: 3200,
            rating: 4.5,
            reviews: 143,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 15,
            name: "Shea Butter Ultra Moisturizer",
            category: "moisturizer",
            price: 1100,
            rating: 4.1,
            reviews: 92,
            image: "https://via.placeholder.com/150",
        },
    ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [hoveredReviewId, setHoveredReviewId] = useState(null);

  useEffect(() => {
    let result = [...allProducts];
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      result = result.filter((product) => product.price >= min && product.price <= max);
    }
    setFilteredProducts(result);
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
      1: totalReviews -
        (Math.floor(totalReviews * 0.4) + Math.floor(totalReviews * 0.3) + Math.floor(totalReviews * 0.15) + Math.floor(totalReviews * 0.1)),
    };
    return breakdown;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filter Controls */}
        
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none"
                >
                    <option value="">All Categories</option>
                    <option value="day">Day Cream</option>
                    <option value="night">Night Cream</option>
                    <option value="moisturizer">Moisturizer</option>
                </select>

                <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none"
                >
                    <option value="">All Prices</option>
                    <option value="0-1000">₹0 - ₹1000</option>
                    <option value="1001-3000">₹1001 - ₹3000</option>
                    <option value="3001-5000">₹3001 - ₹5000</option>
                </select>

                {(selectedCategory || selectedPriceRange) && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>

            {/* Active Filters */}
            <div className="flex justify-between items-end mb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCategory && (
                        <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                            Category: {selectedCategory}
                        </span>
                    )}
                    {selectedPriceRange && (
                        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                            Price: ₹{selectedPriceRange.replace("-", " - ₹")}
                        </span>
                    )}
                </div>

                {/* Product Count */}
                <div className="text-gray-700 text-sm ">
                    Showing <b>{filteredProducts.length}</b> of <b>{allProducts.length}</b> Products
                </div>
            </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const breakdown = getReviewBreakdown(product.reviews);
          return (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition relative">
              <button
                onClick={() => toggleLike(product)}
                className="absolute top-3 right-3 text-red-500"
              >
                {isLiked(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600 font-semibold mb-1">₹{product.price}</p>

              <div
                className="relative"
                onMouseEnter={() => setHoveredReviewId(product.id)}
                onMouseLeave={() => setHoveredReviewId(null)}
              >
                <div className="flex items-center gap-2 text-yellow-500 text-sm mb-2 cursor-pointer">
                  <FaStar />
                  <span>{product.rating} ({product.reviews} reviews)</span>
                </div>

                {hoveredReviewId === product.id && (
                  <div className="absolute top-full mt-1 left-0 z-10 w-48 bg-white border rounded shadow-lg text-sm p-3 space-y-1">
                    {Object.entries(breakdown)
                      .sort((a, b) => b[0] - a[0])
                      .map(([stars, count]) => (
                        <div key={stars} className="flex justify-between">
                          <span>{stars} ★</span>
                          <span>{count} reviews</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => dispatch(addToCart(product))}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
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
