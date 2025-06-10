import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchCategories = async () => {
    // const res = await axios.get("/api/categories"); 
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name || !file) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("icon", file);

    await axios.post("/api/categories", formData); // Replace with your POST endpoint
    setName("");
    setFile(null);
    fetchCategories();
  };

  const handleToggle = async (id, currentStatus) => {
    await axios.patch(`/api/categories/${id}`, { active: !currentStatus }); // Example
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="p-8">
      {/* Add Category Form */}
      <form
        onSubmit={handleAddCategory}
        className="flex items-center space-x-4 mb-8"
      >
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          Upload Icon
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-md"
        >
          Add Category
        </button>
      </form>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center relative"
          >
            <img
              src={cat.iconUrl}
              alt={cat.name}
              className="h-20 w-20 object-contain mb-3"
            />
            <p className="font-semibold text-gray-800 mb-2">{cat.name}</p>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer mb-2">
              <input
                type="checkbox"
                checked={cat.active}
                onChange={() => handleToggle(cat._id, cat.active)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
            </label>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(cat._id)}
              className="px-4 py-1 bg-rose-400 text-white rounded-md text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
