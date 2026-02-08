import { useState, useEffect } from 'react';
import { db } from '../app/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const totalSales = orders.reduce((acc, curr) => acc + Number(curr.total || 0), 0);
const pendingOrders = orders.filter(o => o.status === 'Pending' || !o.status).length;
const totalBookings = bookings.length;

  useEffect(() => {
    // Real-time listener: Jaise hi koi order aayega, yahan khud show ho jayega!
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen pt-28">
      <h1 className="text-4xl font-black mb-8">Admin <span className="text-primary">Dashboard</span></h1>
{/* Stats Cards Section */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
  
  {/* Total Sales Card - Deep Dark Theme */}
  <div className="bg-[#1f1f1f] p-8 rounded-[2rem] text-white shadow-xl border border-gray-800 relative overflow-hidden group">
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#e63946] opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
    <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Total Revenue</p>
    <h2 className="text-4xl font-black mt-3 text-white">
      <span className="text-[#e63946] mr-1">$</span>
      {totalSales.toFixed(2)}
    </h2>
    <div className="mt-4 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      <p className="text-[10px] text-gray-500 font-medium uppercase">Live updates</p>
    </div>
  </div>

  {/* Active Orders Card - Red Theme */}
  <div className="bg-[#e63946] p-8 rounded-[2rem] text-white shadow-2xl shadow-[#e63946]/20 relative overflow-hidden group">
     <div className="absolute -right-4 -top-4 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
    <p className="text-red-100 font-bold text-xs uppercase tracking-[0.2em]">Pending Orders</p>
    <h2 className="text-5xl font-black mt-3 italic">{pendingOrders}</h2>
    <p className="text-xs mt-3 text-red-100/80 font-medium">Needs preparation</p>
  </div>

  {/* Total Bookings Card - Orange Theme */}
  <div className="bg-[#fc8c06] p-8 rounded-[2rem] text-white shadow-2xl shadow-[#fc8c06]/20 relative overflow-hidden group">
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-black opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
    <p className="text-orange-100 font-bold text-xs uppercase tracking-[0.2em]">Table Bookings</p>
    <h2 className="text-5xl font-black mt-3">{totalBookings}</h2>
    <p className="text-xs mt-3 text-orange-100/80 font-medium">Reserved spots</p>
  </div>

</div>
      <div className="grid grid-cols-1 gap-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-sm text-gray-400 font-mono">ID: {order.id.slice(0,8)}...</p>
              <h3 className="font-bold text-xl">{order.customerName || "Guest"}</h3>
              <p className="text-gray-500">{order.items.length} Items • Total: <span className="font-bold text-primary">${order.total}</span></p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {order.status || 'Pending'}
              </span>
              
              <select 
                className="bg-gray-100 p-2 rounded-xl text-sm outline-none border-none"
                onChange={(e) => updateStatus(order.id, e.target.value)}
                value={order.status || 'Pending'}
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;