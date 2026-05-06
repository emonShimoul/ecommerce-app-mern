import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../hooks/useCart";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomStyle, setZoomStyle] = useState({});
    const [isZooming, setIsZooming] = useState(false);
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);

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
            <div className="max-w-7xl mx-auto px-8 py-10 grid md:grid-cols-2 gap-10">

                {/* LEFT SIDE (KEEP YOUR ZOOM LOGIC) */}
                <div>

                    <div
                        className="relative w-full max-w-md h-[400px] overflow-hidden rounded-2xl shadow-sm"
                        onMouseMove={(e) => {
                        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - left) / width) * 100;
                        const y = ((e.clientY - top) / height) * 100;

                        setZoomStyle({
                            backgroundPosition: `${x}% ${y}%`,
                        });
                        }}
                        onMouseEnter={() => setIsZooming(true)}
                        onMouseLeave={() => setIsZooming(false)}
                    >
                        {/* Zoom layer */}
                        <div
                        className={`absolute inset-0 bg-no-repeat transition-opacity duration-200 ${
                            isZooming ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                            backgroundImage: `url(${selectedImage})`,
                            backgroundSize: "200%",
                            ...zoomStyle,
                        }}
                        />

                        {/* Normal image */}
                        <img
                        src={selectedImage}
                        alt=""
                        className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 mt-4 flex-wrap">
                        {product.images.map((img, i) => (
                        <img
                            key={i}
                            src={img.url}
                            onClick={() => setSelectedImage(img.url)}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                            selectedImage === img.url
                                ? "border-indigo-600"
                                : "border-transparent"
                            }`}
                        />
                        ))}
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div>

                <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
                    {product.title}
                </h1>

                {/* Price */}
                <div className="mt-4">
                    {product.discountPrice ? (
                    <>
                        <span className="text-red-500 text-2xl font-semibold">
                        ${product.discountPrice}
                        </span>
                        <span className="ml-3 line-through text-gray-400">
                        ${product.price}
                        </span>
                    </>
                    ) : (
                    <span className="text-indigo-600 text-2xl font-semibold">
                        ${product.price}
                    </span>
                    )}
                </div>

                {/* Stock */}
                <p className={`mt-2 text-sm font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                }`}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                {/* Description */}
                <p className="text-gray-600 mt-6 leading-relaxed">
                    {product.description}
                </p>

                {/* Quantity */}
                <div className="mt-6">
                    <label className="mr-3 font-medium">Qty:</label>
                    <input
                    type="number"
                    value={qty}
                    min={1}
                    onChange={(e) => setQty(e.target.value)}
                    className="w-20 border border-gray-300 px-2 py-1 rounded-lg"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={() => addToCart(product, qty)}
                    className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                >
                    Add to Cart
                </button>

                </div>

            </div>
        </div>
    );
};

export default ProductDetails;