import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  incrementQuantity,
  decrementQuantity,
  removeById,
  clearCart,
} from '../redux/slices/cartSlice';

const CartDrawer = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="p-4 w-[300px] space-y-4">
      <h2 className="text-xl font-bold mb-2">Your Cart</h2>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-4">
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
          <ul className="space-y-4 ">
            {items.map((item) => (
              <li key={item._id} className="flex items-center gap-3 border-b pb-3">
                <img
                  src={item.imageUrls?.[0]}
                  alt={item.heading}
                  className="w-12 h-12 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{item.heading}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => {
                        console.log('Decrementing item with ID:', item._id);
                        dispatch(decrementQuantity(item._id));
                      }}
                      className="text-sm bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="text-xs text-gray-700">Qty: {item.quantity}</span>
                    <button
                      onClick={() => {
                        console.log('Incrementing item with ID:', item._id);
                        dispatch(incrementQuantity(item._id));
                      }}
                      className="text-sm bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>

                  </div>
                </div>
                <button
                  onClick={() => {
                    console.log('Removing item with ID:', item._id);
                    dispatch(removeById(item._id));
                  }}
                  className="text-red-500 text-xs font-medium hover:underline"
                >
                  Remove
                </button>                     

              </li>
            ))}
          </ul>

          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white px-4 py-2 w-full mt-4 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartDrawer;
