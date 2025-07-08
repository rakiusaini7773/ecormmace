import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseApiManager from "../networking/baseAPIManager";
import { API_ENDPOINTS } from "../networking/apiConfig";
import { useNavigate } from "react-router-dom";

const SkinHelpSection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const data = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      setCategories(data || []);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate("/product", {
      state: { selectedCategory: categoryName }, // ✅ Pass state
    });
  };

  return (
    <section className="py-5 m-6 max-w-7xl mx-auto hidden-scrollbar">
      <h2 className="text-xl md:text-5xl text-gray-900 mb-14">
        What does your skin need help with?
      </h2>

      <div className="hidden lg:grid gap-6 grid-cols-6 hidden-scrollbar">
        {categories.slice(0, 6).map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={category.imageUrl || "https://via.placeholder.com/200x150?text=No+Image"}
              alt={category.name}
              className="w-[180px] h-[130px] object-contain mb-2"
            />
            <p className="font-semibold text-gray-800 text-sm md:text-base text-center">
              {category.name}
            </p>
          </div>
        ))}
      </div>

      <div className="lg:hidden overflow-x-auto hidden-scrollbar">
        <div className="flex gap-4 px-4 min-w-[960px]">
          {categories.slice(0, 6).map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className="min-w-[150px] flex flex-col items-center cursor-pointer"
            >
              <img
                src={category.imageUrl || "https://via.placeholder.com/140x120?text=No+Image"}
                alt={category.name}
                className="w-[140px] h-[120px] object-contain mb-2"
              />
              <p className="font-semibold text-gray-800 text-sm text-center">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkinHelpSection;
