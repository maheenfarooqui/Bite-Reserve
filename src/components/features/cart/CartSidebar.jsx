import { useCart } from "../../../context/CartContext";
import { IoClose, IoTrashOutline } from "react-icons/io5"; // 👈 Trash icon yahan add kiya
import { useNavigate } from "react-router-dom"; // 👈 Checkout ke liye

const CartSidebar = () => {
  // 1. updateQuantity ko yahan se nikaalna zaroori hai
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    totalPrice,
    updateQuantity,
  } = useCart();
  const navigate = useNavigate();

  const handleProceed = () => {
    toggleCart(); // Sidebar band karein
    navigate("/checkout"); // Checkout page par le jayein
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleCart}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transition-transform duration-300 transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Cart ({cart.length})</h2>
            <button
              onClick={toggleCart}
              className="text-2xl hover:text-primary transition-colors"
            >
              <IoClose />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center mt-20 text-gray-400">
                Your cart is empty 🍕
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b pb-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-grow">
                    <h3 className="font-bold text-sm">{item.name}</h3>
                    <p className="text-primary font-bold">${item.price}</p>

                    {/* ➕➖ Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, "decrement")}
                        className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, "increment")}
                        className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    <IoTrashOutline size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-600">
                  Total:
                </span>
                <span className="text-2xl font-black text-primary">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleProceed}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:bg-orange-600 transition-all uppercase tracking-wider"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
