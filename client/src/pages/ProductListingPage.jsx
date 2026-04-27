import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

const ProductListingPage = () => {
  const [viewMode, setViewMode] = useState('grid'); // Default to grid view
  const [appliedFilters, setAppliedFilters] = useState(['Samsung', 'Apple', 'Pocco', '8GB Ram', 'Metallic']);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Filter products if search query exists
        const filteredData = searchQuery 
          ? data.filter(p => 
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              p.category.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : data;

        setProducts(filteredData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading products...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 py-5 text-[#8B96A5] text-sm flex items-center gap-2">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span>&gt;</span>
        <span className="font-medium text-[#1C1C1C]">Products</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="border-t border-[#DEE2E7] py-4">
             <div className="flex justify-between items-center mb-3 cursor-pointer group">
                <span className="font-bold text-[#1C1C1C]">Category</span>
                <svg className="w-4 h-4 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
             </div>
             <ul className="space-y-2 text-[#505050] text-sm">
                <li className="hover:text-blue-600 cursor-pointer">Mobile accessory</li>
                <li className="hover:text-blue-600 cursor-pointer">Electronics</li>
                <li className="hover:text-blue-600 cursor-pointer">Smartphones</li>
                <li className="hover:text-blue-600 cursor-pointer">Modern tech</li>
                <li className="text-blue-600 font-medium cursor-pointer">See all</li>
             </ul>
          </div>
          {/* More filters can be added here */}
        </aside>

        {/* Main Product Section */}
        <div className="flex-grow">
          {/* Top Bar */}
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-[#1C1C1C]">
              <span className="font-bold">{products.length}</span> items found {searchQuery && <span>for "<span className="font-bold">{searchQuery}</span>"</span>}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden h-10">
                <button 
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[#EFF2F4] text-[#1C1C1C]' : 'bg-white text-[#8B96A5] hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </button>
                <button 
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-3 border-l border-[#DEE2E7] flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#EFF2F4] text-[#1C1C1C]' : 'bg-white text-[#8B96A5] hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Applied Filters Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {appliedFilters.map(filter => (
              <span key={filter} className="bg-white border border-[#0D6EFD] text-[#1C1C1C] px-3 py-1 rounded-md text-sm flex items-center gap-2">
                {filter}
                <button onClick={() => setAppliedFilters(appliedFilters.filter(f => f !== filter))} className="text-[#8B96A5] hover:text-[#FA3434]">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </span>
            ))}
            <button className="text-blue-600 text-sm font-medium ml-2" onClick={() => setAppliedFilters([])}>Clear all filters</button>
          </div>

          {/* Product Grid / List Container */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product._id} className="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow group relative min-h-[405px]">
                  {/* Image Area */}
                  <Link to={`/product/${product._id}`} className="h-[230px] flex items-center justify-center p-6 border-b border-[#EFF2F4] relative cursor-pointer group">
                    <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                  
                  {/* Info Area */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#1C1C1C]">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-[#8B96A5] line-through font-medium">${product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      <button className="w-10 h-10 flex items-center justify-center border border-[#DEE2E7] rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                         <svg className="w-6 h-6 text-[#0D6EFD]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-[#FF9017]' : 'text-[#D5CDC5]'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                    </div>

                    <Link to={`/product/${product._id}`} className="text-[#606060] leading-6 line-clamp-2 hover:text-[#0D6EFD] transition-colors mb-2 flex-grow">
                      {product.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View Container */
            <div className="flex flex-col gap-4">
              {products.map(product => (
                <div key={product._id} className="bg-white border border-[#DEE2E7] rounded-lg p-6 flex flex-col md:flex-row gap-6 group hover:shadow-md transition-all relative">
                  {/* Image Area */}
                  <Link to={`/product/${product._id}`} className="w-full md:w-[210px] h-[210px] flex-shrink-0 flex items-center justify-center p-2 mx-auto md:mx-0 border border-[#EFF2F4] rounded-md overflow-hidden bg-[#F7F7F7]">
                    <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                  </Link>

                  {/* Info Area */}
                  <div className="flex-grow py-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#1C1C1C] font-medium leading-7 group-hover:text-[#0D6EFD] transition-colors cursor-pointer text-xl max-w-xl">
                        {product.name}
                      </h3>
                      <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#DEE2E7] rounded-lg shadow-sm hover:bg-gray-50 group/fav">
                        <svg className="w-6 h-6 text-[#0D6EFD] group-hover/fav:fill-[#0D6EFD]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-4 mt-1">
                      <span className="text-xl font-bold text-[#1C1C1C]">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-[#8B96A5] font-semibold line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-[#FF9017]' : 'text-[#D5CDC5]'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <span className="text-[#FF9017] text-sm font-medium">4.0</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DEE2E7]"></div>
                      <span className="text-[#8B96A5] text-sm">154 orders</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DEE2E7]"></div>
                      <span className="text-[#00B517] text-sm font-medium">Free Shipping</span>
                    </div>

                    <p className="text-[#505050] text-base leading-6 mb-5 line-clamp-2">{product.description}</p>
                    
                    <Link to={`/product/${product._id}`} className="text-[#0D6EFD] font-bold hover:underline mt-auto">
                      View details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 mb-12 flex justify-end">
            <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden">
              <button className="px-4 py-2 border-r border-[#DEE2E7] hover:bg-gray-50"><svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
              <button className="px-4 py-2 border-r border-[#DEE2E7] bg-[#EFF2F4] text-[#1C1C1C] font-bold">1</button>
              <button className="px-4 py-2 border-r border-[#DEE2E7] hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border-r border-[#DEE2E7] hover:bg-gray-50">3</button>
              <button className="px-4 py-2 hover:bg-gray-50"><svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section (Added) */}
      <section className="bg-[#EFF2F4] border-t border-[#DEE2E7] mt-10 py-10 md:py-14">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h3 className="text-xl md:text-2xl font-bold text-[#1C1C1C] mb-2">Subscribe on our newsletter</h3>
          <p className="text-[#606060] text-sm md:text-base mb-8 font-normal">Get daily news on upcoming offers from many suppliers all over the world</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
            <div className="relative flex-grow">
               <span className="absolute left-3 top-2.5 text-[#8B96A5]">@</span>
               <input type="email" placeholder="Email" className="w-full bg-white border border-[#DEE2E7] rounded-md px-10 py-2 outline-none focus:ring-1 focus:ring-[#0D6EFD] text-sm" />
            </div>
            <button className="bg-[#0D6EFD] text-white px-6 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors text-sm shadow-md">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListingPage;
