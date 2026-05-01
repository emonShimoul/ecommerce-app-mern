import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const res = await API.get(`/products/${id}`);
            setProduct(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product?.images?.length) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedImage(product.images[0].url);
        }
    }, [product]);
    

    if (loading)
    return (
    <div className="p-10 text-center text-gray-500 animate-pulse">
        Loading product...
    </div>
    );

  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">

        <div>
            {/* Main Image */}
            <img
                src={selectedImage}
                alt=""
                className="w-full max-w-md h-[400px] object-cover rounded-xl"
            />

            {/* Thumbnails (only if multiple images exist) */}
            {product.images?.length > 0 && (
                <div className="flex gap-3 mt-4">
                    {product.images.map((img, i) => (
                        <img
                        key={i}
                        src={img.url}
                        alt=""
                        onClick={() => setSelectedImage(img.url)}
                        className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                            selectedImage === img.url
                            ? "border-blue-600"
                            : "border-transparent"
                        }`}
                        />
                    ))}
                </div>
            )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {product.title}
          </h1>

          <p className="text-blue-600 text-2xl font-semibold mt-4">
            ${product.price}
          </p>

          <p className={`mt-2 text-sm font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity (basic) */}
          <div className="mt-6">
            <label className="mr-3 font-medium">Qty:</label>
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="w-16 border px-2 py-1 rounded"
            />
          </div>

          {/* Add to Cart */}
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;