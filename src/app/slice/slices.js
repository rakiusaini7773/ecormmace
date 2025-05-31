// ✅ Import at the top
import { createSlice } from "@reduxjs/toolkit";

// ✅ Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to load cart from localStorage", err);
    return [];
  }
};

// ✅ Helper function to save cart to localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart to localStorage", err);
  }
};

// ✅ cartSlice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

// ✅ likeSlice
const likeSlice = createSlice({
  name: "like",
  initialState: {
    likedItems: [],
  },
  reducers: {
    addToLike: (state, action) => {
      // Avoid duplicate likes
      const exists = state.likedItems.find(item => item.id === action.payload.id);
      if (!exists) {
        state.likedItems.push(action.payload);
      }
    },
    removeFromLike: (state, action) => {
      state.likedItems = state.likedItems.filter(item => item.id !== action.payload);
    },
    clearLike: (state) => {
      state.likedItems = [];
    },
  },
});

// ✅ Export cart actions and reducer
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// ✅ Export like actions and reducer
export const { addToLike, removeFromLike, clearLike } = likeSlice.actions;
export const likeReducer = likeSlice.reducer;
