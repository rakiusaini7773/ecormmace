// redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import BaseApiManager from '../../networking/baseAPIManager';
import { API_ENDPOINTS } from '../../networking/apiConfig';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  loading: false,
  itemLoading: {},
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
    setItemLoading: (state, action) => {
      const { productId, status } = action.payload;
      state.itemLoading[productId] = status;
    },
  },
});

export const { setCartItems, clearLocalCart, setLoading, setItemLoading } = cartSlice.actions;
export default cartSlice.reducer;

// ===== Utility functions =====
const getUserId = () => sessionStorage.getItem('userId');
const getUserRole = () => sessionStorage.getItem('userRole');
const isUser = () => getUserRole() === 'user';

// ===== Async Thunks =====
export const fetchCart = () => async (dispatch) => {
  const userId = getUserId();

  // if (!userId || !isUser()) {
  //   dispatch(setCartItems([]));
  //   toast.error('Please login as a user to view your cart');
  //   return;
  // }

  try {
    dispatch(setLoading(true));
    const response = await BaseApiManager.get(`${API_ENDPOINTS.GET_CART}/${userId}`);
    dispatch(setCartItems(response?.items || []));
  } catch (err) {
    console.error('Error fetching cart:', err);
    // toast.error('Failed to load cart');
    dispatch(setCartItems([]));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addToCart = (product) => async (dispatch) => {
  const userId = getUserId();

  if (!userId || !isUser()) {
    toast.error('Please login as a user to add items to cart');
    return;
  }

  try {
    dispatch(setLoading(true));
    const res = await BaseApiManager.post(API_ENDPOINTS.ADD_TO_CART, {
      userId,
      productId: product._id,
    });
    dispatch(setCartItems(res.items));
    toast.success('Item added to cart');
  } catch (err) {
    console.error('Add to cart error:', err);
    toast.error('Error adding item to cart');
  } finally {
    dispatch(setLoading(false));
  }
};

export const incrementQuantity = (productId) => async (dispatch) => {
  const userId = getUserId();

  if (!userId || !isUser()) return;

  try {
    dispatch(setItemLoading({ productId, status: true }));
    await BaseApiManager.post(API_ENDPOINTS.INCREMENT_CART_ITEM, {
      userId,
      productId,
    });
    dispatch(fetchCart());
  } catch (err) {
    console.error('Increment error:', err);
    toast.error('Error increasing quantity');
  } finally {
    dispatch(setItemLoading({ productId, status: false }));
  }
};

export const decrementQuantity = (productId) => async (dispatch) => {
  const userId = getUserId();

  if (!userId || !isUser()) return;

  try {
    dispatch(setItemLoading({ productId, status: true }));
    await BaseApiManager.post(API_ENDPOINTS.DECREMENT_CART_ITEM, {
      userId,
      productId,
    });
    dispatch(fetchCart());
  } catch (err) {
    console.error('Decrement error:', err);
    toast.error('Error decreasing quantity');
  } finally {
    dispatch(setItemLoading({ productId, status: false }));
  }
};

export const removeById = (productId) => async (dispatch) => {
  const userId = getUserId();

  if (!userId || !isUser()) return;

  try {
    dispatch(setItemLoading({ productId, status: true }));
    await BaseApiManager.post(API_ENDPOINTS.REMOVE_CART_ITEM, {
      userId,
      productId,
    });
    dispatch(fetchCart());
  } catch (err) {
    console.error('Remove error:', err);
    toast.error('Error removing item');
  } finally {
    dispatch(setItemLoading({ productId, status: false }));
  }
};

export const clearCart = () => async (dispatch) => {
  const userId = getUserId();

  if (!userId || !isUser()) {
    toast.error('Please login as a user to clear your cart');
    return;
  }

  try {
    dispatch(setLoading(true));
    await BaseApiManager.delete(`${API_ENDPOINTS.CLEAR_CART}/${userId}`);
    dispatch(clearLocalCart());
    toast.success('Cart cleared');
  } catch (err) {
    console.error('Clear cart error:', err);
    toast.error('Failed to clear cart');
  } finally {
    dispatch(setLoading(false));
  }
};
