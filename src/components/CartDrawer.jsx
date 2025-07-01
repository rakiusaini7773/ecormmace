import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  fetchCart,
  incrementQuantity,
  decrementQuantity,
  removeById,
  clearCart,
} from '../redux/slices/cartSlice';

const CartDrawer = () => {
  const { items, loading } = useSelector((state) => state.cart);
console.log('items',items)
  // const items = Object.values(
  //   rawItems.reduce((acc, item) => {
  //     const product = item.productId;
  //     if (!product || typeof product !== 'object') return acc;

  //     const productId = product._id;
  //     if (!productId) return acc;

  //     if (!acc[productId]) {
  //       acc[productId] = {
  //         ...product,
  //         quantity: item.quantity || 1,
  //       };
  //     } else {
  //       acc[productId].quantity += item.quantity || 1;
  //     }

  //     return acc;
  //   }, {})
  // );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="p-4 w-[400px] space-y-4">
      <h2 className="text-xl font-bold mb-2">Your Cart</h2>

      {items.length === 0 ? (
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            src="https://shop.foxtale.in/Images/empty-cart-foxtale.avif?w=256&q=75"
            alt="Empty cart"
            className="w-32 h-32"
          />
          <p className="text-sm text-gray-600">Your cart is empty</p>
          <button
            onClick={() => navigate('/product')}
            className="bg-black text-white px-6 py-2 rounded font-semibold"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item._id} className="flex items-center gap-3 border-b pb-3">
                <img
                  src={item.imageUrls?.[0]}
                  alt={item.heading}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{item.heading}</p>
                  <p className="text-xs text-gray-500">
                    {formatPrice(item.price)} x {item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        item.quantity > 1 && dispatch(decrementQuantity(item._id))
                      }
                      className="text-sm bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="text-xs text-gray-700 min-w-[32px] text-center">
                      Qty: {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item._id))}
                      className="text-sm bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeById(item._id))}
                  className="text-red-500 text-xs font-medium hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t pt-3">
            <p className="text-md font-semibold text-right">
              Total: {formatPrice(total)}
            </p>
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white px-4 py-2 w-full mt-4 rounded"
          >
            Clear Cart
          </button>

          <button
            onClick={() => navigate('/checkout')}
            className="bg-green-600 text-white px-4 py-2 w-full mt-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartDrawer;
