import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = sessionStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart state from sessionStorage:", error);
      return [];
    }
  });
  // Derived state calculations (At render time)
  const totalItemCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id,
      );
      if (existingItemIndex > -1) {
        // Merge quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Add new line item
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail || product.images?.[0] || "",
            quantity,
          },
        ];
      }
    });
    toast.success(`Added ${product.title} to cart!`);
  };
  const removeFromCart = (productId, title) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
    toast.info(`Removed ${title || "item"} from cart.`);
  };
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };
  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}