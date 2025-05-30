import React from 'react';

const products = [
    {
        id: 1,
        title: "The Face Shop Vitamin Lip Sleeping Mask (14g)",
        price: 1101,
        originalPrice: 1295,
        discount: "15%",
        reviews: 57,
        image: "https://thefaceshop.in/cdn/shop/files/8801051254006_1_812bcf8a-d64a-4d78-997b-7e214bfe8f62.jpg?v=1748409485&width=535",
        hoverImage: "https://thefaceshop.in/cdn/shop/files/8801051254006_8ceb5ed2-fe9f-403c-bb7c-568f02528f81.jpg?v=1748409485&width=535",
    },
    {
        id: 2,
        title: "Rice Water Bright Cleansing Foam 150ml",
        price: 818,
        originalPrice: 899,
        discount: "10%",
        reviews: 548,
        image: "https://thefaceshop.in/cdn/shop/files/8806182550997_3_e3d91422-30de-4cf8-ac52-d19408426768.jpg?v=1748409352&width=535",
        hoverImage: "https://thefaceshop.in/cdn/shop/files/rwb-cleanser-150ml-front.jpg?v=1748409352&width=535",
    },
    {
        id: 3,
        title: "Rice & Ceramide Moisturizing Emulsion 150ml",
        price: 921,
        originalPrice: 990,
        discount: "7%",
        reviews: 413,
        image: "https://thefaceshop.in/cdn/shop/files/8806182593796_1_192bb274-2cd5-4b84-9c4a-b0b55c31093b.jpg?v=1748409366&width=535",
        hoverImage: "https://thefaceshop.in/cdn/shop/files/1_63db465e-af2e-4b8f-a128-acf48a2c0e34.jpg?v=1748409366&width=535",
    },
    {
        id: 4,
        title: "Rice & Ceramide Moisturizing Toner 150ml",
        price: 809,
        originalPrice: 899,
        discount: "11%",
        reviews: 206,
        image: "https://thefaceshop.in/cdn/shop/files/2_b896a951-8b37-4d20-826b-cbf1dcda5737.jpg?v=1748409746&width=535",
        hoverImage: "https://thefaceshop.in/cdn/shop/files/1_2e90d1d0-3eaa-47b8-9c6a-453d15aec33c.jpg?v=1748409746&width=535",
    },
];

const ProductListing = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
            {/* Sidebar Filter */}
            <div className="w-full md:w-1/4">
                <div className="mb-6">

                </div>

            </div>

            {/* Product Listing */}
            <div className="w-full md:w-3/4">


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all group">
                            <div className="relative">
                                {/* Default Image */}
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-52 object-cover transition-opacity duration-300 group-hover:opacity-0"
                                />
                                {/* Hover Image */}
                                <img
                                    src={product.hoverImage}
                                    alt={`${product.title} hover`}
                                    className="w-full h-52 object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                />

                                <span className="absolute top-2 left-2 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded">
                                    SAVE {product.discount}
                                </span>
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm font-medium mb-1">{product.title}</h3>
                                <div className="text-sm mb-1">
                                    <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                                    <span className="text-green-700 font-bold">₹{product.price}</span>
                                </div>
                                <div className="text-yellow-500 text-xs mb-2">
                                    ★★★★★ ({product.reviews} reviews)
                                </div>
                                <button className="w-full border border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-semibold py-1 rounded">
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;


// https://trymoody.com/collections/body-lotion?srsltid=AfmBOopAPKN6VAFIySxZtkWSb9-bLu51jjO1dFZR0oQYy6XBig_0KOU-

// https://www.bodycupid.com/products/body-cupid-aqua-wave-face-wash-100-ml