import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Burgers', icon: '🍔' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Drinks', icon: '🥤' },
  { name: 'Desserts', icon: '🍰' },
];

const Categories = () => {
  const navigate = useNavigate(); // 👈 Navigation ko activate kiya

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              // 👇 Click karne par ye Menu page par "cat" parameter ke sath le jayega
              onClick={() => navigate(`/menu?cat=${cat.name}`)}
              className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                {cat.icon}
              </div>
              <span className="font-bold text-gray-600">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;