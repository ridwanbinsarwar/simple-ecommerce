import React from 'react'
import {products} from '../../../data/products.json'
import fs from 'fs'
import path from 'path'

export default function Product({product}) {
    // console.log(product)
    return (
        <div>
            <h1>product details</h1>
        </div>
    )
}


export async function getStaticProps(context){
    // api call does not work in production

    let product_id = context.params.product_id
    const dir = path.join('data', 'products.json')
    var rawData = fs.readFileSync(dir)
    let products = JSON.parse(rawData)
    const filtered = products.products.filter(product => product.id === product_id)
    let product = filtered.length > 0 ? filtered[0] : {
        message: `product with ${product_id} is not found`
        }

    return {
      props: {
        product,
      },
      revalidate: 1,
    }
    
}

  
export async function getStaticPaths() {
    // api call does not work in production 

    // const res = await fetch(`http://localhost:3000/api/products`)
  
    // const products = await res.json()
    const ids = products.map((product) => product.id)
    let paths = ids.map((id) => ({ params: { product_id: id.toString() } }))
    return {
      paths,
      fallback: true,
    }
}