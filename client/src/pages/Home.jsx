import { useEffect, useState } from "react";
import API from "../services/api";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      <ProductGrid products={products} />
    </div>
  );
};

export default Home;