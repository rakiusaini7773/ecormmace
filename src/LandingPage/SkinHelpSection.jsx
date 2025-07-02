import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseApiManager from "../networking/baseAPIManager";
import { API_ENDPOINTS } from "../networking/apiConfig";

// Optional: add this style globally or in Tailwind config for scrollbar hiding
// import "../styles/scrollbarHide.css"; // if you create the scrollbar-hide class

const SkinHelpSection = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    
    <section className="py-5 m-6 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-5xl text-gray-900 mb-14 ">
        What does your skin need help with?
      </h2>

      {/* 🖥 Desktop View: Grid with 6 items */}
      <div className="hidden lg:grid gap-6 grid-cols-6">
        {categories.slice(0, 6).map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={
                category.imageUrl ||
                "https://via.placeholder.com/200x150?text=No+Image"
              }
              alt={category.name}
              className="w-[180px] h-[130px] object-contain mb-2"
            />
            <p className="font-semibold text-gray-800 text-sm md:text-base text-center">
              {category.name}
            </p>
          </div>
        ))}
      </div>

      {/* 📱 Mobile/Tablet View: Horizontal scroll with 6 items */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-4 min-w-[960px]">
          {categories.slice(0, 6).map((category, index) => (
            <div
              key={index}
              className="min-w-[150px] flex flex-col items-center"
            >
              <img
                src={
                  category.imageUrl ||
                  "https://via.placeholder.com/140x120?text=No+Image"
                }
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
