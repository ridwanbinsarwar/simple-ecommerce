import React, { createContext, useState, useEffect, useReducer } from "react"
export const CartContext = createContext()


// This context provider is passed to any component requiring the context

export const CartProvider = ({ children }) => {

  const [quantity, setQuantity] = useState(Number(0))

  let ordersInit = {
    orders: [
    ], price: 0
  }
  const [items, dispatch] = useReducer(reducer, ordersInit)

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("items"))
    dispatch({ type: 'init', payload: s })
    setQuantity(Number(localStorage.getItem("quantity")))
  }, [])


  function reducer(items, action) {


    let tPrice = 0


    if (action.type == "init" && action.payload != null) {
      items = action.payload
      return items
    }

    if (action.type == "revalidate") {
      console.log(items)

      items.orders = action.payload
      let q = 0
      for (let i = 0; i < items.orders.length; i++) {

        q += items.orders[i].quantity

        tPrice = tPrice + (items.orders[i].quantity * items.orders[i].price)
        if (items.orders[i].quantity == 0) {
          items.orders.splice(i, 1)
        }
      }
      items.price = tPrice
      setQuantity(q)
      localStorage.setItem("quantity", Number(0))
      localStorage.setItem("items", JSON.stringify(items))

      return items
    }

    if (action.type == "checkout") {
      items.orders = []
      items.price = 0


      return items
    }

    let productIndex = -1

    // find index of already exist product element in card
    items.orders.forEach((item, index) => {
      if (item.id === action.payload.id)
        productIndex = index
      if (item.quantity != undefined)
        tPrice = tPrice + (item.quantity * item.price)
    })

    if (action.type == "add") {
      tPrice = tPrice + (action.payload.price)
      items.price = tPrice

      if (productIndex > -1) {
        items.orders[productIndex].quantity = items.orders[productIndex].quantity + 1
      } else {
        items.orders = [...items.orders, action.payload]
      }
    }
    else if (action.type == 'delete') {
      items.price = items.price - (items.orders[productIndex].quantity * items.orders[productIndex].price)
      items.orders.splice(productIndex, 1)
    }
    localStorage.setItem("items", JSON.stringify(items))
    return items
  }


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
  )
}