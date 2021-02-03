import CartItem from './CartItem'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  
export default function CartList({ items }) {
    const classes = useStyles();
    return (
        <>
            {items.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
            <Link href="/checkout" passHref>
                <Button variant="contained" color="primary">
                    Checkout
                </Button>
            </Link>
        </>

    );
}