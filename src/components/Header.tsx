import { FiShoppingCart } from "react-icons/fi";
import { MdStorefront } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold flex items-center gap-2  hover:text-blue-600">
        <MdStorefront size={24} /> Hemmat Store!
      </Link>

      <Link
        to="/cart"
        className="relative flex items-center text-gray-700 hover:text-blue-600"
      >
        <FiShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Header;
