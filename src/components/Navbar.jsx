import { Link } from "react-router-dom";
import { useState } from "react";
import { FiShoppingCart, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5"; // Check karein ye install hai ya nahi
import { logOut } from "../services/authService";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Context se dono cheezein ek saath nikaalein
  const { cart, toggleCart } = useCart();

  // ✅ Total count calculate karne ke liye
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-50 w-auto object-contain" />
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/menu" className="hover:text-primary transition-colors">
            Menu
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* ✅ Cart Button Fixed */}
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full relative text-gray-600 hover:text-primary transition-all"
          >
            <IoCartOutline size={26} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/reserve"
            className="hidden sm:block bg-primary text-white px-5 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all"
          >
            Book a Table
          </Link>

          {/* User Icon & Dropdown Container */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-all ${
                user
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <FiUser size={24} />
            </button>

            {/* Dropdown Menu Card */}
            {isOpen && (
              <div
                className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[60]"
                onMouseLeave={() => setIsOpen(false)}
              >
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-xs text-gray-400">Logged in as</p>
                      <p className="text-sm font-bold truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logOut();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <FiLogIn className="text-primary" /> Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <FiUser className="text-primary" /> Create Account
                    </Link>
                    <Link 
  to="/my-orders" 
  onClick={() => setIsOpen(false)}
  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
>
  📦 My Orders
</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
