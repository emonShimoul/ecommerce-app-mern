import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">

        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 leading-tight">
            Discover Premium <br />
            <span className="text-indigo-600">Products Online</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg max-w-md mx-auto md:mx-0">
            Shop the latest trends with high-quality products at unbeatable prices.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/products"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
            >
              Browse Products
            </Link>
          </div>

        </div>

        {/* Right Image */}
        <div className="md:w-1/2 relative">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200&auto=format&fit=crop"
              alt="hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* subtle floating effect */}
          <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-indigo-200 rounded-full blur-2xl opacity-50"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;