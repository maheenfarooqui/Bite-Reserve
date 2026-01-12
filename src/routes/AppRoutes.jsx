import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
// Abhi ke liye sirf main pages banate hain
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      {/* Baaqi routes hum step by step add karenge */}
    </Routes>
  );
};

export default AppRoutes;