import React, {useState, useContext, useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import {CartContext} from '../../src/CartContext'

export default function ProductQuantity({product}) {

  const cart = useContext(CartContext)
  const [productQuantity, setProductQuantity] = useState(0)

  useEffect(() => {
    // fetch and update product quantity
    fetch(`http://localhost:3000/api/product/${product.id}`).then(res => res.json()).then(data => {
      if (cart.items.orders.length == 0) {
        setProductQuantity(data.quantity)
      }
      cart.items.orders.forEach((item, index) => {
        if (item.id === data.id) {
          setProductQuantity(data.quantity - item.quantity)
        }
      })
    })
  })

    return (
        <div>
            <Typography variant="h6" component="p">
                Quantity:  {productQuantity}
            </Typography>
        </div>
    )
}
