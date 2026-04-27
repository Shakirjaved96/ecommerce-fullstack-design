import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, clearCart, addToCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = subtotal > 100 ? 60.00 : 0;
  const tax = subtotal > 0 ? 14.00 : 0;
  const total = subtotal - discount + tax;

  const handleCheckout = () => {
    alert('Thank you for your order! Your purchase was successful.');
    clearCart();
  };

  // Saved for later items (Restored with real photos)
  const savedItems = [
    { _id: 's1', name: 'GoPro HERO6 4K Action Camera - Black Edition', price: 99.50, image: '/images/6.png' },
    { _id: 's2', name: 'Smartwatch Pro with Heart Rate Monitor', price: 19.00, image: '/images/image35.png' },
    { _id: 's3', name: 'High-Performance Laptop with 16GB RAM', price: 890.00, image: '/images/7.png' },
    { _id: 's4', name: 'Noise-Cancelling Wireless Headphones', price: 10.00, image: '/images/image29.png' }
  ];

  if (cartItems.length === 0 && savedItems.length === 0) {
    return (
      <div className="bg-[#F7FAFC] min-h-screen py-20 text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold text-[#1C1C1C] mb-6">Your cart is empty</h2>
        <Link to="/products" className="bg-[#0D6EFD] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 shadow-md">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <h3 className="text-2xl font-bold text-[#1C1C1C] mb-8">My cart ({cartItems.length})</h3>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- LEFT: CART ITEMS --- */}
          <div className="flex-grow">
            {cartItems.length > 0 ? (
              <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 shadow-sm mb-6">
                <div className="divide-y divide-[#DEE2E7]">
                  {cartItems.map((item) => (
                    <div key={item._id} className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-[80px] h-[80px] border border-[#E0E0E0] rounded-md bg-[#F7F7F7] flex items-center justify-center p-2 mx-auto md:mx-0">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1.5">
                          <h4 className="text-[#1C1C1C] font-medium leading-tight max-w-md">{item.name}</h4>
                          <span className="text-[#1C1C1C] font-medium text-right whitespace-nowrap ml-4">${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                        <p className="text-[#8B96A5] text-sm mb-5">Size: medium, Color: blue, Material: Plastic</p>
                        <div className="flex items-center gap-3">
                          <button onClick={() => removeFromCart(item._id)} className="border border-[#DEE2E7] rounded-md px-3 py-1.5 text-[#FA3434] text-xs font-bold hover:bg-red-50 transition-colors">Remove</button>
                          <button className="border border-[#DEE2E7] rounded-md px-3 py-1.5 text-[#0D6EFD] text-xs font-bold hover:bg-blue-50 transition-colors">Save for later</button>
                        </div>
                      </div>
                      <div className="w-full md:w-32 flex-shrink-0">
                        <div className="relative border border-[#DEE2E7] rounded-md h-10 px-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 bg-white">
                          <select value={item.qty} onChange={(e) => updateQty(item._id, Number(e.target.value))} className="w-full h-full absolute inset-0 opacity-0 cursor-pointer">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(q => <option key={q} value={q}>{q}</option>)}
                          </select>
                          <span className="text-[#1C1C1C] text-sm">Qty: {item.qty}</span>
                          <svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#DEE2E7] rounded-lg p-10 text-center mb-6">
                <p className="text-[#8B96A5]">Your active cart is empty.</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <Link to="/products" className="bg-[#0D6EFD] text-white px-6 py-2.5 rounded-lg font-bold inline-flex items-center gap-2 hover:bg-blue-600 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to store
              </Link>
              <button onClick={() => clearCart()} className="border border-[#DEE2E7] bg-white text-[#0D6EFD] px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-colors">Remove all</button>
            </div>

            {/* Feature Highlights Row (NEW) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-6">
              <div className="flex items-start gap-3.5">
                 <div className="w-12 h-12 rounded-full bg-[#E0E0E0] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                 </div>
                 <div>
                    <h5 className="text-[#1C1C1C] font-normal text-base">Secure payment</h5>
                    <p className="text-[#A9ACB0] text-sm leading-tight mt-1">Have you ever finally just</p>
                 </div>
              </div>
              <div className="flex items-start gap-3.5">
                 <div className="w-12 h-12 rounded-full bg-[#E0E0E0] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                 </div>
                 <div>
                    <h5 className="text-[#1C1C1C] font-normal text-base">Customer support</h5>
                    <p className="text-[#A9ACB0] text-sm leading-tight mt-1">Have you ever finally just</p>
                 </div>
              </div>
              <div className="flex items-start gap-3.5">
                 <div className="w-12 h-12 rounded-full bg-[#E0E0E0] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                 </div>
                 <div>
                    <h5 className="text-[#1C1C1C] font-normal text-base">Free delivery</h5>
                    <p className="text-[#A9ACB0] text-sm leading-tight mt-1">Have you ever finally just</p>
                 </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: SUMMARY --- */}
          <aside className="w-full lg:w-[280px] flex-shrink-0">
            <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 shadow-sm mb-4">
              <p className="text-[#505050] text-sm mb-4">Have a coupon?</p>
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden">
                <input type="text" placeholder="Add coupon" className="flex-grow px-3 py-2 outline-none text-sm w-full" />
                <button className="bg-white border-l border-[#DEE2E7] px-4 text-[#0D6EFD] font-bold text-sm">Apply</button>
              </div>
            </div>
            <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 shadow-sm">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[#505050] text-sm"><span>Subtotal:</span><span className="font-medium text-[#1C1C1C]">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#505050] text-sm"><span>Discount:</span><span className="text-[#FA3434] font-medium">- ${discount.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#505050] text-sm"><span>Tax:</span><span className="text-[#00B517] font-medium">+ ${tax.toFixed(2)}</span></div>
                <div className="border-t border-[#E4E4E4] pt-4 flex justify-between items-end"><span className="text-[#1C1C1C] font-bold">Total:</span><span className="text-[#1C1C1C] font-bold text-xl">${total.toFixed(2)}</span></div>
              </div>
              <button onClick={handleCheckout} className="w-full bg-[#00B517] text-white py-3.5 rounded-lg font-bold text-lg hover:bg-green-600 transition-all active:scale-95">Checkout</button>

              {/* Payment Methods */}
              <div className="flex justify-center gap-2 mt-5">
                {[
                  { name: 'American Express', img: 'https://img.icons8.com/color/34/000000/amex.png' },
                  { name: 'Visa', img: 'https://img.icons8.com/color/34/000000/visa.png' },
                  { name: 'Apple Pay', img: 'https://img.icons8.com/color/34/000000/apple-pay.png' },
                  { name: 'Google Pay', img: 'https://img.icons8.com/color/34/000000/google-pay.png' },
                  { name: 'MasterCard', img: 'https://img.icons8.com/color/34/000000/mastercard.png' }
                ].map((pay, i) => (
                  <div key={i} className="w-[34px] h-[22px] border border-[#EEEEEE] rounded-sm bg-white flex items-center justify-center overflow-hidden shadow-xs">
                    <img src={pay.img} alt={pay.name} className="max-w-full max-h-full object-contain" title={pay.name} />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* --- SAVED FOR LATER SECTION --- */}
        <div className="mt-8 bg-white border border-[#DEE2E7] rounded-lg p-6 shadow-sm mb-10">
          <h4 className="text-xl font-bold text-[#1C1C1C] mb-7">Saved for later</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {savedItems.map((item) => (
              <div key={item._id} className="flex flex-col group">
                <div className="bg-[#EEEEEE] rounded-lg aspect-square flex items-center justify-center p-6 relative overflow-hidden mb-3.5 border border-[#E0E0E0]">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-[#1C1C1C] font-bold text-lg mb-1">${item.price.toFixed(2)}</p>
                <p className="text-[#606060] text-sm leading-snug line-clamp-2 mb-4 font-normal">{item.name}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="border border-[#DEE2E7] bg-white rounded-md py-2.5 flex items-center justify-center gap-2 text-[#0D6EFD] font-bold text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  Move to cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM CTA BANNER --- */}
        <div className="bg-[#005ADE] rounded-lg h-auto lg:h-[120px] flex flex-col lg:flex-row overflow-hidden shadow-md mb-8">
          <div className="bg-[#237CFF] px-8 lg:px-12 py-8 lg:py-0 flex flex-col justify-center flex-grow">
            <h3 className="text-white text-2xl font-bold leading-tight">Super discount on your first order more than 100USD</h3>
            <p className="text-white opacity-70 text-base mt-2">Free shipping, returns and extra cashback for first 100 users</p>
          </div>
          <div className="px-8 lg:px-12 py-6 lg:py-0 flex items-center justify-center bg-[#005ADE]">
            <button className="bg-[#FF9017] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105">Shop now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
