import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const CartDrawer = () => {
  const [groupedItems, setGroupedItems] = useState([]);

  const fetchCart = () => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];

    const grouped = storedItems.reduce((acc, item) => {
      const existing = acc.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
        existing.totalPrice += item.price;
      } else {
        acc.push({ ...item, quantity: 1, totalPrice: item.price });
      }
      return acc;
    }, []);

    setGroupedItems(grouped);
  };

  const removeItem = (id) => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    const indexToRemove = storedItems.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      storedItems.splice(indexToRemove, 1);
      localStorage.setItem("cart", JSON.stringify(storedItems));
      fetchCart();
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setGroupedItems([]);
  };

  useEffect(() => {
    fetchCart();

    const handleStorageChange = () => {
      fetchCart();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const totalCartPrice = groupedItems.reduce(
    (sum, item) => sum + item.discountPrice,
    0
  );

  return (
    <div className="w-80 p-4 bg-white shadow-lg h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-5 border-b pb-2">🛒 Your Cart</h2>

      {groupedItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {groupedItems.map((item) => (
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
                <div className="text-sm text-gray-600 flex justify-between">
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.discountPrice}</span>
                </div>
                <button
                  className="text-red-500 text-sm mt-1 flex items-center gap-1 hover:underline"
                  onClick={() => removeItem(item.id)}
                >
                  <FaTrashAlt className="text-red-500" />
                  <span>Remove One</span>
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-lg font-semibold text-right border-t pt-4">
            Total: ₹{totalCartPrice}
          </div>

          <button
            onClick={clearCart}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 mt-4 rounded font-semibold"
          >
            <div className="flex items-center justify-center gap-2">
              <FaTrashAlt className="text-white" />
              <span>Clear Cart</span>
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default CartDrawer;
