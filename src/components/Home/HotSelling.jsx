import { useEffect, useState } from "react";
import { getMenuData } from "../../services/menuService";
import FoodCard from "../../features/menu/FoodCard";
import { Link } from "react-router-dom";

const HotSelling = () => {
  const [hotItems, setHotItems] = useState([]);

  useEffect(() => {
    const fetchHotItems = async () => {
      const data = await getMenuData();
      // Hum shuru ke 3 items le rahe hain (ya aap koi 'featured' property bhi check kar sakti hain)
      setHotItems(data.slice(0, 3)); 
    };
    fetchHotItems();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-display font-black">
              Our <span className="text-primary">Hot Selling</span> Items 🔥
            </h2>
            <p className="text-gray-500 mt-2">Most loved dishes by our community</p>
          </div>
          <Link to="/menu" className="text-primary font-bold hover:underline">
            View Full Menu →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotSelling;