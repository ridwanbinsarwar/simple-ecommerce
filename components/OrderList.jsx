import OrderItem from './OrderItem'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function OrderList({ orders }) {
    const classes = useStyles();
    return (
        <>
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </>

    );
}