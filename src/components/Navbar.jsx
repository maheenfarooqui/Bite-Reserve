import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
// Agar logo nahi hai abhi toh is line ko comment kar dein
// import logo from '../assets/logo.png'; 

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          {/* <img src={logo} alt="Logo" className="h-10" /> */}
          <span className="text-2xl font-bold text-foreground">
            Bite<span className="text-primary">Reserve</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
            <FiShoppingCart size={22} />
            <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
          <Link to="/reserve" className="bg-primary text-white px-5 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all">
            Book a Table
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;