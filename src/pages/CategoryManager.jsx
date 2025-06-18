import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import BaseApiManager from "../networking/baseAPIManager";
import { API_ENDPOINTS, API_BASE_URL } from "../networking/apiConfig";

export default function CategoryManager() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);

  // 🟢 Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      console.log('data',data)
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  // 🟢 Add new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name || !file) {
      toast.error("Please provide name and image");                                                   
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);

    try {
      await BaseApiManager.post(API_ENDPOINTS.ADD_CATEGORY, formData);
      toast.success("Category added");
      setName("");
      setFile(null);
      fileInputRef.current.value = null;
      fetchCategories();
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  // ✅ Toggle category active status using the correct toggle API
  const handleToggle = async (id) => {
    try {
      await BaseApiManager.put(`/categories/${id}/toggle`);
      fetchCategories();
    } catch (error) {
      toast.error("Failed to update category status");
    }
  };

  // 🟢 Delete category
  const handleDelete = async (id) => {
    try {
      await BaseApiManager.delete(`/categories/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      {/* Add Category Form (Optional - add here if needed) */}

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="relative flex flex-col items-center bg-white p-4 rounded-3xl shadow-md text-center"
          >
            {/* Toggle at Top Right */}
            <div className="absolute top-3 right-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cat.active}
                  onChange={() => handleToggle(cat._id)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-600 peer-focus:ring-2 peer-focus:ring-green-500 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-4"></div>
              </label>
            </div>

            {/* Image */}
            {console.log(' cat.iconUrl',cat.iconUrl)}
            <img
              src={
                cat.imageUrl 
              }
              alt={cat.name}
              className="h-28 w-full object-contain mt-2 mb-4"
            />

            {/* Name */}
            <p className="text-base font-semibold text-gray-900 mb-7">
              {cat.name}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(cat._id)}
              className="px-5 py-1.5 bg-rose-400 text-white rounded-md text-sm font-medium translate-y-7"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
