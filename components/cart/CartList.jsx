import CartItem from './CartItem'
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {useStyles} from './CartItem'

export default function CartList({ items }) {
  // console.log(items,items.length)
  const classes = useStyles();
  return (
    <>

      { items.orders && items.orders.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <Paper hidden={items.orders && items.orders.length > 0 ? false : true} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}></Grid>
            <Grid item>
              <Typography variant="body1">Total Price: {items.price}</Typography>
            </Grid>
          </Grid>
        </Grid>

        {items.orders && (items.orders.length > 0 ? true : false) ?
          <Link href="/checkout" passHref>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </Link> : <h1>No items in cart</h1>}
      </Paper>
    </>

  );
}