// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import BaseApiManager from '../../networking/baseAPIManager';
import { API_ENDPOINTS } from '../../networking/apiConfig';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    clearLocalCart: (state) => {
      state.items = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCartItems, clearLocalCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;

const getUserId = () => sessionStorage.getItem('userId');

// ✅ Fetch Cart
export const fetchCart = () => async (dispatch) => {
  const userId = getUserId();
  if (!userId) {
    toast.error('Please login to view your cart');
    return;
  }

  try {
    dispatch(setLoading(true));
    const response = await BaseApiManager.get(`${API_ENDPOINTS.GET_CART}/${userId}`);
    dispatch(setCartItems(response?.items || []));
  } catch (err) {
    console.error('Error fetching cart:', err);
    toast.error('Failed to load cart');
    dispatch(setCartItems([]));
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Add to Cart
export const addToCart = (product) => async (dispatch) => {
  const userId = getUserId();
  if (!userId) {
    toast.error('Please login to add items to cart');
    return;
  }

  try {
    const res = await BaseApiManager.post(API_ENDPOINTS.ADD_TO_CART, {
      userId,
      productId: product._id,
    });
    dispatch(setCartItems(res.items));
    toast.success('Item added to cart');
  } catch (err) {
    console.error(err);
    toast.error('Error adding item to cart');
  }
};

// ✅ Increment Quantity
export const incrementQuantity = (productId) => async (dispatch) => {
  const userId = getUserId();
  if (!userId) return;

  try {
    const res = await BaseApiManager.post(API_ENDPOINTS.INCREMENT_CART_ITEM, {
      userId,
      productId,
    });
    dispatch(setCartItems(res.items));
  } catch (err) {
    toast.error('Error increasing quantity');
  }
};

// ✅ Decrement Quantity
export const decrementQuantity = (productId) => async (dispatch) => {
  const userId = getUserId();
  if (!userId) return;

  try {
    const res = await BaseApiManager.post(API_ENDPOINTS.DECREMENT_CART_ITEM, {
      userId,
      productId,
    });
    dispatch(setCartItems(res.items));
  } catch (err) {
    toast.error('Error decreasing quantity');
  }
};

// ✅ Remove from Cart
export const removeById = (productId) => async (dispatch) => {
  const userId = getUserId();
  if (!userId) return;

  try {
    const res = await BaseApiManager.post(API_ENDPOINTS.REMOVE_CART_ITEM, {
      userId,
      productId,
    });
    dispatch(setCartItems(res.items));
  } catch (err) {
    toast.error('Error removing item');
  }
};

// ✅ Clear Cart
export const clearCart = () => async (dispatch) => {
  const userId = getUserId();
  if (!userId) return;

  try {
    await BaseApiManager.delete(`${API_ENDPOINTS.CLEAR_CART}/${userId}`);
    dispatch(clearLocalCart());
    toast.success('Cart cleared');
  } catch (err) {
    toast.error('Failed to clear cart');
  }
};
