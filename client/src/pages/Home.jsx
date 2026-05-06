import { useEffect, useState } from "react";
import API from "../services/api";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [discounted, setDiscounted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const [fRes, dRes] = await Promise.all([
          API.get("/products?featured=true&limit=8"),
          API.get("/products?discount=true&limit=8"),
        ]);

        setFeatured(fRes.data.data.products);
        setDiscounted(dRes.data.data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      <Hero />

      <ProductGrid
        products={featured}
        title="Featured Products"
        link="/products"
      />

      <div className="bg-white">
        <ProductGrid
          products={discounted}
          title="🔥 Hot Deals"
        />
      </div>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Explore More Products
        </h2>
        <p className="mb-6 text-gray-200">
          Discover the best deals tailored for you
        </p>
        <a
          href="/products"
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-medium"
        >
          Shop Now
        </a>
      </section>

    </div>
  );
};

export default Home;