import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
      <div className=" bg-gray-200 overflow-hidden ">
        <img
          src={product.image}
          alt={product.name}
          className=" object-cover group-hover:opacity-75 transition"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold mb-2">{product.name}</h2>
        <p className=" mb-4 text-gray-600">{product.price} $</p>
        <Link
          to={`/products/${product.id}`}
          className="w-full inline-block text-center bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
