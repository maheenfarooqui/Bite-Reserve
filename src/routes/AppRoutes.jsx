import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Login from '../pages/Login';   // '../' yahan sahi hai
import Signup from '../pages/Signup';
import Reservation from '../pages/Reservation';
import Checkout from '../pages/Checkout';
import MyOrders from '../pages/MyOrders';
import OrderSuccess from '../pages/OrderSuccess';
import AdminDashboard from '../pages/AdminDashboard';
const AppRoutes = ({ user }) => {
  return (    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reserve" element={<Reservation />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/my-orders" element={<MyOrders user={user} />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/admin" element={<AdminDashboard />} />
  
      {/* Baaqi routes hum step by step add karenge */}
    </Routes>
  );
};

export default AppRoutes;