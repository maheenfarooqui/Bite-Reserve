import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/orderService'; // 👈 Service import karein

const Checkout = ({ user }) => { // Props se user lein
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    const orderDetails = {
      userId: user?.uid || "Guest", // Agar login hai toh ID, warna Guest
      customerEmail: user?.email || "No Email",
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: cart,
      totalAmount: totalPrice,
    };

    const result = await placeOrder(orderDetails);

    if (result.success) {
      clearCart();
  navigate('/order-success'); 
} else {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Form Section */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black mb-8">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Full Name" required
                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="tel" placeholder="Phone Number" required
                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <textarea 
              placeholder="Full Delivery Address" required rows="4"
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            ></textarea>
            
            <button 
              type="submit" disabled={loading}
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl shadow-primary/20"
            >
              {loading ? "Sending Order..." : "Confirm & Place Order"}
            </button>
          </form>
        </div>

        {/* Summary Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50 h-fit">
          <h3 className="text-xl font-bold mb-6">Your Order</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} <b className="text-gray-900">x{item.quantity}</b></span>
                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-500">Total</span>
            <span className="text-3xl font-black text-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;