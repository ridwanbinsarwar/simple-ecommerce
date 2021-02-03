import React, {useContext} from 'react'
import {CartContext} from '../src/CartContext'
import Link from 'next/link'

export default function cart() {
    const cart =  useContext(CartContext)
    console.log(cart.items)
    return (
        <div>
            <h1>Cart</h1>
            <Link href='/'>Go Back</Link>
            <div>
                <Link href='/checkout'>checkout</Link>
            </div>
            
        </div>
    )
}
