import React, { createContext, useState } from "react";

export const CartContext = createContext();

// This context provider is passed to any component requiring the context
export const CartProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(0);
//   const [location, setLocation] = useState("Mars");

  return (
    <CartContext.Provider
      value={{
        quantity,
        setQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};