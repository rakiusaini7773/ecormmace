import React from "react";
import { Star } from "lucide-react";
import { FaTag } from "react-icons/fa";
// import { Button } from "@/components/ui/button";

const products = [
    {
        title: "Exfoliating Body Wash",
        description: "Gently exfoliates tan away",
        price: "₹ 399",
        rating: "4.8",
        image: "https://foxtale.in/cdn/shop/files/1_16_22be3ab1-07e4-49ad-bed6-ea527b501b99.jpg?v=1743841022&width=600",
    },
    {
        title: "Brightening Body Wash",
        description: "Exfoliates tan & brightens skin",
        price: "₹ 399",
        rating: "4.8",
        image: "https://foxtale.in/cdn/shop/files/1_4_f8dd6699-ef44-44de-a319-89b0244b82e7.jpg?v=1743840898&width=400",
    },
    {
        title: "SPF 30 Detan Body Lotion",
        description: "With Vitamin C and Niacinamide",
        price: "₹ 499",
        rating: "4.7",
        image: "https://foxtale.in/cdn/shop/files/BRIGHTENING-BODY-LOTION.jpg?v=1743843873&width=400",
    },
];

const BodycareSpotlight = () => {
    return (
        <section className="px-4 py-8">
            <div className="max-w-7xl mx-auto ">
                <div className="flex justify-between mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">Bodycare Spotlight</h2>
                    <a href="" className="text-[#FF8359] font-semibold text-3xl">
                        See All
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="overflow-hidden bg-white flex flex-col border rounded-3xl "
                        >
                            <div className="relative h-full bg-pink-50 flex justify-center items-center ">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="object-contain h-full"
                                />
                                <div className="absolute bottom-2 left-4 bg-white px-2 py-1 rounded flex items-center text-sm shadow">
                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                    {product.rating}
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1 mb-3 border-b border-black pb-8">
                                    {product.description}
                                </p>
                                <div className="mt-4 flex justify-between items-center gap-4">
                                    <div>
                                        {/* <p className="font-bold text-black text-lg">{product.price}</p> */}
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <FaTag /> {product.price}
                                        </p>
                                    </div>

                                    <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition w-auto">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    
                </div>
            </div>
        </section>
    );
};

export default BodycareSpotlight;
