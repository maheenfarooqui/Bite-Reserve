import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-1">
        <h2 className="text-2xl font-black text-primary mb-6">
          {/* Bite<span className="text-secondary">Reserve</span> */}
          <span className="text-2xl font-bold text-foreground">
            Bite<span className="text-primary">Reserve</span>
          </span>
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Bringing the best flavors of the city right to your doorstep. Experience the magic of taste.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6">Quick Links</h4>
        <ul className="space-y-4 text-gray-500 text-sm">
          <li>Menu</li>
          <li>Reservation</li>
          <li>My Orders</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Contact</h4>
        <ul className="space-y-4 text-gray-500 text-sm">
          <li>bitereserve.com</li>
          <li>+92 300 1234567</li>
          <li>Karachi, Pakistan</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Follow Us</h4>
        <div className="flex gap-4">
          <FiInstagram size={24} className="text-gray-400 hover:text-primary cursor-pointer" />
          <FiFacebook size={24} className="text-gray-400 hover:text-primary cursor-pointer" />
          <FiTwitter size={24} className="text-gray-400 hover:text-primary cursor-pointer" />
        </div>
      </div>
    </div>
    <div className="text-center text-gray-400 text-xs border-t pt-8">
      © 2026 BiteReserve. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;