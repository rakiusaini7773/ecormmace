import React from 'react';
import { FaPen } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

// ✅ Helper to strip HTML tags
const stripHtmlTags = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const BlogModal = ({ isOpen, onClose, blog }) => {
  if (!isOpen || !blog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-2">
      <div className="bg-white rounded-xl w-full max-w-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-600 text-2xl"
        >
          <IoMdClose />
        </button>

        <h2 className="text-lg font-semibold text-center mb-4">View Blog</h2>

        {/* Image with Edit Icon */}
        <div className="relative w-fit mx-auto mb-6">
          <img
            src={ blog.imageUrl}
            alt={blog.title}
            className="rounded-md w-96 h-40 object-cover border-2 border-pink-300"
          />
          <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md">
            <FaPen size={12} />
          </button>
        </div>

        {/* Info Fields */}
        <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-800">
          <span className="font-medium">Title</span>
          <span>{blog.title}</span>

          <span className="font-medium">Author Name</span>
          <span className="text-gray-600">{blog.author}</span>

          <span className="font-medium">Category</span>
          <span>{blog.category}</span>

          

          <span className="font-medium">Short Description</span>
          <span className="text-gray-600">
            {stripHtmlTags(blog.description).substring(0, 100)}...
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
