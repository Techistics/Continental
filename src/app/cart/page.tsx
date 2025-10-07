// "use client";
// import { useCart } from "../context/cartContext";

// export default function CartPage() {
//   const { cart, removeFromCart, clearCart } = useCart();
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <div className="space-y-4">
//           {cart.map((item) => (
//             <div key={item.id} className="flex justify-between border-b pb-2">
//               <div>
//                 <h2 className="font-semibold">{item.name}</h2>
//                 <p>
//                   ${item.price} × {item.quantity}
//                 </p>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//               <p className="mt-4 text-xl font-bold">
//                 Total: ${total.toFixed(2)}
//               </p>
//               <button
//                 onClick={() => alert("Proceeding to checkout...")}
//                 className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Checkout
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={clearCart}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import CheckoutButton from "../components/Checkout";
import { useCart } from "../context/cartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price}</p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total & Checkout only once */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            
            <CheckoutButton items={cart} />

          </div>

          {/* Clear cart button */}
          <button
            onClick={clearCart}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
