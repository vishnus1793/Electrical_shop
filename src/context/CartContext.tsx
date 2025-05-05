import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface CartProduct {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  addItem: (product: CartProduct) => void; // Alias for addToCart for backward compatibility
  calculateTotal: () => number; // Add new function for calculating total
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartProduct[]>([]);
 
  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem("grtCart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);
 
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("grtCart", JSON.stringify(items));
  }, [items]);

  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
 
  // Calculate total price of items in cart
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total function (for backward compatibility)
  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Add a product to cart
  const addToCart = (product: CartProduct) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id &&
               item.size === product.size &&
               item.color === product.color
      );
     
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += product.quantity;
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, product];
      }
    });
  };

  // Alias for addToCart (for backward compatibility)
  const addItem = addToCart;

  // Remove a product from cart
  const removeFromCart = (productId: string | number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
   
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    addToCart,
    addItem,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    calculateTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};