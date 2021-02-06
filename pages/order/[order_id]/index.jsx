import React, { useContext } from 'react'
import { CartContext } from '../../../helpers/cart-context/CartContext'
import OrderDetails from '../../../components/order/OrderDetails'

export default function Order({ order }) {
    const cart = useContext(CartContext)
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