import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="h-44 sm:h-48 md:h-52 bg-gray-100 overflow-hidden relative">
        <img
          src={product.images?.[0]?.url}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        {product.discountPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            SALE
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="text-red-500 font-semibold">
                ${product.discountPrice}
              </span>
              <span className="text-gray-400 line-through text-sm">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="text-indigo-600 font-semibold">
              ${product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;