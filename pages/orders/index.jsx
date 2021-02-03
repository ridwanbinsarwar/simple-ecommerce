import React from 'react'

export default function Orders({orders}) {
    console.log(orders)
    return (
        <div>
            <h1>Orders</h1>
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