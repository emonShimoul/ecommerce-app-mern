const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">

        {/* Text */}
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Discover Amazing <span className="text-blue-600">Products</span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            High-quality products at the best prices. Shop smart, live better.
          </p>

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Shop Now
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200&auto=format&fit=crop"
            alt="hero"
            className="w-full"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;