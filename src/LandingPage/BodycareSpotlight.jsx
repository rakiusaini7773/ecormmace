import React from "react";
import { FaTag } from "react-icons/fa";
import CustomButton from "../components/common/CustomButton";

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
  <div className="rounded-2xl overflow-hidden flex flex-col transition  ">
    <div className="relative flex justify-center items-center">
      {product.label && (
        <div className="absolute top-2 left-4 bg-white text-[11px] font-bold text-[#d83c6e] px-2 py-1">
          {product.label}
        </div>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="h-auto w-full object-cover rounded-md"
      />
    </div>

    <div className="flex flex-col px-0 pt-4 pb-0 font-[Poppins] text-[#878787] text-[14px]">
      <div className="text-[14px]  mb-1">
        <span className="text-[#ffd166] font-[16px]">⭐</span>
        <span className=" text-[#000] font-semibold">{product.rating}</span>
      </div>

      <h3 className="font-semibold text-sm text-black">{product.name}</h3>
      <p className=" text-gray-600 border-b border-black pb-4 " style={{ fontWeight: '400', fontSize: '14px' }}>
        {product.description}
      </p>

      <div
        className="mt-4 flex justify-between items-start gap-4"
        style={{ paddingTop: '9px' }}
      >
        <div>
          <p
            className="text-black"
            style={{
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '16px',
              paddingBottom: '4px',
            }}
          >
            {product.price}
          </p>
          <p
            className="flex items-center gap-1 text-gray-600"
            style={{ fontSize: '14px', color: '#878787' }}
          >
            <FaTag size={12} /> {product.coupon}
          </p>
        </div>

        <div>
          <CustomButton>Add</CustomButton>
        </div>
      </div>

    </div>


  </div>
);
export default BodycareSpotlight;
