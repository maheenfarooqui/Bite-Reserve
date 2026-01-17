import { useEffect, useState } from "react";
import { getMenuData } from "../services/menuService";
import FoodCard from "../features/menu/FoodCard";
import { useNavigate, useSearchParams } from 'react-router-dom';
const Menu = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFromUrl = searchParams.get('cat');
  const [menuItems, setMenuItems] = useState([]); // Original Data
  const [filteredItems, setFilteredItems] = useState([]); // Display Data
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Burgers", "Pizza", "Drinks", "Desserts"];

useEffect(() => {
  const fetchMenu = async () => {
    try {
      setLoading(true); // Fetch shuru hone se pehle loading true karein
      const data = await getMenuData();
      setMenuItems(data);

      // 🔍 URL se category check karein
      const catParam = searchParams.get('cat'); 

      if (catParam && catParam !== "All") {
        // Agar URL mein kuch hai, toh filter karein
        const filtered = data.filter(item => 
          item.category?.toLowerCase() === catParam.toLowerCase()
        );
        setFilteredItems(filtered);
        setActiveCategory(catParam);
      } else {
        // Warna saara data dikhayein
        setFilteredItems(data);
        setActiveCategory("All");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setLoading(false);
    }
  };

  fetchMenu();
}, [searchParams]);

  // ✅ Filter function
 const filterCategory = (category) => {
    setActiveCategory(category);
    
    // 👇 Ye line URL ko update karegi bina page reload kiye
    if (category === "All") {
      navigate('/menu');
    } else {
      navigate(`/menu?cat=${category}`);
    }

    // Filter logic
    if (category === "All") {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter((item) => 
        item.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredItems(filtered);
    }
  };
  return (
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="text-center mb-12">
      <h1 className="text-5xl font-display font-black mb-4">
        Our <span className="text-primary">Menu</span>
      </h1>
      <p className="text-gray-500 italic">Fresh ingredients, better taste.</p>

      {/* --- YAHAN CATEGORY BUTTONS ADD KIYE HAIN --- */}
      {/* Manual array ki jagah variable use karein */}
<div className="flex justify-center gap-3 mt-10 flex-wrap">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => filterCategory(cat)}
      className={`px-8 py-2 rounded-full font-bold transition-all duration-300 ${
        activeCategory.toLowerCase() === cat.toLowerCase()
          ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      {cat}
    </button>
  ))}
</div>
    </div>

    {/* --- YAHAN menuItems KI JAGAH filteredItems USE KIYA HAI --- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))
      ) : (
        <div className="col-span-full text-center py-20">
          <p className="text-xl text-gray-400">No items found.🍕</p>
        </div>
      )}
    </div>
  </div>
);
};

export default Menu;