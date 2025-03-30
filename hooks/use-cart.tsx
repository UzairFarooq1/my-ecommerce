"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/lib/types";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("cart", JSON.stringify(items));
        console.log("Cart saved to localStorage:", items);
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [items, isInitialized]);

  const addItem = (product: CartItem) => {
    console.log("Adding item to cart:", product);
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
        console.log("Updated cart items:", updatedItems);
        return updatedItems;
      } else {
        // Add new item
        const newItems = [...prevItems, product];
        console.log("New cart items:", newItems);
        return newItems;
      }
    });
  };

  const removeItem = (id: string) => {
    console.log("Removing item from cart:", id);
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      console.log("Updated cart items after removal:", newItems);
      return newItems;
    });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    console.log("Updating item quantity:", id, quantity);
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      console.log("Updated cart items after quantity change:", updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    console.log("Clearing cart");
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
