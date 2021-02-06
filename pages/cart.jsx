import React, { useContext } from 'react'
import { CartContext } from '../helpers/cart-context/CartContext'
import CartList from '../components/cart/CartList'

export default function cart() {
    const cart = useContext(CartContext)
    // console.log(cart.items)
    return (
        <div>
            <CartList items={cart.items}></CartList>
        </div>
    )
}

