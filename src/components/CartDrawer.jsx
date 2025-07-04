import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  incrementQuantity,
  decrementQuantity,
  removeById,
} from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { items, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value || 0);

  const nonFreeItems = items.filter(
    (item) => item.productId?.price && item.productId.price > 0
  );

  const total = nonFreeItems.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Shared Coupon Logic
  let sharedCoupon = null;

  const allCouponItems = items.filter(
    (item) => item.productId?.offers?.couponType
  );

  const uniqueCouponTypes = [
    ...new Set(allCouponItems.map((item) => item.productId.offers.couponType)),
  ];

  if (uniqueCouponTypes.length === 1) {
    const couponType = uniqueCouponTypes[0];
    const matchingItems = items.filter(
      (item) => item.productId?.offers?.couponType === couponType
    );

    const couponOffers = matchingItems[0]?.productId?.offers;
    const usageRestrictions = matchingItems[0]?.productId?.usageRestrictions;

    const requiredProductIds = usageRestrictions?.products || [];
    const minSpend = usageRestrictions?.minSpend || 0;
    const cartProductIds = items.map((item) => item.productId._id);

    const allRequiredPresent = requiredProductIds.every((id) =>
      cartProductIds.includes(id)
    );

    const isMinSpendMet = total >= minSpend;

    const allCartItemsMatchCoupon = matchingItems.every(
      (item) => item.productId?.offers?.couponType === couponType
    );

    if (allRequiredPresent && isMinSpendMet && allCartItemsMatchCoupon) {
      sharedCoupon = couponOffers;
    }
  }

  return (
    <div className="p-4 w-[400px] relative">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

     

      {/* Items */}
      <ul className="space-y-4">
        {items.map((item) => {
          const product = item.productId;
          const isFree =
            product?.price === 0 || product?.tag?.toLowerCase() === 'free';

          return (
            <li key={item._id} className="flex items-start gap-3 border-b pb-3 relative">
              <img
                src={product?.imageUrls?.[0] || ''}
                alt={product?.heading || ''}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{product?.heading}</p>
                <p className="text-xs text-gray-600">
                  {isFree ? (
                    <>
                      <span className="line-through text-gray-400 mr-1">
                        {formatPrice(product?.oldPrice || 199)}
                      </span>
                      <span className="text-green-600 font-bold">FREE</span>
                    </>
                  ) : (
                    formatPrice(product?.price)
                  )}
                </p>
                {!isFree && (
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        dispatch(decrementQuantity(product?._id))
                      }
                      className="text-sm bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="text-xs">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(product?._id))}
                      className="text-sm bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => dispatch(removeById(product?._id))}
                className="text-red-500 text-xs font-medium hover:underline"
              >
                🗑
              </button>
              {isFree && (
                <span className="absolute top-0 right-0 text-green-600 text-[10px] font-bold border border-green-500 px-1 rounded-bl bg-white">
                  FREE
                </span>
              )}
            </li>
          );
        })}
      </ul>

       {/* Shared Coupon */}
      {sharedCoupon && (
        <div className="mb-4 border border-blue-300 bg-blue-50 rounded p-3 text-sm">
          <p className="font-semibold text-blue-800">
            Coupon: <span className="ml-1">{sharedCoupon.couponType}</span>
          </p>
          <p className="text-blue-600">
            {sharedCoupon.discountType === 'Flat'
              ? `Flat ₹${sharedCoupon.discountValue} off`
              : `${sharedCoupon.discountValue}% off`}
          </p>
          <p className="text-gray-500">
            Valid till:{' '}
            {new Date(sharedCoupon.expiryDate).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          <button
            onClick={() => handleCopy(sharedCoupon.couponType)}
            className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            {copiedCode === sharedCoupon.couponType ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 text-lg font-semibold border-t pt-3">
        <span>Subtotal:</span>
        <span>{formatPrice(total)}</span>
      </div>

      <button
        className="mt-4 w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-900"
        
      >
        Checkout Now
      </button>

      {loading && (
        <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-50">
          <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
