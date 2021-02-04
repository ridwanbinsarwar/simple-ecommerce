import React, { useEffect, useContext } from 'react'
import { CartContext } from '../../../src/CartContext'
import OrderDetails from '../../../components/OrderDetails'

export default function Order({ order }) {
    const cart = useContext(CartContext)
    useEffect(() => {
        if (cart.quantity > 0) {
            cart.setQuantity(0)
            cart.dispatch({ type: "checkout" })
            localStorage.removeItem("items")
            localStorage.removeItem("quantity")
        }
    })

    return (
        <div>
            <OrderDetails order={order}> </OrderDetails>
        </div>
    )
}
export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/order/${context.params.order_id}`)
    const order = await res.json()
    return {
        props: {
            order,
        },
    }
}