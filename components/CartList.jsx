import CartItem from './CartItem'
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 5
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 900,
  },
  image: {
    width: 80,
    height: 90,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

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
      </Paper>
      <Link href="/checkout" passHref>
        <Button disabled={items.orders && items.orders.length > 0 ? false : true} variant="contained" color="primary">
          Checkout
                </Button>
      </Link>
    </>

  );
}