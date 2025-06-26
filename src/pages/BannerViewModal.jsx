import { useState } from "react";
import BaseApiManager from "../networking/baseAPIManager";

function BannerViewModal({ showModal, setShowModal, selectedProduct, refreshProducts }) {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus) => {
    if (!selectedProduct?._id) return;

    setLoading(true);
    try {
      // Replace ':id' placeholder with actual product ID in endpoint
      const endpoint = process.env.REACT_APP_UPDATE_PRODUCT_STATUS_ENDPOINT.replace(
        ":id",
        selectedProduct._id
      );

      await BaseApiManager.patch(endpoint, { status: newStatus });

      // Optionally refresh product list after status update
      if (refreshProducts) refreshProducts();

      setShowModal(false);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update product status.");
    } finally {
      setLoading(false);
    }
  };

  if (!showModal || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative shadow-lg">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-3 text-xl font-bold text-gray-600"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">View Banner</h2>

        <div className="flex justify-center mb-4">
          <img
            src={selectedProduct.imageUrls?.[0]}
            alt="Banner"
            className="w-[150px] h-[150px] object-cover rounded-md"
          />
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Tag:</strong> {selectedProduct.tag}</p>
          <p><strong>Product Title:</strong> {selectedProduct.heading}</p>
          <p><strong>Sub Description:</strong> {selectedProduct.subDescription}</p>
          <p><strong>Price:</strong> {selectedProduct.price}</p>
          <p><strong>Offer Code:</strong> {selectedProduct.offerCode || "N/A"}</p>
          <p><strong>Rating:</strong> {selectedProduct.rating || "N/A"}</p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={loading}
            onClick={() => updateStatus("active")}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Active
          </button>
          <button
            disabled={loading}
            onClick={() => updateStatus("inactive")}
            className="bg-red-400 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Inactive
          </button>
        </div>
      </div>
    </div>
  );
}

export default BannerViewModal;
