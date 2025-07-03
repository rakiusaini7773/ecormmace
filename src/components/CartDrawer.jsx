import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  fetchCart,
  incrementQuantity,
  decrementQuantity,
  removeById,
} from '../redux/slices/cartSlice';

const CartDrawer = () => {
  const { items, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('items',items)

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce((acc, item) => {
    const price = item?.productId?.price || 0;
    const quantity = item?.quantity || 0;
    return acc + price * quantity;
  }, 0);

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value || 0);

  return (
    <div className="relative p-4 w-[400px] space-y-4">
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
                  src={item.productId?.imageUrls?.[0] || 'https://via.placeholder.com/48'}
                  alt={item.productId?.heading || 'Product'}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {item.productId?.heading || 'No Title'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatPrice(item.productId?.price)} x {item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        dispatch(decrementQuantity(item.productId?._id))
                      }
                      className="text-sm bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="text-xs text-gray-700 min-w-[32px] text-center">
                      Qty: {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(incrementQuantity(item.productId?._id))
                      }
                      className="text-sm bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() =>
                    dispatch(removeById(item.productId?._id))
                  }
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
            
            className="bg-green-600 text-white px-4 py-2 w-full mt-2 rounded"
          >
            Checkout
          </button>
        </>
      )}

      {/* ✅ Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-black"></div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;


// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import {
//   fetchCart,
//   incrementQuantity,
//   decrementQuantity,
//   removeById,
// } from '../redux/slices/cartSlice';

// const CartDrawer = () => {
//   const { items, loading } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
// console.log('items',items)
//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const total = items.reduce((acc, item) => {
//     const price = item?.productId?.price || 0;
//     const quantity = item?.quantity || 0;
//     return acc + price * quantity;
//   }, 0);

//   const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

//   const formatPrice = (value) =>
//     new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(value || 0);

//   const tierOffers = [
//     { quantity: 3, price: 1099, gifts: 3 },
//     { quantity: 4, price: 1499, gifts: 4 },
//     { quantity: 5, price: 1899, gifts: 5 },
//   ];

//   const currentTier = tierOffers.findLast(t => cartItemCount >= t.quantity);
//   const nextTier = tierOffers.find(t => cartItemCount < t.quantity);
//   const progressPercent = Math.min(
//     (cartItemCount / tierOffers[tierOffers.length - 1].quantity) * 100,
//     100
//   );

//   return (
//     <div className="relative p-4 w-[400px] space-y-4">
//       <h2 className="text-xl font-bold mb-2">Your Cart</h2>

//       {/* 🔥 Offer Card */}
//       {items.length > 0 && (
//         <div className="bg-pink-50 border border-pink-300 p-3 rounded mb-4 text-sm">
//           {nextTier ? (
//             <>
//               <p className="text-pink-700 font-medium">
//                 👉 Add {nextTier.quantity - cartItemCount} more product
//                 {nextTier.quantity - cartItemCount > 1 ? 's' : ''} to unlock Buy {nextTier.quantity} @ ₹{nextTier.price} — {nextTier.gifts} Free Gifts
//               </p>
//               <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
//                 <div
//                   className="bg-pink-500 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${progressPercent}%` }}
//                 />
//               </div>
//             </>
//           ) : (
//             <p className="text-green-600 font-semibold">
//               🎉 You've unlocked the maximum offer — {currentTier?.gifts} Free Gifts!
//             </p>
//           )}
//         </div>
//       )}

//       {items.length === 0 ? (
//         <div className="flex flex-col items-center text-center space-y-4">
//           <img
//             src="https://shop.foxtale.in/Images/empty-cart-foxtale.avif?w=256&q=75"
//             alt="Empty cart"
//             className="w-32 h-32"
//           />
//           <p className="text-sm text-gray-600">Your cart is empty</p>
//           <button
//             onClick={() => navigate('/product')}
//             className="bg-black text-white px-6 py-2 rounded font-semibold"
//           >
//             Shop Now
//           </button>
//         </div>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {items.map((item) => (
//               <li key={item._id} className="flex items-center gap-3 border-b pb-3">
//                 <img
//                   src={item.productId?.imageUrls?.[0] || 'https://via.placeholder.com/48'}
//                   alt={item.productId?.heading || 'Product'}
//                   className="w-12 h-12 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <p className="text-sm font-semibold text-gray-800">
//                     {item.productId?.heading || 'No Title'}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {formatPrice(item.productId?.price)} x {item.quantity}
//                   </p>
//                   <div className="flex items-center gap-2 mt-1">
//                     <button
//                       onClick={() =>
//                         item.quantity > 1 &&
//                         dispatch(decrementQuantity(item.productId?._id))
//                       }
//                       className="text-sm bg-gray-200 px-2 rounded"
//                     >
//                       -
//                     </button>
//                     <span className="text-xs text-gray-700 min-w-[32px] text-center">
//                       Qty: {item.quantity}
//                     </span>
//                     <button
//                       onClick={() =>
//                         dispatch(incrementQuantity(item.productId?._id))
//                       }
//                       className="text-sm bg-gray-200 px-2 rounded"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() =>
//                     dispatch(removeById(item.productId?._id))
//                   }
//                   className="text-red-500 text-xs font-medium hover:underline"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>

//           {/* Gift Unlock Message */}
//           {cartItemCount === 3 && (
//             <div className="border border-dashed border-pink-300 p-3 rounded bg-pink-100 text-sm text-gray-800">
//               🎁 Add 1 more product to unlock <strong>Free Nail Cuticle Oil</strong>
//             </div>
//           )}

//           <div className="border-t pt-3">
//             <p className="text-md font-semibold text-right">
//               Total: {formatPrice(total)}
//             </p>
//           </div>

//           <button
//             className="bg-green-600 text-white px-4 py-2 w-full mt-2 rounded"
//           >
//             Checkout
//           </button>
//         </>
//       )}

//       {/* ✅ Loader Overlay */}
//       {loading && (
//         <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-black"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartDrawer;
