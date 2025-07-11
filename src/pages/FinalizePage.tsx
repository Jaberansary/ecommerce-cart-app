import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const FinalizePage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirm = () => {
    clearCart();
    setConfirmed(true);
    setTimeout(() => navigate("/", { replace: true }), 3000);
  };

  if (confirmed) {
    return (
      <div className="p-6 text-center flex flex-col items-center justify-center gap-4 min-h-[300px]">
        <h2 className="text-2xl font-bold text-green-600">
          Your order was successfully placed!
        </h2>
        <p className="text-gray-600">Returning to the store...</p>

        <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-6  text-center">
        <h2 className="text-xl font-semibold">Shopping cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-500 hover:underline"
        >
          Back to store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-lg font-semibold text-right mb-6">
        Total price: ${totalPrice.toFixed(2)}
      </p>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/cart")}
          className="text-blue-500 hover:underline flex items-center gap-2 cursor-pointer"
        >
          <FiArrowLeft /> Back to Cart
        </button>

        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Order confirmation
        </button>
      </div>
    </div>
  );
};

export default FinalizePage;
