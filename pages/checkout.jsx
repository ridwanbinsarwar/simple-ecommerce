import React, { useContext, useState } from 'react'
import { CartContext } from '../helpers/cart-context/CartContext'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useInput } from '../helpers/custom-hook/input-hook'
import { useRouter } from 'next/router'


export default function Checkout() {
  const cart = useContext(CartContext)
  const router = useRouter()


  const { value: name, bind: bindName, reset: resetName } = useInput('')
  const { value: phone, bind: bindPhone, reset: resetPhone } = useInput('')
  const { value: address, bind: bindAddress, reset: resetAddress } = useInput('')

  let id = formatDate(new Date().toLocaleDateString()) + "-" + new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric", second: "numeric"
  }) + phone

  let order = JSON.stringify({
    id: id,
    products: cart.items.orders,
    time: new Date().toLocaleString(),
    name: name,
    phone: phone,
    address: address,
    price: cart.items.price
  })


  const handleSubmit = (evt) => {
    evt.preventDefault()

    fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: order
    });

    cart.setQuantity(0)
    cart.dispatch({ type: "checkout" })
    localStorage.removeItem("items")
    localStorage.removeItem("quantity")

    router.push(`/order/${id}`)
  }

  return (
    <>
    <div className='form-group'>

    <form  onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Shipping Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Full Name"
            fullWidth
            {...bindName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="phone no"
            fullWidth
            {...bindPhone}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address line "
            fullWidth
            {...bindAddress}

          />
        </Grid>

      </Grid>
      <div className="form-group">
        <Button variant="outlined" color="primary" type="submit">Place Order</Button>

      </div>

    </form>
    <style jsx>
                {
                    `
                        .form-group{
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            margin: 5px;
                            
                        } 
                    `
                }
        </style>
      </div>

    </>
  )
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day

  return [year, month, day].join('-')
}
