import React, { useContext, useState, useReducer } from 'react'
import {products} from '../../../data/products.json'
import fs from 'fs'
import path from 'path'
import Meta from '../../../components/Meta'
import ProductDetails from '../../../components/ProductDetails'
import { makeStyles } from '@material-ui/core/styles';

import Link from 'next/link'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import {CartContext} from '../../../src/CartContext'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  //   jus : center;
  //   align-items: center;
  //   text-align: center;
  //   min-height: 100vh;
  },
  media: {
    height: 300,
  },  
});


export default function Product({product}) {
  const classes = useStyles()
    // console.log(product.quantity)
    const initialState = product.quantity
    const [productQuantity, setProductQuantity] = useState(initialState)
    // const {items, dispatch} = useContext(CartContext);

    const cart =  useContext(CartContext)
    
    return (
      <>
        <Meta title={product.title} description={product.description} />
        <br/>
        <div className={classes.root}>
          <ProductDetails product={product} quantity={productQuantity}></ProductDetails>

        <IconButton onClick={ () => {
              cart.setQuantity(cart.quantity + 1)
              setProductQuantity(productQuantity-1)
              cart.dispatch({ type: 'add', payload: {...product,quantity:1} })

            }
          } disabled={!productQuantity} color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>

        <Link href='/'>Go Back</Link>
        </div>

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
    let paths = ids.map((id) => ({ params: { product_id: id.toString() } }))
    return {
      paths,
      fallback: false,
    }
}