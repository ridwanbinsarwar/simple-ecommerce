import React from 'react'
import {products} from '../../../data/products.json'

const Product = ({product}) => {
    console.log(product)
    return (
        <div>
            <h1>product details</h1>
        </div>
    )
}

export default Product

export async function getStaticProps(context){
    let product_id = context.params.product_id
    let filtered = products.filter(product => product.id === product_id)
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
    // const res = await fetch(`http://localhost:3000/api/products`)
  
    // const products = await res.json()
    const ids = products.map((product) => product.id)
    let paths = ids.map((id) => ({ params: { product_id: id.toString() } }))
    return {
      paths,
      fallback: true,
    }
}