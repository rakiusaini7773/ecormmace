import React from 'react';

const posts = [
  {
    date: 'February 12, 2025',
    title: 'How To Remove Tanning From The Body? 3 Pro Ways That Always Work',
    author: 'Srishty Singh',
    excerpt:
      'Summer is here – which means strolls on the beach, exploring exotic locales, and more fun...',
    image:
      'https://cdn.shopify.com/s/files/1/0609/6096/4855/articles/TAN_REMOVAL_3d7957f6-e0b2-4cc0-8a37-74a51119d7d8.jpg?v=1739368398',
  },
  {
    date: 'January 27, 2025',
    title: 'How Peptides And Niacinamide Boost Your Skin’s Moisture Levels',
    author: 'Srishty Singh',
    excerpt:
      'Your skin’s moisture levels determine all its core functionalities. Case in point, adequate...',
    image:
      'https://cdn.shopify.com/s/files/1/0609/6096/4855/articles/How_Peptides_and_Niacinamide_Boost.jpg?v=1739369058',
  },
  {
    date: 'January 9, 2025',
    title: 'What Is Salicylic Acid: Benefits, Uses, And Side Effects?',
    author: 'Srishty Singh',
    excerpt:
      'If you are scouring the market for a sureshot acne remedy or something to treat general ski...',
    image:
      'https://cdn.shopify.com/s/files/1/0609/6096/4855/articles/What_is_salicylic_acid.jpg?v=1739368835',
  },
];

const LatestPosts = () => {
  return (
    <section className="py-2 px-4 md:px-8 lg:px-3 max-w-7xl mx-auto">
      {/* Heading + Button */}

      <div className="flex justify-between items-center mb-5 px-4 lg:px-0 w-full " style={{margin:"20px auto"}}>
        <h2 className="text-xl md:text-xl lg:text-xl font-bold text-gray-900 text-start w-full lg:w-auto" >
          Latest Posts
        </h2>
        <button className="bg-pink-100 text-pink-600 px-6 py-3 rounded-md text-base font-semibold hover:bg-pink-200 w-36 lg:w-auto">
          View All
        </button>
      </div>



      {/* Desktop grid layout */}
      <div className="hidden lg:grid grid-cols-3 gap-8 ">
        {posts.map((post, index) => (
          <article
            key={index}
            className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-52 object-cover rounded-t-2xl"
            />
            <div className="p-6 flex flex-col">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">By {post.author}</p>
              <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
              <button className="text-base text-gray-800 font-semibold hover:underline self-start">
                READ MORE +
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile + tablet horizontal scroll layout */}
      <div className="lg:hidden overflow-x-auto hidden-scrollbar">
        <div className="flex gap-6 w-min px-1">
          {posts.map((post, index) => (
            <div
              key={index}
              className="min-w-[300px] border rounded-2xl overflow-hidden shadow-sm bg-white"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4 flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{post.date}</p>
                <h3 className="font-semibold text-base text-gray-900 mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">By {post.author}</p>
                <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                <button className="text-sm text-gray-800 font-semibold hover:underline self-start">
                  READ MORE +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
