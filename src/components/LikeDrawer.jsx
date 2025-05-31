import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const LikeDrawer = () => {
  const [likedItems, setLikedItems] = useState([]);

  const fetchLiked = () => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || [];

    // Grouping logic (optional — if you allow duplicates)
    const grouped = storedLikes.reduce((acc, item) => {
      const existing = acc.find((i) => i.id === item.id);
      if (!existing) {
        acc.push(item);
      }
      return acc;
    }, []);

    setLikedItems(grouped);
  };

  const removeLikedItem = (id) => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || [];
    const updatedLikes = storedLikes.filter((item) => item.id !== id);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
    fetchLiked();
  };

  const clearLikes = () => {
    localStorage.removeItem("likes");
    setLikedItems([]);
  };

  useEffect(() => {
    fetchLiked();

    const handleStorageChange = () => {
      fetchLiked();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="w-80 p-4 bg-white shadow-lg h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-5 border-b pb-2">❤️ Liked Items</h2>

      {likedItems.length === 0 ? (
        <p className="text-gray-500">You haven't liked any items.</p>
      ) : (
        <>
          {likedItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 border-b pb-4 mb-4 last:border-none"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex flex-col justify-between w-full">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <button
                  className="text-red-500 text-sm mt-1 flex items-center gap-1 hover:underline"
                  onClick={() => removeLikedItem(item.id)}
                >
                  <FaTrashAlt className="text-red-500" />
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearLikes}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 mt-4 rounded"
          >
            Clear All Likes
          </button>
        </>
      )}
    </div>
  );
};

export default LikeDrawer;
