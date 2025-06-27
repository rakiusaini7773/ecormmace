import React from 'react';
import { useNavigate } from 'react-router-dom';

const LatestPosts = ({ blogs }) => {
  const navigate = useNavigate();

  const handleBlogClick = (blog) => {
    navigate('/blogs/details', { state: blog });
  };

  return (
    <section className="py-2 px-4 md:px-8 lg:px-3 max-w-7xl mx-auto">
      {/* Heading + Button */}
      <div
        className="flex justify-between items-center mb-5 px-4 lg:px-0 w-full"
        style={{ margin: '20px auto' }}
      >
        <h2 className="text-xl md:text-xl lg:text-xl font-bold text-gray-900 text-start w-full lg:w-auto">
          Latest Posts
        </h2>
        <button className="bg-pink-100 text-pink-600 px-6 py-3 rounded-md text-base font-semibold hover:bg-pink-200 w-36 lg:w-auto">
          View All
        </button>
      </div>

      {/* Desktop grid layout */}
      <div className="hidden lg:grid grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <article
            key={index}
            onClick={() => handleBlogClick(blog)}
            className="cursor-pointer border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-52 object-cover rounded-t-2xl"
            />
            <div className="p-6 flex flex-col">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">By {blog.author}</p>
              <p className="text-sm text-gray-600 mb-4">
                {blog.description?.replace(/<[^>]*>?/gm, '').slice(0, 100)}...
              </p>
              <span className="text-base text-gray-800 font-semibold hover:underline self-start">
                READ MORE +
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile + tablet horizontal scroll layout */}
      <div className="lg:hidden overflow-x-auto hidden-scrollbar">
        <div className="flex gap-6 w-min px-1">
          {blogs.map((blog, index) => (
            <div
              key={index}
              onClick={() => handleBlogClick(blog)}
              className="min-w-[300px] border rounded-2xl overflow-hidden shadow-sm bg-white cursor-pointer"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4 flex flex-col">
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h3 className="font-semibold text-base text-gray-900 mb-1">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">By {blog.author}</p>
                <p className="text-sm text-gray-600 mb-3">
                  {blog.description?.replace(/<[^>]*>?/gm, '').slice(0, 100)}...
                </p>
                <span className="text-sm text-gray-800 font-semibold hover:underline self-start">
                  READ MORE +
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
