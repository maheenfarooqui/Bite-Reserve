import { useCart } from '../../context/CartContext';
const FoodCard = ({ item }) => {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-3xl shadow-lg h-full overflow-hidden border border-gray-100 hover:scale-105 transition-all duration-300">
      <div className="p-4 h-52">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-2xl shadow-sm" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
          <span className="text-primary font-bold text-lg">${item.price}</span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
        <button onClick={() => addToCart(item)} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;