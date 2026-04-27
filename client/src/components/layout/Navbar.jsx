import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-white shadow-md w-full z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-black text-gray-900 tracking-tighter">
              SHOP<span className="text-blue-600">BRAND</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 font-bold hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/products" className="text-gray-600 font-bold hover:text-blue-600 transition-colors">Products</Link>
            <Link to="/cart" className="relative group">
              <span className="text-gray-600 font-bold group-hover:text-blue-600 transition-colors">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user && user.isAdmin && (
              <Link to="/admin" className="text-blue-600 font-bold hover:text-blue-800 transition-colors">Dashboard</Link>
            )}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-bold">Hi, {user.name.split(' ')[0]}</span>
                <button 
                  onClick={logout}
                  className="bg-gray-100 text-gray-900 px-6 py-2.5 rounded-full font-bold hover:bg-gray-200 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-gray-800 transition-all transform hover:scale-105">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-black focus:outline-none p-2"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-800 hover:text-blue-600">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-800 hover:text-blue-600">Products</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-bold text-gray-800 hover:text-blue-600">
            Cart
            {cartCount > 0 && <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">{cartCount}</span>}
          </Link>
          {user ? (
            <>
              <div className="block text-lg font-bold text-gray-800 border-t pt-4">Hi, {user.name}</div>
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="block w-full text-center bg-gray-100 text-gray-900 py-3 rounded-xl font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-bold">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
