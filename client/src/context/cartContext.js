import React, { createContext, useContext, useState, useEffect } from "react";
import newRequest from "../utils/newRequest";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await newRequest.get("/cart");
        setCart({ items: response.data.products });
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await newRequest.post("/cart/add", { productId, quantity });
      setCart({ items: response.data.products });
      console.log("Product successfully added to the cart.");
    } catch (error) {
      console.error("Error adding product to the cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await newRequest.post("/cart/remove", { productId });
      setCart({ items: response.data.products });
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await newRequest.post("/cart/clear");
      setCart({ items: [] });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await newRequest.get("/orders");
      return response.data.orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getOrders,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
