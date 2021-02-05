import React from 'react'
import OrderList from '../../components/order/OrderList'

export default function Orders({ orders }) {
    return (
        <div>
            <OrderList orders={orders}></OrderList>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/order`)
    const orders = await res.json()
    return {
        props: {
            orders,
        },
    }
}