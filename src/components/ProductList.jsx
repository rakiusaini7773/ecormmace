import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LuArrowDownUp } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";

import { Drawer } from "@mui/material";

const filters = {
  "Product Type": ["Moisturiser"],
  "Skin Type": ["Acne Prone", "All Skin Types", "Dry Skin", "Oily Skin"],
  "Skin Concerns": [
    "Clogged Pores",
    "Dark Spots",
    "Dullness",
    "Fine Lines",
    "Hyperpigmentation",
    "Large Pores",
    "Redness",
    "Uneven Skin Tone",
  ],
  Ingredients: ["Vitamin C", "Niacinamide", "Salicylic Acid", "Peptides"],
};

const sortOptions = [
  "Featured",
  "Best selling",
  "Price, low to high",
  "Price, high to low",
  "Newest",
];

const ProductListWithFilters = () => {
  const [products, setProducts] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Featured");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => {
      const isCurrentlyOpen = !!prev[section];
      return isCurrentlyOpen ? {} : { [section]: true };
    });
  };

  const getSortedProducts = () => {
    const sorted = [...products];
    switch (sortOption) {
      case "Price, low to high":
        return sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
      case "Price, high to low":
        return sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
      case "Best selling":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "Newest":
        return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      default:
        return sorted;
    }
  };

  const renderFilterSections = (prefix = "") =>
    Object.keys(filters).map((section) => (
      <li key={prefix + section}>
        <button
          className="w-full flex justify-between items-center font-semibold"
          onClick={() => toggleSection(section)}
        >
          <span>{section}</span>
          <span>
            {openSections[section] ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </span>
        </button>
        {openSections[section] && (
          <ul className="mt-2 pl-2 space-y-2">
            {filters[section].map((item) => (
              <li key={prefix + item} className="flex items-center gap-2 text-sm font-normal">
                <input type="checkbox" id={`${prefix}${item}`} className="accent-pink-500" />
                <label htmlFor={`${prefix}${item}`}>{item}</label>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-12 py-8 ">
      {/* Mobile Filter Button */}


      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[220px]">
        <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <ul className="space-y-4 text-gray-800 font-medium">
            {renderFilterSections()}
          </ul>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          className: "rounded-t-2xl bg-white", // Tailwind classes for the Drawer panel
        }}
      >
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <ul className="space-y-4 text-gray-800 font-medium">
            {renderFilterSections("drawer-")}
          </ul>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={() => setDrawerOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Drawer>

      {/* Products Section */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Moisturizers</h2>

          {/* Filter + Sort icons */}
          <div className="flex items-center gap-1">
            {/* Mobile Filter Icon */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition lg:hidden"
            >
              <CiFilter  size={18} className="text-gray-700" />
            </button>

            {/* Sort Dropdown */}
            <div className="relative text-sm font-medium">
              <div
                onClick={() => setSortDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-2 py-2 rounded hover:shadow-sm transition duration-200 cursor-pointer"
              >
                <LuArrowDownUp size={18} className="text-gray-700" />
                <span className="text-gray-700 hidden sm:inline">{sortOption}</span>
              </div>

              {sortDropdownOpen && (
                <ul className="absolute right-0 z-10 mt-1 bg-white border border-gray-200 rounded shadow-md text-sm w-48">
                  {sortOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setSortOption(option);
                        setSortDropdownOpen(false);
                      }}
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${sortOption === option ? "text-pink-600 font-semibold" : ""
                        }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {getSortedProducts().map((item) => (
            <div
              key={item.id}
              className="bg-white  hover:shadow-xl overflow-hidden border"
            >
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-96 h-auto object-cover" />
                {item.isNewLaunch && (
                  <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW LAUNCH
                  </span>
                )}
                <span className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded flex items-center gap-1 font-semibold shadow">
                  ⭐ {item.rating}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-md">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.description?.slice(0, 50)}...</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-md">₹ {item.discountPrice || item.price}</p>
                    <p className="text-xs text-red-500">{item.availableOffers?.[0]}</p>
                  </div>
                  <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 text-sm">
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListWithFilters;
