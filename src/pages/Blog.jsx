import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BaseApiManager from '../networking/baseAPIManager';
import { API_ENDPOINTS } from '../networking/apiConfig';
import Navbar from '../components/common/Navbar';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([{ name: 'All' }]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Fetch categories and blogs
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
        const allCategories = [{ name: 'All' }, ...response]; // only use 'name'
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_BLOGS);
        const activeBlogs = response.filter(blog => blog.status === 'active');
        setBlogs(activeBlogs);
        setFilteredBlogs(activeBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blogs');
      }
    };

    fetchCategories();
    fetchBlogs();
  }, []);

  // Filter blogs when category or search changes
  useEffect(() => {
    let filtered = [...blogs];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }, [search, selectedCategory, blogs]);

  return (
    <>
    <Navbar/>
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm mb-4">
        <span>🏠</span>
        <span>/</span>
        <span className="text-gray-500">Blogs</span>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 mb-6 border-b pb-2">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-3 py-1 rounded-full text-sm capitalize transition ${
              selectedCategory === cat.name
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map(blog => (
            <div
              key={blog._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
                <p className="text-sm text-gray-600 mb-1">By {blog.author}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {blog.description?.slice(0, 100)}...
                </p>
                <p className="text-xs text-gray-400 capitalize mb-2">{blog.category}</p>
                <a
                  href={blog.readMoreLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-medium inline-block"
                >
                  Read More +
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
    </>
    
  );
};

export default Blog;
