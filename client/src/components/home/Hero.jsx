const Hero = () => {
  return (
    <div className="relative bg-gray-900 h-[500px] flex items-center overflow-hidden rounded-xl mb-12">
      <img 
        src="/src/images/" 
        alt="Hero Banner" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="relative z-10 container mx-auto px-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
          New Summer <br /> Collection 2026
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-lg">
          Discover our latest arrivals with up to 50% off on selected items. Style meets comfort in every piece.
        </p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
