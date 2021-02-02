import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {CartContext} from '../src/CartContext'

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <IconButton aria-label="show orders" color="inherit">
              <Badge color="secondary">
                <ListAltIcon />
              </Badge>
          </IconButton>
          <IconButton aria-label="show cart" color="inherit">
              <Badge badgeContent={cart.quantity} color="secondary">
                <ShoppingCartIcon />
              </Badge>
           </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
