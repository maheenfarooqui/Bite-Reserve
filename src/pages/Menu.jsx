import { useEffect, useState } from "react";
import { getMenuData } from "../services/menuService";
import FoodCard from "../features/menu/FoodCard";
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenu = async () => {
      console.log("Fetching started...");
      const data = await getMenuData();
      console.log("Data from Firebase:", data);
      setMenuItems(data);
      setLoading(false);
    };
    fetchMenu();
  }, []);

  if (loading)
    return (
      <div className="text-center p-20 text-2xl font-bold">
        Loading... 🍕
      </div>
    );
return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-display font-black mb-4">Our <span className="text-primary">Menu</span></h1>
        <p className="text-gray-500 italic">Fresh ingredients, better taste.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;