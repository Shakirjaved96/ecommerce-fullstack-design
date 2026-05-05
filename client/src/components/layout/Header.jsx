import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../apiConfig';

const Header = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [keyword, setKeyword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${keyword}`);
    } else {
      navigate('/products');
    }
  };

  const categories = [
    'Automobiles', 'Clothes and wear', 'Home interiors', 'Computer and tech', 
    'Tools, equipments', 'Sports and outdoor', 'Animal and pets', 'Machinery tools'
  ];

  return (
    <>
      <header className={`bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-3 md:px-4 h-14 md:h-20 flex items-center justify-between gap-3 md:gap-8">
          
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-1 text-gray-600 hover:bg-gray-100 rounded-md">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-8 h-8 md:w-11 md:h-11 bg-[#0D6EFD] rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                 <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                 </svg>
              </div>
              <span className="text-base md:text-2xl font-black text-[#1C1C1C] tracking-tight">Brand</span>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="flex-grow max-w-2xl hidden md:flex border-2 border-[#0D6EFD] rounded-lg overflow-hidden h-11">
            <input type="text" placeholder="Search" className="flex-grow px-4 outline-none text-gray-700" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <select className="border-l border-[#DEE2E7] px-4 outline-none text-gray-700 bg-white cursor-pointer"><option>All category</option></select>
            <button type="submit" className="bg-[#0D6EFD] text-white px-6 font-bold hover:bg-blue-600">Search</button>
          </form>

          <div className="flex items-center gap-3 md:gap-5">
            {user ? (
              <div className="flex flex-col items-center cursor-pointer text-[#8B96A5] group relative hover:text-[#0D6EFD]">
                <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="hidden md:block text-[11px] mt-0.5 max-w-[80px] truncate font-medium">{user.name}</span>
                <div className="absolute top-full right-0 mt-2 hidden md:group-hover:block bg-white border border-gray-200 shadow-lg rounded-md p-2 z-50 min-w-[120px]">
                   {user.isAdmin && <Link to="/admin" className="block p-2 text-sm font-bold text-blue-600 hover:bg-gray-50 rounded">Admin Panel</Link>}
                   <button onClick={() => { logout(); navigate('/'); }} className="w-full text-left p-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex flex-col items-center cursor-pointer text-[#8B96A5] hover:text-[#0D6EFD]">
                <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="hidden md:block text-[11px] mt-0.5 font-medium">Profile</span>
              </Link>
            )}
            <div className="hidden md:flex flex-col items-center cursor-pointer text-[#8B96A5] hover:text-[#0D6EFD]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span className="text-[11px] mt-0.5 font-medium">Message</span>
            </div>
            <div className="hidden md:flex flex-col items-center cursor-pointer text-[#8B96A5] hover:text-[#0D6EFD]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <span className="text-[11px] mt-0.5 font-medium">Orders</span>
            </div>
            <Link to="/cart" className="flex flex-col items-center text-[#8B96A5] hover:text-[#0D6EFD] relative transition-colors">
              <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="hidden md:block text-[11px] mt-0.5 font-normal">My cart</span>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#0D6EFD] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-3 pb-2">
           <form onSubmit={handleSearch} className="flex border border-[#DEE2E7] rounded-md overflow-hidden h-9 bg-[#F7FAFC]">
              <span className="flex items-center pl-2 text-[#8B96A5]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></span>
              <input type="text" placeholder="Search" className="flex-grow px-2 outline-none text-xs bg-transparent" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
           </form>
        </div>

        {/* Desktop Bottom Navbar */}
        <div className="border-t border-gray-200 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 h-11 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 cursor-pointer font-medium text-[#1C1C1C] hover:text-[#0D6EFD] text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                All category
              </div>
              <Link to="/products" className="text-[#1C1C1C] font-medium text-sm hover:text-[#0D6EFD]">Hot offers</Link>
              <span className="text-[#1C1C1C] font-medium text-sm cursor-pointer hover:text-[#0D6EFD]">Gift boxes</span>
              <span className="text-[#1C1C1C] font-medium text-sm cursor-pointer hover:text-[#0D6EFD]">Projects</span>
              <span className="text-[#1C1C1C] font-medium text-sm cursor-pointer hover:text-[#0D6EFD]">Menu item</span>
              <div className="flex items-center gap-1 cursor-pointer font-medium text-[#1C1C1C] text-sm hover:text-[#0D6EFD]">Help <svg className="w-3 h-3 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></div>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-1.5 cursor-pointer font-medium text-[#1C1C1C] text-sm hover:text-[#0D6EFD]">
                 English, USD <svg className="w-3 h-3 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
               </div>
               <div className="flex items-center gap-1.5 cursor-pointer font-medium text-[#1C1C1C] text-sm hover:text-[#0D6EFD]">
                 Ship to <img src="/images/it-icon.png" alt="flag" className="w-4 h-3" /> <svg className="w-3 h-3 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
               </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE SIDEBAR --- */}
        <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-white transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col shadow-2xl overflow-y-auto`}>
            
            {/* Header Section */}
            <div className="p-5 bg-[#EFF2F4] relative">
               <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
               <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white mb-3">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
               </div>
               {user ? (
                 <div className="text-[#1C1C1C]">
                   <p className="font-medium">Hi, {user.name.split(' ')[0]}</p>
                   <button onClick={() => { logout(); setIsMobileMenuOpen(false); navigate('/'); }} className="text-blue-600 text-xs font-medium">Logout</button>
                 </div>
               ) : (
                 <div className="text-[#1C1C1C] font-medium text-sm">
                   <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link> | <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                 </div>
               )}
            </div>

            {/* Primary Navigation */}
            <div className="py-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#1C1C1C]">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span>Home</span>
              </Link>
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#1C1C1C]">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16M4 6h.01M4 12h.01M4 18h.01" /></svg>
                <span>Categories</span>
              </Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#1C1C1C]">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <span>Favorites</span>
              </Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#1C1C1C]">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                <span>My orders</span>
              </Link>
            </div>

            <div className="border-t border-[#DEE2E7] mx-5 my-1"></div>

            {/* Secondary Navigation */}
            <div className="py-2">
              <div className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#1C1C1C] cursor-pointer">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                <span className="text-sm">English | USD</span>
              </div>
              <div className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#1C1C1C] cursor-pointer">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-sm">Contact us</span>
              </div>
              <div className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#1C1C1C] cursor-pointer">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                <span className="text-sm">About</span>
              </div>
            </div>

            <div className="border-t border-[#DEE2E7] mx-5 my-1"></div>

            {/* Footer Links */}
            <div className="py-4 px-5 flex flex-col gap-4">
              <span className="text-sm text-[#1C1C1C] cursor-pointer ml-10">User agreement</span>
              <span className="text-sm text-[#1C1C1C] cursor-pointer ml-10">Partnership</span>
              <span className="text-sm text-[#1C1C1C] cursor-pointer ml-10">Privacy policy</span>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer */}
      <div className="h-24 md:h-32"></div>
    </>
  );
};

export default Header;
