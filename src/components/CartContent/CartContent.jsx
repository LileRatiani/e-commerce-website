import { useState, createContext } from "react";

export const CartContent = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.selectedSize === product.selectedSize);
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.selectedSize === product.selectedSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, selectedSize) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.selectedSize === selectedSize)));
  };

  const updateQty = (id, selectedSize, delta) => {
    setCartItems(prev =>
      prev.map(i =>
        i.id === id && i.selectedSize === selectedSize
          ? { ...i, quantity: Math.max(1, i.quantity + delta) }
          : i
      )
    );
  };

  const updateSize = (id, oldSize, newSize) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.selectedSize === oldSize
          ? { ...item, selectedSize: newSize }
          : item
      )
    );
  };

  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContent.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        updateSize, 
        totalCount
      }}
    >
      {children}
    </CartContent.Provider>
  );
};
