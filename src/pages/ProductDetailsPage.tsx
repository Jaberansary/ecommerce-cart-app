import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p className="p-4 text-red-500"> Product not found </p>;
  }

  const handleAdd = () => {
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        className="text-blue-500 mb-4 hover:underline flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft /> Back to products
      </button>

      <div className="flex flex-col md:flex-row gap-6 bg-white shadow rounded p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/3 object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="font-semibold mb-4 text-gray-600">{product.price} $</p>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center bg-gray-100 rounded w-fit">
              <button
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className={`px-3 py-1 text-lg font-bold transition ${
                  quantity <= 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800 cursor-pointer"
                }`}
              >
                −
              </button>
              <span className="px-4 text-base select-none">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="mt-6 w-full sm:w-1/2 bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-600 cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
