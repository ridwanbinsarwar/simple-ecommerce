import React, { useContext } from 'react'
import {products} from '../../../data/products.json'
import fs from 'fs'
import path from 'path'
import Meta from '../../../components/Meta'
import Link from 'next/link'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import {CartContext} from '../../../src/CartContext'

export default function Product({product}) {
    // console.log(product.quantity)
    const cart =  useContext(CartContext)
    return (
      <>
        <Meta title={product.title} description={product.description} />
        <h1>{product.title}</h1>
        <p>{product.quantity}</p>
        <br />
        <IconButton onClick={e => cart.setQuantity(product.quantity)} color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
        <Link href='/'>Go Back</Link>
      </>
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
      // revalidate: 1,
    }
    
}

  
export async function getStaticPaths() {
    // api call does not work in production 

    // const res = await fetch(`http://localhost:3000/api/products`)
  
    // const products = await res.json()
    const ids = products.map((product) => product.id)
    // console.log(ids)
    let paths = ids.map((id) => ({ params: { product_id: id.toString() } }))
    // console.log(paths)
    return {
      paths,
      fallback: false,
    }
}