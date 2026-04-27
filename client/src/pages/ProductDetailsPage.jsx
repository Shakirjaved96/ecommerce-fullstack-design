import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../apiConfig';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Description');
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);

        // Fetch all products to filter related ones
        const allRes = await fetch(`${API_BASE_URL}/api/products`);
        const allData = await allRes.json();
        
        // Find items in same category
        let related = allData.filter(p => p.category === data.category && p._id !== data._id);
        
        // If less than 6 items, fill with other available items
        if (related.length < 6) {
          const others = allData.filter(p => p._id !== data._id && p.category !== data.category);
          related = [...related, ...others];
        }
        
        setRelatedProducts(related);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading product details...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  if (!product) return <div className="flex justify-center items-center h-screen">Product not found</div>;

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-5 text-[#8B96A5] text-sm flex items-center gap-2">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span>&gt;</span>
        <Link to="/products" className="hover:text-blue-600">{product.category}</Link>
        <span>&gt;</span>
        <span className="font-medium text-[#1C1C1C]">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* --- MAIN PRODUCT BLOCK --- */}
        <div className="bg-white border border-[#DEE2E7] rounded-lg p-6 flex flex-col lg:flex-row gap-10 shadow-sm">
          
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="w-full aspect-square border border-[#DEE2E7] rounded-lg p-6 flex items-center justify-center mb-4">
              <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex gap-2 justify-center">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="w-14 h-14 border border-[#DEE2E7] rounded p-1 cursor-pointer hover:border-gray-400">
                    <img src={product.image} alt="thumb" className="w-full h-full object-contain opacity-50" />
                 </div>
               ))}
            </div>
          </div>

          {/* Center: Essential Info */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 text-[#00B517] mb-2 font-medium">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              {product.stock > 0 ? 'In stock' : 'Out of stock'}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#1C1C1C] leading-tight mb-4">{product.name}</h1>

            {/* Rating and Reviews Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-[#FF9017]' : 'text-[#D5CDC5]'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <span className="text-[#FF9017] text-sm font-medium">4.5</span>
              <div className="w-1 h-1 rounded-full bg-[#8B96A5]"></div>
              
              <div className="flex items-center gap-1.5 text-[#8B96A5] text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                23 reviews
              </div>
              <div className="w-1 h-1 rounded-full bg-[#8B96A5]"></div>
              
              <div className="flex items-center gap-1.5 text-[#8B96A5] text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                154 sold
              </div>
            </div>

            {/* Price Tiers Row */}
            <div className="bg-[#FFF0DF] p-4 flex divide-x divide-[#BDC1C8] mb-6 rounded">
               <div className="flex-1 px-4 md:px-6">
                  <div className="text-base md:text-xl font-bold text-[#FA3434]">${product.price.toFixed(2)}</div>
                  <div className="text-[10px] md:text-xs text-[#606060] font-normal">50-100 pcs</div>
               </div>
               <div className="flex-1 px-4 md:px-6">
                  <div className="text-base md:text-xl font-bold text-[#1C1C1C]">${(product.price * 0.9).toFixed(2)}</div>
                  <div className="text-[10px] md:text-xs text-[#606060] font-normal">100-700 pcs</div>
               </div>
               <div className="flex-1 px-4 md:px-6">
                  <div className="text-base md:text-xl font-bold text-[#1C1C1C]">${(product.price * 0.8).toFixed(2)}</div>
                  <div className="text-[10px] md:text-xs text-[#606060] font-normal">700+ pcs</div>
               </div>
            </div>

            {/* Specifications Table */}
            <div className="space-y-3 text-sm mb-6 border-b border-[#E0E0E0] pb-6">
              <div className="flex">
                <span className="w-32 text-[#8B96A5] font-normal shrink-0">Price:</span>
                <span className="text-[#505050] font-normal">Negotiable</span>
              </div>
              <div className="border-t border-[#E0E0E0] my-2"></div>
              <div className="flex">
                <span className="w-32 text-[#8B96A5] font-normal shrink-0">Type:</span>
                <span className="text-[#505050] font-normal">Classic shoes</span>
              </div>
              <div className="flex">
                <span className="w-32 text-[#8B96A5] font-normal shrink-0">Material:</span>
                <span className="text-[#505050] font-normal">Plastic material</span>
              </div>
              <div className="flex">
                <span className="w-32 text-[#8B96A5] font-normal shrink-0">Design:</span>
                <span className="text-[#505050] font-normal">Modern Nice</span>
              </div>
              <div className="border-t border-[#E0E0E0] my-2"></div>
              <div className="flex">
                <span className="w-32 text-[#8B96A5] font-normal shrink-0">Customization:</span>
                <span className="text-[#505050] font-normal">Customized logo and design custom packages.</span>
              </div>
              <div className="flex">
                <span className="w-32 text-[#8B96A5] font-normal shrink-0">Protection:</span>
                <span className="text-[#505050] font-normal">Refund policy</span>
              </div>
              <div className="flex">
                <span className="w-32 text-[#8B96A5] font-normal shrink-0">Warranty:</span>
                <span className="text-[#505050] font-normal">2 years full warranty</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="bg-[#0D6EFD] text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Add to cart
              </button>
              <button className="p-3 border border-[#DEE2E7] rounded-lg text-[#0D6EFD] hover:bg-gray-50">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
            </div>
          </div>

          {/* Right: Supplier Card */}
          <div className="w-full lg:w-[280px] shrink-0">
             <div className="border border-[#DEE2E7] rounded-lg p-4 bg-white">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-12 h-12 bg-[#E0E7E9] rounded flex items-center justify-center font-bold text-[#8B96A5] text-xl">S</div>
                   <div className="text-sm">
                      <p className="font-medium text-[#1C1C1C]">Supplier</p>
                      <p className="text-[#8B96A5]">Guanjzhou, China</p>
                   </div>
                </div>
                <div className="space-y-2.5 pt-3 border-t border-[#DEE2E7] text-sm text-[#8B96A5] mb-5">
                   <div className="flex items-center gap-3"><img src="https://flagcdn.com/w20/de.png" alt="DE" className="w-5" /> Germany, Berlin</div>
                   <div className="flex items-center gap-3"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> Verified Seller</div>
                   <div className="flex items-center gap-3"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.09.66-.14 1.32-.14 2 0 .68.05 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.65 2.49-2.93 4.33-3.56-.6 1.11-1.06 2.31-1.38 3.56zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.09-.66.14-1.32.14-2 0-.68-.05-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg> Worldwide shipping</div>
                </div>
                <button className="w-full bg-[#0D6EFD] text-white py-2 rounded font-bold mb-2 shadow-sm shadow-blue-100">Send inquiry</button>
                <button className="w-full bg-white border border-[#DEE2E7] text-[#0D6EFD] py-2 rounded font-bold">Seller's profile</button>
             </div>
             <button className="w-full mt-4 flex items-center justify-center gap-2 text-[#0D6EFD] font-bold py-2"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> Save for later</button>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-grow bg-white border border-[#DEE2E7] rounded-lg shadow-sm">
            <div className="border-b border-[#DEE2E7] flex overflow-x-auto no-scrollbar">
              {['Description', 'Reviews', 'Shipping', 'About seller'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-all relative ${activeTab === tab ? 'text-[#0D6EFD]' : 'text-[#8B96A5] hover:text-[#505050]'}`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0D6EFD]"></div>}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8">
              <p className="text-[#505050] leading-7 mb-8 font-normal">{product.description}</p>
              
              <div className="grid grid-cols-1 border border-[#E0E7E9] rounded-sm overflow-hidden mb-8 max-w-xl">
                {Object.entries(product.details || {
                  "Model": "#8786867",
                  "Type": "Classic shoes",
                  "Material": "Plastic material",
                  "Design": "Modern Nice",
                  "Customization": "Customized logo and design custom packages",
                  "Protection": "Refund Policy",
                  "Warranty": "2 years full warranty"
                }).map(([key, val], idx) => (
                  <div key={key} className={`flex border-b border-[#E0E7E9] last:border-b-0`}>
                    <div className="w-40 md:w-48 bg-[#EFF2F4] px-4 py-3 text-[#505050] font-normal border-r border-[#E0E7E9]">{key}</div>
                    <div className="flex-grow px-4 py-3 text-[#505050] font-normal">{val}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3.5">
                {(product.features || [
                  "Two Thunderbolt 3 ports (USB-C) for high-speed charging",
                  "Advanced cooling system with improved airflow",
                  "High-dynamic-range (HDR) Retina display",
                  "Studio-quality three-mic array with high signal-to-noise ratio"
                ]).map((f, i) => (
                  <div key={i} className="flex items-center gap-3.5 text-[#505050] font-normal text-sm">
                    <svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* You may like */}
          <aside className="w-full lg:w-[280px] shrink-0 bg-white border border-[#DEE2E7] rounded-lg p-4 h-fit shadow-sm">
            <h4 className="font-bold text-[#1C1C1C] mb-6">You may like</h4>
            <div className="space-y-6">
              {relatedProducts.slice(0, 5).map((p) => (
                <Link key={p._id} to={`/product/${p._id}`} className="flex gap-4 group">
                  <div className="w-20 h-20 border border-[#DEE2E7] rounded p-1 flex-shrink-0 flex items-center justify-center bg-white"><img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain mix-blend-multiply" /></div>
                  <div className="py-0.5"><p className="text-[#1C1C1C] text-sm leading-snug line-clamp-2 group-hover:text-[#0D6EFD] font-normal">{p.name}</p><p className="text-[#8B96A5] text-sm mt-1.5 font-normal">${p.price.toFixed(2)}</p></div>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* --- RELATED PRODUCTS GRID (6 Items) --- */}
        <div className="mt-8 bg-white border border-[#DEE2E7] rounded-lg p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-[#1C1C1C] mb-6">Related products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {relatedProducts.slice(0, 6).map((p) => (
              <Link key={p._id} to={`/product/${p._id}`} className="cursor-pointer group flex flex-col">
                <div className="bg-[#EEEEEE] rounded-lg aspect-square p-4 flex items-center justify-center mb-3 relative overflow-hidden">
                  <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-[#505050] text-sm line-clamp-2 leading-tight mb-1.5 font-normal group-hover:text-[#0D6EFD]">{p.name}</p>
                <p className="text-[#8B96A5] text-sm font-normal">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* --- SUPER DISCOUNT BANNER --- */}
        <div className="bg-[#005ADE] rounded-lg h-auto lg:h-[120px] flex flex-col lg:flex-row overflow-hidden shadow-md mb-12">
          <div className="bg-[#237CFF] px-8 lg:px-12 py-8 lg:py-0 flex flex-col justify-center flex-grow">
            <h3 className="text-white text-2xl font-bold leading-tight">Super discount on your first order more than 100USD</h3>
            <p className="text-white opacity-70 text-base mt-2 font-normal truncate">Have you ever finally just write dummy info and right side the shop now button</p>
          </div>
          <div className="px-8 lg:px-12 py-6 lg:py-0 flex items-center justify-center bg-[#005ADE]">
            <button className="bg-[#FF9017] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105">Shop now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
