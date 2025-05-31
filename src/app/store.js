import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, likeReducer } from "./slice/slices"; // both are exported from same file

const store = configureStore({
  reducer: {
    cart: cartReducer,
    like: likeReducer,
  },
});

export default store;
