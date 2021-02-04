import ProductItem from './ProductItem'
import productStyles from '../styles/Product.module.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


// export default function ProductList ({ products }) {
//   return (
//     <div className={productStyles.grid}>
//       {products.map((product) => (
//         <ProductItem product={product} />
//       ))}
//     </div>
//   )
// }

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
        <Grid container justify="center" className={classes.x}>
          {products.map((product) => (

            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>

    </Grid>
  );
}