import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">

      {/* Clickable Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-cover"
        />
      </Link>

      <div className="p-4">

        {/* Title */}
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold text-lg">
            ${product.price}
          </span>

          <button className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-black">
            Add
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;