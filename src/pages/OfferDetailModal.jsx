import React from "react";
import { IoMdClose } from "react-icons/io";

const OfferDetailModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-pink-500 text-xl">
          <IoMdClose />
        </button>
        <h2 className="text-lg font-bold text-center mb-4">View Offer</h2>
        <div className="flex justify-center mb-4">
          <img src={data.productImage} alt="Offer" className="w-40 h-40 object-cover rounded-md" />
        </div>
        <div className="space-y-2 text-sm">
          <div><strong>Tag:</strong> {data.tag || "—"}</div>
          <div><strong>Product Title:</strong> {data.title || "—"}</div>
          <div><strong>Sub Description:</strong> {data.subDescription || "—"}</div>
          <div><strong>Price:</strong> {data.price ? `₹${data.price}` : "—"}</div>
          <div><strong>Offer Code:</strong> {data.offerCode}</div>
          <div><strong>Rating:</strong> {data.rating || "—"}</div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailModal;
