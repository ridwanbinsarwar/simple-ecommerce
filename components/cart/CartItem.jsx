import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { CartContext } from '../../src/CartContext'

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

export default function CartItem({ item, order }) {
  const classes = useStyles();
  const cart = useContext(CartContext)
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt={item.title} src={item.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {item.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Quantity: {item.quantity}
                </Typography>
              </Grid>
              {!order ?
                <Grid item>
                  <IconButton onClick={() => {
                    cart.setQuantity(cart.quantity - item.quantity)
                    localStorage.setItem("quantity", cart.quantity - item.quantity)
                    // setProductQuantity(productQuantity-1)
                    cart.dispatch({ type: 'delete', payload: { ...item } })

                  }
                  } color="primary" aria-label="add to shopping cart">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                : null}

            </Grid>
            <Grid item>
              <Typography variant="subtitle1">${item.price * item.quantity}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>


    </div>



  );
}
