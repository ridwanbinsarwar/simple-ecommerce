import React from 'react'

export default function Order({order}) {
    console.log(order)
    return (
        <div>
            <h1>order details</h1>
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