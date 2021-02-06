import OrderItem from './OrderItem'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function OrderList({ orders }) {
    return (
        <>
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </>

    );
}