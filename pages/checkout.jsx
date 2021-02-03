import React, {useContext, useState} from 'react'
import {CartContext} from '../src/CartContext'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {useInput} from '../helpers/custom-hook/input-hook'
import Product from './product/[product_id]';
import { useRouter } from 'next/router'


function onSubmit() {
    // e.preventDefault();
    // get our form data out of state
    // const {token, list, errorLabel} = this.state;

    // axios.post('https://httpbin.org/post', {token: token})
    //     .then((response) => {
    //         //access the resp here....
    //         var payload = JSON.stringify(response.data.json, null, 2);
    //         console.log(`response fetched. ${payload}`);
    //         this.setState({
    //             token: "",
    //             errorLabelHidden: true,
    //             list: this.state.list.concat([payload])
    //         });

    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         this.setState({
    //             errorLabelHidden: false,
    //             errorLabel: "OOPS that didn't work :(",
    //             list: this.state.list.concat([payload])
    //         });
    //     });

    console.log("objeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaact")
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


export default function Checkout() {
    const cart =  useContext(CartContext)
    const router = useRouter()


    const { value:name, bind:bindName, reset:resetName } = useInput('')
    const { value:phone, bind:bindPhone, reset:resetPhone } = useInput('')
    const { value:address, bind:bindAddress, reset:resetAddress } = useInput('')

    let id = formatDate(new Date().toLocaleDateString()) + "-"+ new Date().toLocaleTimeString('en-US', { hour12: false, 
        hour: "numeric", 
        minute: "numeric" , second: "numeric"})+phone
    
    let order = JSON.stringify({
        id: id,
        products : cart.items,
        time: new Date().toLocaleString(),
        name: name,
        phone: phone,
        address: address,
        price: 10
    })
    
    
    const handleSubmit = (evt) => {
        evt.preventDefault()
        // alert(`Submitting Name ${name} ${phone} ${address}`)

        fetch('http://localhost:3000/api/order', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: order
        });

        resetName()
        resetPhone()
        resetAddress()

        router.push(`/order/${id}`)
    }

    return (
    <form onSubmit={handleSubmit}> 
      <Typography variant="h6" gutterBottom>
        Shipping address
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
      <Button type="submit">Place Order</Button>
      </form>
    )
}


