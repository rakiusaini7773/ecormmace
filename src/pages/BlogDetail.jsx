import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaTumblr,
  FaTelegramPlane,
  FaEnvelope,
} from 'react-icons/fa';
import BaseApiManager from '../networking/baseAPIManager';
import { API_ENDPOINTS } from '../networking/apiConfig';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchRelatedBlogs = async () => {
      try {
        const response = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_BLOGS);
        const activeBlogs = response.filter(
          (b) => b.status === 'active' && b._id !== blog?._id
        );

        if (blog?.category) {
          const sameCategory = activeBlogs.filter(
            (b) => b.category === blog.category
          );
          setRelatedBlogs(sameCategory);
        }
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    };

    if (blog) {
      fetchRelatedBlogs();
    }
  }, [blog]);

  const currentUrl = window.location.href;

  const shareLinks = [
    {
      icon: <FaFacebookF className="text-blue-600 w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      icon: <FaTwitter className="text-blue-400 w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(blog?.title || '')}`,
    },
    {
      icon: <FaTumblr className="text-black w-5 h-5" />,
      url: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      icon: <FaTelegramPlane className="text-sky-500 w-5 h-5" />,
      url: `https://telegram.me/share/url?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(blog?.title || '')}`,
    },
    {
      icon: <FaEnvelope className="text-gray-700 w-5 h-5" />,
      url: `mailto:?subject=${encodeURIComponent(
        blog?.title || ''
      )}&body=${encodeURIComponent(currentUrl)}`,
    },
  ];

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
      <main className="max-w-7xl mx-auto px-4 py-8 text-gray-800 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Share Icons - Sticky */}
        <div className="hidden lg:flex sticky top-32 self-start flex-col items-center gap-4">
          <p className="font-semibold text-gray-700 mb-2">Share</p>
          {shareLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white shadow p-3 rounded-full hover:scale-110 transition"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Blog Content */}
        <div className="lg:col-span-2">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 mb-4 hover:underline"
          >
            ← Back to Blogs
          </button>

          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-1">By {blog.author}</p>
          <p className="text-xs text-gray-400 capitalize mb-6">{blog.category}</p>

          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>

        {/* Related Blogs */}
        <aside className="lg:col-span-1 border-l pl-4">
          <h2 className="text-xl font-semibold mb-4">More in "{blog.category}"</h2>
          {relatedBlogs.length > 0 ? (
            relatedBlogs.map((b) => (
              <div
                key={b._id}
                className="mb-4 cursor-pointer"
                onClick={() => navigate(`/blogs/${b._id}`, { state: b })}
              >
                <img
                  src={b.imageUrl}
                  alt={b.title}
                  className="h-24 w-full object-cover rounded mb-2"
                />
                <h3 className="text-md font-medium">{b.title}</h3>
                <p className="text-xs text-gray-500">By {b.author}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No related blogs found.</p>
          )}
        </aside>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetails;
