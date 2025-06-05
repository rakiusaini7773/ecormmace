// components/FiveImageGrid.jsx
import React from "react";

const imageData = [
  {
    id: 1,
    previewSrc: "https://foxtale.in/cdn/shop/files/custom_resized_e595f0bc-2e2a-43dd-9845-993c81c4faa8.jpg?v=1688982074",
    fullSrc: "https://foxtale.in/cdn/shop/files/About_Us_Page_Desktop_V3-02.jpg?v=1688982073", // Replace with actual high-res link
    alt: "Chapter 1",
  },
  {
    id: 2,
    previewSrc: "https://foxtale.in/cdn/shop/files/custom_resized_16c2c174-2fb9-42d2-af32-a283d816536c.jpg?v=1688982074",
    fullSrc: "https://foxtale.in/cdn/shop/files/About_Us_Page_Desktop_V3-03_1.jpg?v=1689585718",
    alt: "Chapter 2",
  },
  {
    id: 3,
    previewSrc: "https://foxtale.in/cdn/shop/files/custom_resized_ee702fc4-1d8c-4a3e-9070-ab607cb983b9.jpg?v=1688982075",
    fullSrc: "https://foxtale.in/cdn/shop/files/About_Us_Page_Desktop_V3-04.jpg?v=1688982073",
    alt: "Chapter 3",
  },
  {
    id: 4,
    previewSrc: "https://foxtale.in/cdn/shop/files/custom_resized_3e6c0814-872e-4142-b25f-b3900e6f684d.jpg?v=1688982075",
    fullSrc: "https://foxtale.in/cdn/shop/files/About_Us_Page_Desktop_V3-05.jpg?v=1688982073",
    alt: "Chapter 4",
  },
  {
    id: 5,
    previewSrc: "https://foxtale.in/cdn/shop/files/custom_resized_80143bfc-602b-42ff-a0e3-3c1b5e4716b8.jpg?v=1688982075",
    fullSrc: "https://foxtale.in/cdn/shop/files/About_Us_Page_Desktop_V3-06_4a5dc3f7-c3d4-4674-92e5-7e1be0218958.jpg?v=1688982073",
    alt: "Chapter 5",
  },
];

const FiveImageGrid = ({ onImageClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0">
      {imageData.map((item) => (
        <div key={item.id} className="w-full">
          <img
            src={item.previewSrc}
            alt={item.alt}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => onImageClick({ src: item.fullSrc, alt: item.alt })}
          />
        </div>
      ))}
    </div>
  );
};

export default FiveImageGrid;
