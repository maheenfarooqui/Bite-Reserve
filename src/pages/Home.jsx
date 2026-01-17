import { Link } from 'react-router-dom';
import Hero from '../components/Home/Hero';
import Categories from '../components/Home/Categories';
import Promo from '../components/Home/Promo';
import HotSelling from '../components/Home/HotSelling';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <HotSelling />
    
      <Promo />
    </div>
    
  );
};

export default Home;