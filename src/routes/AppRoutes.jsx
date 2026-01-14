import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Login from '../pages/Login';   // '../' yahan sahi hai
import Signup from '../pages/Signup';
import Reservation from '../pages/Reservation';
import Cart from '../pages/Cart';
// Abhi ke liye sirf main pages banate hain
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reserve" element={<Reservation />} />
      <Route path="/cart" element={<Cart />} />
      {/* Baaqi routes hum step by step add karenge */}
    </Routes>
  );
};

export default AppRoutes;