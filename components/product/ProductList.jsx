import ProductItem from './ProductItem'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ProductList({ products }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={12} >
        <Grid container justify="center">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}