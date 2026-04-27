import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  // Placeholder data for featured products
  const featuredProducts = [
    {
      _id: '1',
      name: 'Premium Leather Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      category: 'Accessories'
    },
    {
      _id: '2',
      name: 'Wireless Noise-Canceling Headphones',
      price: 299.49,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      category: 'Electronics'
    },
    {
      _id: '3',
      name: 'Minimalist Canvas Backpack',
      price: 79.00,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      category: 'Lifestyle'
    },
    {
      _id: '4',
      name: 'Smart Fitness Tracker',
      price: 129.95,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
      category: 'Fitness'
    }
  ];

  return (
    <div>
      <Hero />
      
      <section className="py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Our most popular items this week.</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 border-t border-b border-gray-200 my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
            <p className="text-gray-500 text-sm">Every product is inspected by our experts.</p>
          </div>
          <div>
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-gray-500 text-sm">On all orders over $100 worldwide.</p>
          </div>
          <div>
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
            <p className="text-gray-500 text-sm">100% secure payment methods accepted.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
