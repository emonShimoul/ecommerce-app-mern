const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">

      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">
          {product.title}
        </h3>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

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