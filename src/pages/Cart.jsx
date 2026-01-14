import { useCart } from '../context/CartContext';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, totalPrice, clearCart, updateQuantity } = useCart();

  // Quantity kam karne ka logic
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Agar quantity 1 se zyada hai to aik kam kardo
      // Iske liye hum context mein aik aur function bhi bana sakte hain ya simple logic use karein
    } else {
      removeFromCart(item.id);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="bg-gray-100 p-8 rounded-full">
          <FiShoppingBag size={80} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-black text-gray-800">Your Cart is Empty!</h2>
        <p className="text-gray-500">order something from the menu.</p>
        <Link to="/menu" className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all">
          Order Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-10 text-foreground">Your <span className="text-primary">Basket</span></h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Items List */}
        <div className="lg:w-2/3 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
              
              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-primary font-bold">${item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
      {/* Decrement Button */}
      <button 
        onClick={() => updateQuantity(item.id, 'decrement')}
        className={`p-2 rounded-lg transition-colors ${item.quantity > 1 ? 'hover:bg-gray-200 text-gray-600' : 'text-gray-300 cursor-not-allowed'}`}
      >
        <FiMinus size={18} />
      </button>

      <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>

      {/* Increment Button */}
      <button 
        onClick={() => updateQuantity(item.id, 'increment')}
        className="p-2 bg-primary text-white rounded-lg shadow-md hover:bg-opacity-90 transition-all"
      >
        <FiPlus size={18} />
      </button>

      {/* Remove Button (Alag se side pe rakh sakte hain) */}
      <button 
        onClick={() => removeFromCart(item.id)} 
        className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
            </div>
          ))}

          <button onClick={clearCart} className="text-red-500 font-bold flex items-center gap-2 hover:underline ml-2">
            <FiTrash2 /> Clear Entire Cart
          </button>
        </div>

        {/* Right Side: Summary Card */}
        <div className="lg:w-1/3">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-28">
            <h3 className="text-2xl font-black mb-6 border-b pb-4">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Fee</span>
                <span className="text-green-500 font-bold">FREE</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-2xl font-black">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;