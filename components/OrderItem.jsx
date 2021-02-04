import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

import { CartContext } from '../src/CartContext'

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

export default function CartItem({ order }) {
  const classes = useStyles();
  const cart = useContext(CartContext)
  return (
    <div className={classes.root}>
      <Link href={`/order/${order.id}`} passHref>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="body1">
                    Order Id: {order.id}
                  </Typography>
                </Grid>

              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{order.time}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </div>
  );
}
