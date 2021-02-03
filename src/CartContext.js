import React, { createContext, useState, useEffect, useReducer } from "react";
export const CartContext = createContext();

const initialState = typeof(Storage) !== "undefined" ? localStorage.getItem("quantity") : 0
function reducer(items, action) {

  let pe = -1
  items.forEach((item,index) => {
    if(item.id == action.payload.id){
      pe = index
      
    }
  })

  if(pe>-1){
    items[pe].quantity = items[pe].quantity + 1
  } else {
    items = [...items,action.payload]
  }

  return items
}
// This context provider is passed to any component requiring the context
export const CartProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(Number(initialState))
  
  const [items, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    localStorage.setItem("quantity", Number(quantity))
  }, [quantity])

  return (
    <CartContext.Provider
      value={{
        quantity,
        items,
        setQuantity,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
};