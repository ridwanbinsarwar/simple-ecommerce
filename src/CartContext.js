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

  if(action.type == "add"){
    if(pe>-1){
      items[pe].quantity = items[pe].quantity + 1
    } else {
      items = [...items,action.payload]
    }
  } else if(action.type == 'delete'){
    items.splice(pe, 1);
  }
  

  return items
}
// This context provider is passed to any component requiring the context
export const CartProvider = ({ children }) => {
  
  const [quantity, setQuantity] = useState(Number(initialState))
  let initialItems = typeof(Storage) !== "undefined" ? JSON.parse(localStorage.getItem("items") || "[]") : []
  initialItems = initialItems == null ? [] : initialItems
  const [items, dispatch] = useReducer(reducer, initialItems)

  useEffect(() => {
    localStorage.setItem("quantity", Number(quantity))
    localStorage.setItem("items", JSON.stringify(items));
  }, [quantity,items])

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