import { useState, useEffect } from 'react';
import { db } from '../app/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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