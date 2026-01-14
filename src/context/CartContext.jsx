import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const updateQuantity = (id, type) => {
  setCart((prevCart) =>
    prevCart.map((item) => {
      if (item.id === id) {
        if (type === 'increment') {
          return { ...item, quantity: item.quantity + 1 };
        } else if (type === 'decrement' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    })
  );
};

  // Add to Cart Function
  const addToCart = (item) => {
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((cartItem) => cartItem.id === item.id);
      if (isItemInCart) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear Cart
  const clearCart = () => setCart([]);

  // Total Price calculation
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, updateQuantity }}>
    {children}
  </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);