import React from 'react'

export default function Orders({client}) {
    return (
        <div>
            <h1>Orders</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/client/${context.params.client_id}`)
    const client = await res.json()
    return {
        props: {
            client,
        },
    }
  
}