import React from 'react'
import { Home } from "lucide-react";
export const WonderWomenSection = () => {
  return (
    <div className="w-full bg-white">
        <section className="relative py-12 md:py-16 lg:py-20 px-0">
                {/* Breadcrumb */}
                <div className="absolute top-6 left-4 md:top-5 md:left-80 flex items-center gap-1 text-sm text-gray-600">
                    <Home className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-600">About Us</span>
                </div>

                {/* Image (only visible on md and up) */}
                <div className="w-full hidden md:block">
                    <img
                        src="https://foxtale.in/cdn/shop/files/custom_resized_e9956aef-214a-4d5f-8eef-ac4cd9098919.jpg?v=1688982074"
                        alt="About Us Banner"
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Text (only visible on mobile) */}
                <div className="text-center mt-8 px-4 block md:hidden">
                    <h1 className="text-xl font-serif text-[#de582f]">
                        High Performing Skincare,
                    </h1>
                    <h2 className="text-2xl font-bold font-serif text-[#de582f]">
                        Inspired by Wonder Women
                    </h2>
                    <p className="text-xs tracking-widest text-[#de582f] font-semibold uppercase mt-2">
                        Our Story in Five Chapters
                    </p>
                </div>
            </section>
    </div>
  )
}
