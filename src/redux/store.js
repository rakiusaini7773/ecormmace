// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // make sure this path is correct

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // add other reducers here
  },
});

export default store;
