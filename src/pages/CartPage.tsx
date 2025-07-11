import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const { cartItems, removeFromCart, changeQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center flex items-center flex-col">
        <h2 className="text-xl font-semibold mb-4">Shopping cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:underline flex items-center text-center gap-2 cursor-pointer"
        >
          <FiArrowLeft /> Back to store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 transition px-3"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center bg-gray-100 rounded w-fit">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() => changeQuantity(item.id, item.quantity - 1)}
                      className={`px-3 py-1 text-lg font-bold transition ${
                        item.quantity <= 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-blue-600 hover:text-blue-800 cursor-pointer"
                      }`}
                    >
                      −
                    </button>
                    <span className="px-4 text-base select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => changeQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-lg font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-6">
        <p className="text-lg font-semibold">
          Total price:{" "}  
          <span className="text-gray-600">

          ${totalPrice.toFixed(2)}
          </span>
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:underline flex items-center gap-2 cursor-pointer"
        >
          <FiArrowLeft /> Back to store
        </button>

        <button
          onClick={() => navigate("/finalize")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Order finalization
        </button>
      </div>
    </div>
  );
};

export default CartPage;
