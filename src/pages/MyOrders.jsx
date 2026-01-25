import { useEffect, useState } from 'react';
import { getUserOrders } from '../services/orderService';

const MyOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log("Logged in user ID:", user.uid);
      getUserOrders(user.uid).then(data => {
        setOrders(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <div className="pt-32 text-center font-bold">Loading your history... 🕒</div>;

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-6">
      <h1 className="text-4xl font-black mb-10 text-center">My <span className="text-primary">Orders</span> 📦</h1>
      
      {orders.length === 0 ? (
        <p className="text-center text-gray-400">You haven't ordered anything yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
              <div>
                <p className="text-xs text-gray-400 font-mono mb-2 uppercase tracking-widest">Order #{order.id.slice(0, 8)}</p>
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm font-bold text-gray-700">{item.name} <span className="text-primary">x{item.quantity}</span></p>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:items-end justify-between">
                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                }`}>
                  {order.status}
                </span>
                <p className="text-2xl font-black mt-4">{order.total || "0.00"}$</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;