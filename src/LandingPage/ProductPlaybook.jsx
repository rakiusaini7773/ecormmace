import React from 'react';
import { FaStar, FaClock, FaWater, FaCircle, FaHeart, FaPlus, FaShieldAlt } from 'react-icons/fa';

const ProductPlaybook = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 py-12 bg-white text-gray-800">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 pl-64">
                Our Product Playbook
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

                {/* High-Performing */}
                <div className="bg-[#c4a6ff] rounded-2xl  text-center shadow-md p-[24px_28px_0px]">
                    <h3 className="text-4xl  font-[500] mb-3">High-Performing</h3>
                    <p className="text-2xl  font-bold mb-5">Visible results from the 1st use</p>
                    <img
                        src="https://foxtale.in/cdn/shop/files/1_793e50d8-a306-4ab3-8bbd-721810d04a4d.gif?v=1721909956&width=300"
                        alt="Face application"
                        className="mx-auto mb-5 w-52 h-40 object-cover rounded-full"
                    />
                    <div className="flex flex-col items-start gap-6 text-left text-sm md:text-base lg:text-lg">
                        {/* Star Icon Block */}
                        <div className="flex items-start gap-4">
                            <div>
                                <FaStar className="text-black text-[24px]" />
                            </div>
                            <div className='text-[17px] font-[500] '>
                                Skincare shows results when you're consistent. Visible improvement every day improves consistency.
                            </div>
                        </div>

                        {/* Clock Icon Block */}
                        <div className="flex items-start gap-4">
                            <div>
                                <FaClock className="text-black text-[24px]" />
                            </div>
                            <div  className='text-[17px] font-[500] '>
                                Our fast-acting formulas and unique ingredient story ensure visible improvement from the very first use.
                            </div>
                        </div>
                    </div>

                </div>

                {/* Innovative */}
                <div className="bg-[#dac7ff] rounded-2xl p-6 md:p-8 lg:p-10 text-center shadow-md">
                    <h3 className="text-4xl  font-[500] mb-3">Innovative</h3>
                    <p className="text-2xl  font-bold mb-5">Unique Dermal Delivery Systems</p>
                    <img
                        src="https://foxtale.in/cdn/shop/files/2.gif?v=1721909910&width=300"
                        alt="Skin layers"
                        className="mx-auto mb-5 w-52 h-40 object-cover rounded-full"
                    />
                    <div className="flex flex-col items-start gap-6 text-left text-sm md:text-base lg:text-lg">
                        {/* FaWater Block */}
                        <div className="flex items-start gap-4">
                            <div>
                                <FaWater className="text-black text-[24px]" />
                            </div>
                            <div className='text-[17px] font-[500] '>
                                Different concerns show up in different layers of skin.
                            </div>
                        </div>

                        {/* FaCircle Block */}
                        <div className="flex items-start gap-4">
                            <div>
                                <FaCircle className="text-black text-[24px]" />
                            </div>
                            <div  className='text-[17px] font-[500] '>
                                Our unique Active Delivery Systems ensure the actives reach the necessary layers and tackle skin concerns like increased melanin production, dehydration, collagen loss, and wrinkles.
                            </div>
                        </div>
                    </div>

                </div>

                {/* Safe */}
                <div className="bg-[#ebe3ff] rounded-2xl p-6 md:p-8 lg:p-10 text-center shadow-md">
                    <h3 className="text-4xl  font-[500] mb-3">Safe</h3>
                    <p className="text-2xl  font-bold mb-5">Boosted Skin Health Enhancers</p>
                    <img
                        src="https://foxtale.in/cdn/shop/files/3.gif?v=1721909952&width=300"
                        alt="Safe skincare"
                        className="mx-auto mb-5 w-52 h-40 object-cover rounded-full"
                    />
                    <div className="flex flex-col items-start gap-6 text-left text-sm md:text-base lg:text-lg">
                        {/* FaHeart Block */}
                        <div className="flex items-start gap-4">
                            <div>
                                <FaHeart className="text-black text-[24px]" />
                            </div>
                            <div>
                                Healthy Skin = Glowing Skin
                            </div>
                        </div>

                        {/* FaPlus Block */}
                        <div className="flex items-start gap-4">
                            <div>
                                <FaPlus className="text-black text-[24px]" />
                            </div>
                            <div  className='text-[17px] font-[500] '>
                                Our products are formulated with skin health enhancers that complement actives for targeted solutions.
                            </div>
                        </div>

                        {/* FaShieldAlt Block */}
                        <div className="flex items-start gap-4">
                            <div>
                                <FaShieldAlt className="text-black text-[24px]" />
                            </div>
                            <div  className='text-[17px] font-[500] '>
                                They increase skin's moisture levels and support barrier function to give you a lit-from-within glow.
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductPlaybook;
