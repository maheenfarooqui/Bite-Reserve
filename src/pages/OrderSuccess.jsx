import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const OrderSuccess = () => {
  return (
    <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
      <div className="bg-green-50 p-8 rounded-full mb-6 animate-bounce">
        <FiCheckCircle size={80} className="text-green-500" />
      </div>
      
      <h1 className="text-4xl font-black text-gray-800 mb-4">Order Placed! 🎉</h1>
      <p className="text-gray-500 max-w-md mb-10 text-lg">
        Your delicious meal is being prepared. You can track its status in your orders history.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/my-orders" 
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
        >
          View My Orders
        </Link>
        <Link 
          to="/" 
          className="bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;