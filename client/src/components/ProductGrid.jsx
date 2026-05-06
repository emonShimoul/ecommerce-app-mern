import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductGrid = ({ products = [], title, link }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">

      {/* Header */}
      {title && (
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 text-center">
            {title}
          </h2>

          {link && (
            <Link
              to={link}
              className="text-indigo-600 font-medium hover:underline"
            >
              View All
            </Link>
          )}
        </div>
      )}

      {/* Empty */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;