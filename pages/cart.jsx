import React, {useContext} from 'react'
import {CartContext} from '../src/CartContext'
import CartItem from '../components/CartList'

export default function cart() {
    const cart =  useContext(CartContext)
    console.log(cart.items)
    return (
        <div>
            <CartItem items={cart.items}></CartItem>
        </div>
    )
}

