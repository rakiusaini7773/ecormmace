import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  if (!blog) {
    return (
      <div className="p-8 text-center text-gray-600">
        Blog not found. <br />
        <button
          onClick={() => navigate('/blogs')}
          className="mt-4 text-blue-600 underline"
        >
          Go back to Blogs
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 mb-4"
        >
          ← Back to Blogs
        </button>

      

        {/* Title, Author, Category */}
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-1">By {blog.author}</p>
        <p className="text-xs text-gray-400 capitalize mb-6">{blog.category}</p>

          {/* Blog Image */}
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Froala content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
      <Footer/>
    </>
  );
};

export default BlogDetails;
