import { createSlice } from '@reduxjs/toolkit';
import { CloudHail } from 'lucide-react';

// Save cart items to localStorage
const updateLocalStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

// Load cart items from localStorage
const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;  
      console.log('product',product)
      const existing = state.items.find(item => item._id === product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      updateLocalStorage(state.items);
    },

    incrementQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item) {
        item.quantity += 1;
        updateLocalStorage(state.items);
      }
    },

    decrementQuantity(state, action) {
      const id = action.payload;
      const index = state.items.findIndex(i => i._id === id);
      if (index !== -1) {
        state.items[index].quantity -= 1;
        if (state.items[index].quantity <= 0) {
          state.items.splice(index, 1); // Remove item if quantity is 0
        }
        updateLocalStorage(state.items);
      }
    },

    removeById(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
      updateLocalStorage(state.items);
    },

    clearCart(state) {
      state.items = [];
      updateLocalStorage([]);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeById,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
