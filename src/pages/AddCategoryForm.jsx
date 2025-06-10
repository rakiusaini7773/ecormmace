import React, { useRef } from "react";
import { MdOutlineFileOpen } from "react-icons/md";
import CategoryManager from "./CategoryManager";

export default function AddCategoryForm() {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  return (
    <>
     <div className="w-full p-6 bg-white rounded-3xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">Add New Category</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        {/* Category Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            placeholder="Enter category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Upload Icon Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Icon
          </label>
          <div className="flex items-center space-x-2">
            {/* Hidden File Input */}
            <input
              type="text"
              ref={fileInputRef}
              placeholder="choose file"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log("Selected file:", file); // Optional: handle file
              }}
            />
            {/* Styled Button that triggers file input */}
            <button
              type="button"
              onClick={handleUploadClick}
              className="p-3 bg-[#454545] text-white rounded-md hover:bg-gray-700"
              title="Upload"
            >
              <MdOutlineFileOpen className="text-2xl"/>

            </button>
          </div>
        </div>

        {/* Add Category Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[#454545] text-[#FFFFFF] rounded-md hover:bg-gray-700"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>

    <CategoryManager />
    </>
   
  );
}
