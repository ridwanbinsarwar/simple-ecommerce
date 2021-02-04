import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { CartContext } from '../src/CartContext'
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  const cart = useContext(CartContext)
  // console.log(cart.quantity)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href='/' passHref>
            <Typography variant="h6" component="h2">
              E-Market
            </Typography>
          </Link>
          <Link href='/orders' aria-label="show orders" color="inherit" passHref>
            <Badge color="secondary">
              <ListAltIcon />
            </Badge>
          </Link>
          <Link href='/cart' aria-label="show cart" color="inherit" passHref>
            <Badge badgeContent={(cart.quantity).toString()} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Header
