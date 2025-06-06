import React from "react";
import { FaTag } from "react-icons/fa";
import CustomButton from "../components/common/CustomButton";

const products = [
  {
    id: 1,
    label: "TRENDING",
    image:
      "https://foxtale.in/cdn/shop/files/1_70f32a6d-19bb-49ea-9940-8d522ba8df2c.jpg?v=1743841351&width=600",
    rating: 4.7,
    name: "Skin Radiance Mask",
    description: "8+ hours of oil control + pearlescent glow",
    price: "₹ 545",
    coupon: "DETAN15",
  },
  {
    id: 2,
    label: "NEW LAUNCH",
    image:
      "https://foxtale.in/cdn/shop/files/SGFW-01_1.jpg?v=1746782458&width=600",
    rating: 4.8,
    name: "Super Glow Face Wash",
    description: "Daily tan remover that boosts glow",
    price: "₹ 249",
    coupon: "DETAN15",
  },
  {
    id: 3,
    label: "CELEBRITY–APPROVED",
    image:
      "https://foxtale.in/cdn/shop/files/FXN-ESDS50_1.jpg?v=1743841754&width=600",
    rating: 4.8,
    name: "SPF 50 Glow Sunscreen",
    description: "Prevents tan & boosts glow",
    price: "₹ 349",
    coupon: "DETAN15",
  },
  {
    id: 4,
    label: "",
    image:
      "https://foxtale.in/cdn/shop/files/1_16_22be3ab1-07e4-49ad-bed6-ea527b501b99.jpg?v=1743841022&width=600",
    rating: 4.8,
    name: "Exfoliating Body Wash",
    description: "Gently exfoliates tan away",
    price: "₹ 399",
    coupon: "DETAN15",
  },
];

const DetanSpotlight = () => {
  return (
    <section className="py-12 m-6">
      {/* Grid view for xl and up */}
      <div className="hidden xl:grid gap-8 grid-cols-4 justify-items-center py-[24px] px-[80px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Horizontal scroll for mobile/tablet */}
      <div className="xl:hidden overflow-x-auto whitespace-nowrap  hidden-scrollbar">
        <div className="flex gap-6">
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

export default DetanSpotlight;
