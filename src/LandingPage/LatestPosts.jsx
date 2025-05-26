import React from 'react';

const posts = [
    {
        date: 'February 12, 2025',
        title: 'How To Remove Tanning From The Body? 3 Pro Ways That Always Work',
        author: 'Srishty Singh',
        excerpt: 'Summer is here – which means strolls on the beach, exploring exotic locales, and more fun...',
        image: 'https://cdn.shopify.com/s/files/1/0609/6096/4855/articles/TAN_REMOVAL_3d7957f6-e0b2-4cc0-8a37-74a51119d7d8.jpg?v=1739368398', // update with correct path
    },
    {
        date: 'January 27, 2025',
        title: 'How Peptides And Niacinamide Boost Your Skin’s Moisture Levels',
        author: 'Srishty Singh',
        excerpt: 'Your skin’s moisture levels determine all its core functionalities. Case in point, adequate...',
        image: 'https://cdn.shopify.com/s/files/1/0609/6096/4855/articles/How_Peptides_and_Niacinamide_Boost.jpg?v=1739369058',
    },
    {
        date: 'January 9, 2025',
        title: 'What Is Salicylic Acid: Benefits, Uses, And Side Effects?',
        author: 'Srishty Singh',
        excerpt: 'If you are scouring the market for a sureshot acne remedy or something to treat general ski...',
        image: 'https://cdn.shopify.com/s/files/1/0609/6096/4855/articles/What_is_salicylic_acid.jpg?v=1739368835',
    },
];

const LatestPosts = () => {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-12">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
                        Latest Posts
                    </h2>
                    <button className="bg-pink-100 text-pink-600 px-6 py-3 ml-4 rounded-md text-base font-semibold hover:bg-pink-200">
                        View All
                    </button>

                </div>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 m-4"
                    >
                        <img src={post.image} alt={post.title} className="w-full h-52 object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-2">{post.date}</p>

                            <h3 className="font-semibold text-lg text-gray-900 mb-3 mt-2 px-2 py-1">
                                {post.title}
                            </h3>

                            <p className="text-sm text-gray-500 mb-3 px-1">By {post.author}</p>

                            <p className="text-sm text-gray-600 mb-3 px-1">{post.excerpt}</p>

                            <button className="text-base text-gray-800 font-semibold mt-3 hover:underline px-2">
                                READ MORE +
                            </button>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    );
};

export default LatestPosts;
