import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center">
                 <div className="w-6 h-6 border-4 border-white opacity-70"></div>
              </div>
              <span className="text-2xl font-black text-[#1C1C1C] tracking-tight">Brand</span>
            </div>
            <p className="text-[#505050] leading-relaxed mb-6 max-w-xs">
              Best information about the company gies here but now lorem ipsum is
            </p>
            <div className="flex gap-3">
              {/* Facebook */}
              <div className="w-8 h-8 bg-[#BDC4CD] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3B5998] transition-colors group">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.133v3.24h-1.918c-1.504 0-1.8.714-1.8 1.768v2.319h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </div>
              {/* Twitter */}
              <div className="w-8 h-8 bg-[#BDC4CD] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#1DA1F2] transition-colors group">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-1.002-2.178-1.755-3.667-1.755-2.81 0-5.088 2.289-5.088 5.107 0 .399.045.79.133 1.162-4.229-.212-7.977-2.239-10.486-5.317-.43.738-.676 1.597-.676 2.51 0 1.765.898 3.322 2.263 4.234-.833-.026-1.616-.255-2.3-.635v.064c0 2.466 1.754 4.522 4.082 4.99-.427.117-.877.179-1.341.179-.328 0-.647-.032-.957-.092.647 2.02 2.523 3.492 4.748 3.532-1.74 1.365-3.933 2.178-6.315 2.178-.41 0-.813-.024-1.209-.071 2.25 1.442 4.9 2.285 7.751 2.285 9.301 0 14.385-7.706 14.385-14.384 0-.219-.005-.438-.014-.656.988-.713 1.847-1.603 2.527-2.617z"/></svg>
              </div>
              {/* LinkedIn */}
              <div className="w-8 h-8 bg-[#BDC4CD] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#0077B5] transition-colors group">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.063-1.866-3.063-1.867 0-2.153 1.459-2.153 2.966v5.701h-3v-11h2.881v1.503h.041c.4-.759 1.38-1.56 2.839-1.56 3.039 0 3.601 2.001 3.601 4.603v6.394z"/></svg>
              </div>
              {/* Instagram */}
              <div className="w-8 h-8 bg-[#BDC4CD] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#E1306C] transition-colors group">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              {/* YouTube */}
              <div className="w-8 h-8 bg-[#BDC4CD] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF0000] transition-colors group">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.847.502 5.731a3.016 3.016 0 0 0 2.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.016 0 0 0 2.122-2.136C24 15.847 24 12 24 12s0-3.847-.502-5.731zM9.54 15.568V8.432L15.818 12l-6.278 3.568z"/></svg>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="whitespace-nowrap">
            <h4 className="text-[#1C1C1C] font-medium mb-6">About</h4>
            <ul className="space-y-3 text-[#8B96A5] text-sm">
              <li className="cursor-pointer hover:text-blue-600 transition-colors">About Us</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Find store</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Categories</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Blogs</li>
            </ul>
          </div>

          <div className="whitespace-nowrap">
            <h4 className="text-[#1C1C1C] font-medium mb-6">Partnership</h4>
            <ul className="space-y-3 text-[#8B96A5] text-sm">
              <li className="cursor-pointer hover:text-blue-600 transition-colors">About Us</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Find store</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Categories</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Blogs</li>
            </ul>
          </div>

          <div className="whitespace-nowrap">
            <h4 className="text-[#1C1C1C] font-medium mb-6">Information</h4>
            <ul className="space-y-3 text-[#8B96A5] text-sm">
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Help Center</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Money Refund</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Shipping</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Contact us</li>
            </ul>
          </div>

          <div className="whitespace-nowrap">
            <h4 className="text-[#1C1C1C] font-medium mb-6">For users</h4>
            <ul className="space-y-3 text-[#8B96A5] text-sm">
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Login</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Register</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Settings</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">My Orders</li>
            </ul>
          </div>

          {/* Get App Section */}
          <div className="flex flex-col whitespace-nowrap">
            <h4 className="text-[#1C1C1C] font-medium mb-6">Get app</h4>
            <div className="space-y-2.5">
              {/* App Store Button */}
              <button className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors w-[124px] h-[42px] border border-black shadow-sm">
                <svg className="w-5 h-5 mb-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-1.99.77-3.27.82-1.34.05-2.31-1.29-3.14-2.5-2.61-3.79-2.03-9.5 1-13.06 1.49-1.77 3.03-2.88 4.41-2.88 1.08 0 2.1.51 2.76.51.66 0 1.9-.62 3.22-.62 1.37 0 2.6.49 3.42 1.35-3.03 1.76-2.53 6.13.48 7.37-1.13 2.74-2.59 5.48-4.49 7.62zM15.42 2.5c-.53.58-1.12 1.12-1.8 1.12-.13 0-.25-.01-.38-.03.04-1.34.62-2.5 1.55-3.41.52-.51 1.14-.99 1.83-1.18.15-.04.31-.06.47-.06.02 1.35-.61 2.49-1.67 3.56z"/></svg>
                <div className="flex flex-col items-start leading-[1.1]">
                   <span className="text-[7px] uppercase font-medium">Download on the</span>
                   <span className="text-[13px] font-bold">App Store</span>
                </div>
              </button>
              {/* Google Play Button */}
              <button className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors w-[124px] h-[42px] border border-black shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.609 22.186c-.18.18-.329.13-.329-.125V1.939c0-.255.149-.305.329-.125zM14.632 12.84l2.84 2.84-12.78 7.32c-.31.18-.532.06-.532-.3V22.186l10.472-10.472v1.126zm.937-2.01l4.032 2.32c.31.18.31.48 0 .66l-4.032 2.32-3.125-3.125 3.125-3.175zm-1.782-1.782L3.28 1.814c0-.36.222-.48.532-.3l12.78 7.32-2.84 2.84v-1.126l.03-.02z"/></svg>
                <div className="flex flex-col items-start leading-[1.1]">
                   <span className="text-[7px] uppercase font-medium">Get it on</span>
                   <span className="text-[13px] font-bold">Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#EFF2F4] border-t border-[#DEE2E7] py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#606060] text-sm">© 2023 Ecommerce.</p>
          <div className="flex items-center gap-2 text-[#606060] cursor-pointer text-sm">
            <img src="https://flagcdn.com/w20/us.png" alt="US flag" className="w-5 h-auto shadow-sm" />
            <span>English</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
