import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { LuArrowDownUp } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import { Drawer } from "@mui/material";
import { FaTag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import BaseApiManager from "../networking/baseAPIManager";
import { API_ENDPOINTS } from "../networking/apiConfig";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "./common/CustomButton";

const initialStaticFilters = {
  Rating: ["5★", "4★ & above", "3★ & above"],
  Price: ["Below ₹500", "₹500–₹1000", "Above ₹1000"],
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
  const [filters, setFilters] = useState(initialStaticFilters);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [openSections, setOpenSections] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Featured");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCategoryFromSkinHelp = location.state?.selectedCategory;

  const getUserId = () => sessionStorage.getItem("userId");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          BaseApiManager.get(API_ENDPOINTS.GET_ALL_PRODUCTS),
          BaseApiManager.get(API_ENDPOINTS.GET_ALL_CATEGORIES),
        ]);

        const allProducts = productsRes;
        const couponMap = {};
        allProducts.forEach((product) => {
          product.usageRestrictions?.products?.forEach((id) => {
            if (!couponMap[id]) couponMap[id] = [];
            if (!couponMap[id].includes(product.offers?.couponType)) {
              couponMap[id].push(product.offers?.couponType);
            }
          });
        });

        const enrichedProducts = allProducts.map((p) => ({
          ...p,
          applicableCoupons: couponMap[p._id] || [],
        }));

        setProducts(enrichedProducts);

        const skinTypes = categoriesRes.map((cat) => cat.name);
        setFilters((prev) => ({ ...prev, "Skin Type": skinTypes }));

        if (
          selectedCategoryFromSkinHelp &&
          skinTypes.includes(selectedCategoryFromSkinHelp)
        ) {
          setSelectedFilters({ "Skin Type": [selectedCategoryFromSkinHelp] });
          setOpenSections({ "Skin Type": true });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [selectedCategoryFromSkinHelp]);

  const toggleSection = (section) => {
    setOpenSections((prev) => {
      const isOpen = !!prev[section];
      return isOpen ? {} : { [section]: true };
    });
  };

  const handleFilterChange = (section, value) => {
    setSelectedFilters((prev) => {
      const current = prev[section] || [];
      return {
        ...prev,
        [section]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const getSortedProducts = () => {
    let filtered = [...products];

    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length === 0) return;

      switch (key) {
        case "Skin Type":
          filtered = filtered.filter(
            (p) => p.category?.name && values.includes(p.category.name)
          );
          break;
        case "Rating":
          filtered = filtered.filter((p) => {
            const rating = p.rating || 0;
            return values.some((val) =>
              val === "5★"
                ? rating === 5
                : val === "4★ & above"
                ? rating >= 4
                : val === "3★ & above"
                ? rating >= 3
                : true
            );
          });
          break;
        case "Price":
          filtered = filtered.filter((p) => {
            const price = p.discountPrice || p.price;
            return values.some((val) =>
              val === "Below ₹500"
                ? price < 500
                : val === "₹500–₹1000"
                ? price >= 500 && price <= 1000
                : val === "Above ₹1000"
                ? price > 1000
                : true
            );
          });
          break;
        default:
          break;
      }
    });

    switch (sortOption) {
      case "Price, low to high":
        return filtered.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
      case "Price, high to low":
        return filtered.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
      case "Best selling":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "Newest":
        return filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      default:
        return filtered;
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
          {openSections[section] ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </button>
        {openSections[section] && (
          <ul className="mt-2 pl-2 space-y-2">
            {filters[section].map((item) => (
              <li
                key={prefix + item}
                className="flex items-center gap-2 text-sm font-normal"
              >
                <input
                  type="checkbox"
                  id={`${prefix}${item}`}
                  className="accent-pink-500"
                  checked={selectedFilters[section]?.includes(item) || false}
                  onChange={() => handleFilterChange(section, item)}
                />
                <label htmlFor={`${prefix}${item}`}>{item}</label>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));

    // ✅ Scroll to top smoothly on component mount
      useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-12 py-8">
      <aside className="hidden lg:block w-[220px]">
        <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <ul className="space-y-4 text-gray-800 font-medium">
            {renderFilterSections()}
          </ul>
        </div>
      </aside>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ className: "rounded-t-2xl bg-white" }}
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

      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition lg:hidden"
            >
              <CiFilter size={18} className="text-gray-700" />
            </button>
            <div className="relative text-sm font-medium">
              <div
                onClick={() => setSortDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-2 py-2 rounded hover:shadow-sm transition duration-200 cursor-pointer"
              >
                <LuArrowDownUp size={18} className="text-gray-700" />
                <span className="text-gray-700 hidden sm:inline">
                  {sortOption}
                </span>
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
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        sortOption === option ? "text-pink-600 font-semibold" : ""
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

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {getSortedProducts().map((item) => (
            <div
              key={item._id}
              className="bg-white hover:shadow-xl overflow-hidden border rounded-2xl"
            >
              <div
                className="relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() =>
                  navigate(`/product/${item._id}`, { state: { product: item } })
                }
              >
                <img
                  src={item.imageUrls?.[0]}
                  alt={item.heading}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <span className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded flex items-center gap-1 font-semibold shadow">
                  ⭐ {item.rating}
                </span>
              </div>
              <div className="p-4 text-sm text-gray-600">
                <h3 className="font-semibold text-gray-900 text-base mb-1">
                  {item.heading}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {item.subDescription?.slice(0, 50)}...
                </p>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-black font-semibold">₹{item.price}</p>
                    {(item.applicableCoupons?.length || 0) > 0 ? (
                      item.applicableCoupons.map((coupon, idx) => (
                        <p key={idx} className="flex items-center gap-1 text-xs">
                          <FaTag size={12} /> {coupon}
                        </p>
                      ))
                    ) : (
                      <p className="flex items-center gap-1 text-xs">
                        <FaTag size={12} /> {item.offers?.couponType || "No Offers"}
                      </p>
                    )}
                  </div>
                  <CustomButton
                    onClick={(e) => {
                      e.stopPropagation();
                      const userId = getUserId();
                      if (!userId) {
                        toast.warning("Please login to add items to your cart.");
                        return;
                      }
                      dispatch(addToCart(item));
                    }}
                  >
                    Add
                  </CustomButton>
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