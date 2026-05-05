import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const recommendedProducts = products.filter(p => p.category === 'Clothing').slice(0, 10);
  const electronicsProducts = products.filter(p => p.category === 'Electronics').slice(0, 8);
  const homeProducts = products.filter(p => p.category === 'Home').slice(0, 8);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-10">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-0 md:px-4 md:py-4">
        <div className="bg-white md:rounded-lg shadow-sm flex flex-col lg:flex-row overflow-hidden border-b md:border border-[#DEE2E7] h-auto lg:h-[400px]">
          {/* Sidebar Menu - Desktop Only */}
          <div className="hidden lg:block w-[250px] p-4 border-r border-[#DEE2E7]">
            <ul className="space-y-1 text-[#505050] text-sm">
              {['Automobiles', 'Clothes and wear', 'Home interiors', 'Computer and tech', 'Tools, equipments', 'Sports and outdoor', 'Animal and pets', 'Machinery tools'].map((m, i) => (
                <li key={i} className={`px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50 ${i === 0 ? 'bg-[#E5F1FF] text-[#1C1C1C] font-medium' : ''}`}>{m}</li>
              ))}
            </ul>
          </div>

          {/* Main Banner */}
          <div className="flex-grow p-0 md:p-4">
            <div className="h-[200px] md:h-full flex items-center p-6 md:p-12 relative overflow-hidden bg-cover bg-center bg-[#127FFF]" style={{backgroundImage: "url('/images/home-banner.png')"}}>
              <div className="z-10 relative">
                
                <button className="bg-white text-[#1C1C1C] font-bold py-1.5 md:py-2.5 px-4 md:px-8 rounded-lg text-sm md:text-base shadow-sm hover:bg-gray-50">Source now</button>
              </div>
            </div>
          </div>

          {/* User actions sidebar */}
          <div className="hidden xl:flex w-[220px] p-4 flex-col gap-3">
            <div className="bg-[#E3F0FF] p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-[#C7E1FF] rounded-full flex items-center justify-center border border-black/10 overflow-hidden">
                   <svg className="w-8 h-8 text-white mt-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div className="text-sm text-[#1C1C1C]">
                  <p>Hi, user</p>
                  <p>let's get started</p>
                </div>
              </div>
              <button className="bg-[#0D6EFD] text-white w-full py-2 rounded-lg text-sm font-bold mb-2 hover:bg-blue-600 transition-colors">Join now</button>
              <button className="bg-white text-[#0D6EFD] border border-[#DEE2E7] w-full py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">Log in</button>
            </div>
            <div className="bg-[#F38332] text-white p-4 rounded-lg text-sm h-[95px] flex items-center leading-tight">
              Get US $10 off with a new supplier
            </div>
            <div className="bg-[#55BDC4] text-white p-4 rounded-lg text-sm h-[95px] flex items-center leading-tight">
              Send quotes with supplier preferences
            </div>
          </div>
        </div>
      </section>

      {/* Deals & Offers */}
      <section className="max-w-7xl mx-auto px-4 mt-4 md:mt-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#DEE2E7] flex flex-col md:flex-row overflow-hidden">
          <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#DEE2E7] md:w-[280px] flex justify-between md:flex-col md:justify-center items-center md:items-start">
            <div className="flex flex-col">
              <h3 className="font-bold text-base md:text-xl">Deals and offers</h3>
              <p className="text-[#8B96A5] text-xs md:text-sm">Hygiene equipments</p>
            </div>
            <div className="flex gap-1">
              {['04', '13', '34', '56'].map((v, i) => (
                <div key={i} className="bg-[#606060] text-white rounded-md w-9 h-10 md:w-11 md:h-12 flex flex-col items-center justify-center">
                  <span className="font-bold text-xs md:text-sm">{v}</span>
                  <span className="text-[7px] md:text-[9px] uppercase">Days</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-grow flex overflow-x-auto no-scrollbar md:divide-x divide-[#DEE2E7]">
            {[
              {img:'/images/image35.png', n:'Smart watches', d:'-25%'}, 
              {img:'/images/7.png', n:'Laptops', d:'-15%'}, 
              {img:'/images/6.png', n:'GoPro', d:'-40%'}, 
              {img:'/images/image29.png', n:'Gadgets', d:'-25%'},
              {img:'/images/3.png', n:'Canon cameras', d:'-25%'}
            ].map((item, i) => (
              <div key={i} className="min-w-[120px] md:min-w-[179px] p-3 flex flex-col items-center justify-center text-center hover:bg-gray-50 shrink-0">
                <img src={item.img} alt={item.n} className="h-20 md:h-32 object-contain mb-2" />
                <p className="text-[#1C1C1C] text-[11px] md:text-sm mb-2 truncate w-full px-2">{item.n}</p>
                <span className="bg-[#FFE3E3] text-[#EB001B] text-[10px] font-bold px-2 py-0.5 rounded-full">{item.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories */}
      {[
        { title: 'Home and Outdoor', products: homeProducts, bg: '/images/image92.png' },
        { title: 'Consumer Electronics', products: electronicsProducts, bg: '/images/cous-elec-bg.png' }
      ].map((cat, idx) => (
        <section key={idx} className="max-w-7xl mx-auto px-4 mt-6 md:mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-[#DEE2E7] flex flex-col lg:flex-row h-auto overflow-hidden">
            <div className="w-full lg:w-[280px] p-6 bg-cover bg-center min-h-[100px] flex items-center lg:items-start lg:flex-col lg:justify-center relative" style={{backgroundImage: `url('${cat.bg}')`}}>
              <div className="absolute inset-0 bg-white/10"></div>
              <h3 className="text-base md:text-xl font-bold text-[#1C1C1C] z-10 w-40 leading-tight">{cat.title}</h3>
              <button className="hidden lg:block bg-white text-[#1C1C1C] font-bold py-2 px-4 rounded-md mt-4 text-sm z-10 hover:bg-gray-50">Source now</button>
            </div>
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {cat.products.map((p) => (
                <div key={p._id} className="border-t lg:border-t-0 border-l border-[#DEE2E7] p-3 md:p-4 flex items-center lg:flex-row lg:justify-between hover:bg-gray-50 cursor-pointer">
                  <div className="flex flex-col flex-grow">
                    <span className="text-[#1C1C1C] text-sm font-normal truncate max-w-[150px]">{p.name}</span>
                    <span className="text-[#8B96A5] text-xs mt-1">From USD {p.price}</span>
                  </div>
                  <img src={p.image} alt={p.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Recommended Items */}
      <section className="max-w-7xl mx-auto px-4 mt-6 md:mt-8">
        <h3 className="text-lg md:text-2xl font-bold mb-4">Recommended items</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {recommendedProducts.map((p) => (
            <Link key={p._id} to={`/product/${p._id}`} className="bg-white border border-[#DEE2E7] rounded-lg p-3 hover:shadow-md block">
              <div className="aspect-square flex items-center justify-center mb-3">
                <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="text-sm md:text-lg font-bold text-[#1C1C1C]">${p.price.toFixed(2)}</p>
              <p className="text-[#8B96A5] text-[11px] md:text-sm line-clamp-2 mt-1">{p.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Extra Services */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <h3 className="text-lg md:text-2xl font-bold mb-6">Our extra services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {img:'/images/o-e-s-1.png', n:'Source from Industry Hubs', icon:'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'},
              {img:'/images/o-e-s2.png', n:'Customize Your Products', icon:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1'},
              {img:'/images/o-e-s3.png', n:'Fast, Reliable Shipping', icon:'M12 19l9 2-9-18-9 18 9-2zm0 0v-8'},
              {img:'/images/o-e-s-4.png', n:'Product Monitoring & Inspection', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'}
            ].map((s,i) => (
              <div key={i} className="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden group cursor-pointer shadow-sm">
                <div className="h-32 relative">
                  <img src={s.img} alt="service" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-60" />
                  <div className="absolute -bottom-6 right-6 w-14 h-14 bg-[#D1E7FF] border-2 border-white rounded-full flex items-center justify-center shadow-md">
                     <svg className="w-6 h-6 text-[#1C1C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon} /></svg>
                  </div>
                </div>
                <div className="p-6 pt-10">
                  <p className="text-[#1C1C1C] font-bold leading-tight">{s.n}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Suppliers by Region */}
      <section className="max-w-7xl mx-auto px-4 mt-10 py-6 md:py-10">
        <h3 className="text-lg md:text-2xl font-bold mb-6">Suppliers by region</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-12">
          {[
            {f:'ae-icon.png', n:'Arabic Emirates', s:'shopname.ae'},
            {f:'australia-icon.png', n:'Australia', s:'shopname.au'},
            {f:'US-icon-flag.png', n:'United States', s:'shopname.us'},
            {f:'rs-icon.png', n:'Russia', s:'shopname.ru'},
            {f:'it-icon.png', n:'Italy', s:'shopname.it'},
            {f:'dk-icon.png', n:'Denmark', s:'shopname.dk'},
            {f:'fr-icon.png', n:'France', s:'shopname.fr'},
            {f:'cc-icon.png', n:'China', s:'shopname.cn'},
            {f:'gb-icon.png', n:'Great Britain', s:'shopname.co.uk'}
          ].map((r,i) => (
            <div key={i} className="flex items-center gap-3 cursor-pointer group">
              <img src={`/images/${r.f}`} alt={r.n} className="w-6 shadow-xs h-auto" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-[#1C1C1C] text-sm whitespace-nowrap font-normal group-hover:text-[#0D6EFD] transition-colors">{r.n}</span>
                <span className="text-[#8B96A5] text-xs font-normal">{r.s}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#EFF2F4] border-y border-[#DEE2E7] mt-10 py-10 md:py-14">
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

export default Home;
