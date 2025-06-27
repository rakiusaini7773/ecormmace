import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!blog) {
    return (
      <div className="p-8 text-center text-gray-600 min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4 text-lg">Blog not found.</p>
        <button
          onClick={() => navigate('/blogs')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go back to Blogs
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 mb-4 hover:underline"
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

        {/* Blog Content from Froala Editor */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </main>
      <Footer />
    </>
  );
};

export default BlogDetails;
     