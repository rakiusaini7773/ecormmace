import React, { useRef, useState } from "react";
import { MdOutlineFileOpen } from "react-icons/md";
import { toast } from "react-toastify";
import BaseApiManager from "../networking/baseAPIManager";
import { API_ENDPOINTS } from "../networking/apiConfig";
import CategoryManager from "./CategoryManager";

export default function AddCategoryForm() {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !file) {
      toast.error("Please enter name and upload icon.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);

    try {
      const response = await BaseApiManager.post(API_ENDPOINTS.ADD_CATEGORY, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`Category "${response.name}" added successfully!`);
      setName("");
      setFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      toast.error("Failed to add category.");
    }
  };

  return (
    <>
     <div className="w-full p-6 bg-white rounded-3xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">Add New Category</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end"
        onSubmit={handleSubmit}
      >
        {/* Category Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Upload Icon Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Icon
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              readOnly
              value={file?.name || ""}
              placeholder="No file chosen"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
            />
            <button
              type="button"
              onClick={handleUploadClick}
              className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
              title="Upload"
            >
              <MdOutlineFileOpen className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Add Category Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[#454545] text-white rounded-md hover:bg-gray-700"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
    <CategoryManager/>
    </>
   
  );
}
