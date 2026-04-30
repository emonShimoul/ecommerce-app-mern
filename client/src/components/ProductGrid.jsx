import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

    </section>
  );
};

export default ProductGrid;