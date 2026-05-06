import { useEffect, useState } from "react";
import API from "../services/api";
import ProductGrid from "../components/ProductGrid";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await API.get(
          `/products?search=${search}&page=${page}&limit=12`
        );

        setProducts(res.data.data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, page]);

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">
          Explore Products
        </h1>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        {/* Products */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <ProductGrid products={products} />
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Prev
          </button>

          <span className="font-medium">{page}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Products;