import React, { useContext, useState, useEffect } from 'react'
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

  const [order, setOrder] = useState({})

  useEffect(() => {
    let id = formatDate(new Date().toLocaleDateString()) + "-" + new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: "numeric",
      minute: "numeric", second: "numeric"
    }) + phone

    setOrder({
      id: id,
      products: cart.items.orders,
      time: new Date().toLocaleString(),
      name: name,
      phone: phone,
      address: address,
      price: cart.items.price
    })

  }, [name,phone,address])

  async function submitOrder() {
    return await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    }).then(res => {
      return res.json()
    })

  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    if (order.products.length <= 0) {
      alert("Cart is empty")
      router.push(`/`)
    } else {

      let res = await submitOrder()

      if (res.status == 400) {

        cart.dispatch({ type: 'revalidate', payload: res.products })
        alert("Cart updated. All products are not avaialbe now. ")
        router.push(`/cart`)


      }
      if (res.status == 200) {
        cart.setQuantity(0)
        cart.dispatch({ type: "checkout" })
        localStorage.removeItem("items")
        localStorage.removeItem("quantity")

        router.push(`/order/${order.id}`)
      }
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit} className='form-group'>

        <div  >
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
            <Button  variant="outlined" color="primary" type="submit" >Place Order</Button>

          </div>

        </div>
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
      </form>

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
