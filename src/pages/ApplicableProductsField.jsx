import React, { useEffect, useState, useRef } from "react";
import { ErrorMessage } from "formik";
import BaseApiManager from "../networking/baseAPIManager";
import { API_ENDPOINTS } from "../networking/apiConfig";
import { toast } from "react-toastify";

const ApplicableProductsField = ({ values, setFieldValue }) => {
  const [products, setProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    fetchProducts();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_PRODUCTS);
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const toggleProduct = (productId) => {
    const current = Array.isArray(values.usageRestrictions.products)
      ? values.usageRestrictions.products
      : [];
    const updated = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];
    setFieldValue("usageRestrictions.products", updated);
  };

  const getProductName = (id) => {
    const product = products.find((p) => p._id === id);
    return product ? product.heading : "";
  };

  const selectedProducts = Array.isArray(values.usageRestrictions.products)
    ? values.usageRestrictions.products
    : [];

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Products</label>

      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-full min-h-[42px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm cursor-pointer flex flex-wrap gap-2 items-center"
      >
        {selectedProducts.length > 0 ? (
          selectedProducts.map((id) => (
            <span
              key={id}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {getProductName(id)}
            </span>
          ))
        ) : (
          <span className="text-gray-400">Select products</span>
        )}
      </div>

      {dropdownOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
          style={{ maxHeight: "100px", overflowY: "auto" }}
        >
          {products.map((product) => (
            <label
              key={product._id}
              className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(product._id)}
                onChange={() => toggleProduct(product._id)}
                className="mr-2"
              />
              {product.heading}
            </label>
          ))}
        </div>
      )}

      <ErrorMessage
        name="usageRestrictions.products"
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default ApplicableProductsField;
