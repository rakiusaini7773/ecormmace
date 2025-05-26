import React from "react";
import { FaTag } from "react-icons/fa";

const products = [
  {
    id: 1,
    label: "TRENDING",
    image:
      "https://foxtale.in/cdn/shop/files/1_70f32a6d-19bb-49ea-9940-8d522ba8df2c.jpg?v=1743841351&width=600",
    rating: 4.7,
    name: "Skin Radiance Mask",
    description: "Detans & brightens",
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
    <section className="py-12  ">
      <div className="">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden flex flex-col transition "
            >
              <div className="relative  flex justify-center items-center h-72">
                {product.label && (
                  <div className="absolute top-4 left-16 bg-white text-[11px] font-bold text-[#d83c6e] px-3 py-1 ">
                    {product.label}
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[332px] w-[332px] object-contain rounded-md"
                />
              </div>

              <div className="p-10 flex flex-col ">
                <div className="text-sm text-gray-700 mb-1">
                  <span className="text-yellow-500">⭐</span> {product.rating}
                </div>

                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 border-b border-black pb-8 ">{product.description}</p>

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
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default DetanSpotlight;
