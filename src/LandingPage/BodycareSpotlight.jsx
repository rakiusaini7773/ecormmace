// import React from "react";
// import { Star } from "lucide-react";
// import { FaTag } from "react-icons/fa";
// // import { Button } from "@/components/ui/button";

// const products = [
//     {
//         title: "Exfoliating Body Wash",
//         description: "Gently exfoliates tan away",
//         price: "₹ 399",
//         rating: "4.8",
//         image: "https://foxtale.in/cdn/shop/files/1_16_22be3ab1-07e4-49ad-bed6-ea527b501b99.jpg?v=1743841022&width=600",
//     },
//     {
//         title: "Brightening Body Wash",
//         description: "Exfoliates tan & brightens skin",
//         price: "₹ 399",
//         rating: "4.8",
//         image: "https://foxtale.in/cdn/shop/files/1_4_f8dd6699-ef44-44de-a319-89b0244b82e7.jpg?v=1743840898&width=400",
//     },
//     {
//         title: "SPF 30 Detan Body Lotion",
//         description: "With Vitamin C and Niacinamide",
//         price: "₹ 499",
//         rating: "4.7",
//         image: "https://foxtale.in/cdn/shop/files/BRIGHTENING-BODY-LOTION.jpg?v=1743843873&width=400",
//     },
// ];

// const BodycareSpotlight = () => {
//     return (
//         <section className="px-4 py-8">
//             <div className="max-w-7xl mx-auto ">
//                 <div className="flex justify-between mb-12">
//                     <h2 className="text-4xl font-bold text-gray-900">Bodycare Spotlight</h2>
//                     <a href="" className="text-[#FF8359] font-semibold text-3xl">
//                         See All
//                     </a>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
//                     {products.map((product, index) => (
//                         <div
//                             key={index}
//                             className="overflow-hidden bg-white flex flex-col border rounded-3xl "
//                         >
//                             <div className="relative h-full bg-pink-50 flex justify-center items-center ">
//                                 <img
//                                     src={product.image}
//                                     alt={product.title}
//                                     className="object-contain h-full"
//                                 />
//                                 <div className="absolute bottom-2 left-4 bg-white px-2 py-1 rounded flex items-center text-sm shadow">
//                                     <Star className="w-4 h-4 text-yellow-400 mr-1" />
//                                     {product.rating}
//                                 </div>
//                             </div>
//                             <div className="p-4 flex flex-col flex-grow">
//                                 <h3 className="font-semibold text-lg text-gray-800">
//                                     {product.title}
//                                 </h3>
//                                 <p className="text-sm text-gray-600 mt-1 mb-3 border-b border-black pb-8">
//                                     {product.description}
//                                 </p>
//                                 <div className="mt-4 flex justify-between items-center gap-4">
//                                     <div>
//                                         {/* <p className="font-bold text-black text-lg">{product.price}</p> */}
//                                         <p className="text-sm text-gray-600 flex items-center gap-1">
//                                             <FaTag /> {product.price}
//                                         </p>
//                                     </div>

//                                     <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition w-auto">
//                                         Add
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div>

//                 </div>
//             </div>
//         </section>
//     );
// };

// export default BodycareSpotlight;


import React from "react";
import { FaTag } from "react-icons/fa";

const products = [
    {
        id: 1,
        label: "TOP RATED",
        image:
            "https://foxtale.in/cdn/shop/files/1_16_22be3ab1-07e4-49ad-bed6-ea527b501b99.jpg?v=1743841022&width=600",
        rating: 4.8,
        name: "Exfoliating Body Wash",
        description: "Gently exfoliates tan away",
        price: "₹ 399",
        coupon: "BODY10",
    },
    {
        id: 2,
        label: "TOP SELLER",
        image:
            "https://foxtale.in/cdn/shop/files/1_4_f8dd6699-ef44-44de-a319-89b0244b82e7.jpg?v=1743840898&width=400",
        rating: 4.8,
        name: "Brightening Body Wash",
        description: "Exfoliates tan & brightens skin",
        price: "₹ 399",
        coupon: "BODY10",
    },
    {
        id: 3,
        label: "NEW",
        image:
            "https://foxtale.in/cdn/shop/files/BRIGHTENING-BODY-LOTION.jpg?v=1743843873&width=400",
        rating: 4.7,
        name: "SPF 30 Detan Body Lotion",
        description: "With Vitamin C and Niacinamide",
        price: "₹ 499",
        coupon: "BODY10",
    },
];

const BodycareSpotlight = () => {
    return (
        <section className="py-12 m-6">
            {/* Heading */}
            <div className="flex justify-between items-start  mb-5 px-4 lg:px-0 w-full max-w-md sm:max-w-7xl mx-auto">
                <h2 className="text-xl sm:text-4xl font-bold text-gray-900">
                    Bodycare Spotlight
                </h2>

                {/* Always visible on all screens, stacked on mobile */}
                <a
                    href="#"
                    className="text-[#FF8359] font-semibold text-xl sm:text-2xl"
                >
                    See All
                </a>
            </div>





            {/* Grid layout for large screens */}
            <div className="hidden lg:grid gap-8 grid-cols-3 px-4 lg:px-0 max-w-7xl mx-auto">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Horizontal scroll for mobile/tablet */}
            <div className="lg:hidden overflow-x-auto hidden-scrollbar px-4">
                <div className="flex gap-6 w-max">
                    {products.map((product) => (
                        <div key={product.id} className="min-w-[300px]">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProductCard = ({ product }) => (
    <div className="rounded-2xl overflow-hidden flex flex-col transition bg-white shadow-sm">
        <div className="relative flex justify-center items-center h-72">
            {product.label && (
                <div className="absolute top-4 left-4 bg-white text-[11px] font-bold text-[#d83c6e] px-3 py-1">
                    {product.label}
                </div>
            )}
            <img
                src={product.image}
                alt={product.name}
                className="h-[332px] w-[332px] object-cover rounded-md"
            />
        </div>

        <div className="p-6 flex flex-col">
            <div className="text-sm text-gray-700 mb-1">
                <span className="text-yellow-500">⭐</span> {product.rating}
            </div>

            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600 border-b border-black pb-4">
                {product.description}
            </p>

            <div className="mt-4 flex justify-between items-center gap-4">
                <div>
                    <p className="font-bold text-black text-lg">{product.price}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                        <FaTag /> {product.coupon}
                    </p>
                </div>

                <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition w-auto">
                    Add
                </button>
            </div>
        </div>
    </div>
);

export default BodycareSpotlight;
