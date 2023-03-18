import React, { useState, useEffect } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';

const ORDERS_URL = `${SERVER_IP}/api/current-orders`;
const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(ORDERS_URL)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    setOrders(response.orders);
                } else {
                    console.log('Error getting orders');
                }
            });
    }, [])

    function handleDelete(order) {
        if (!window.confirm("Are you sure you want to delete this order?")) {
            return;
        }
        const orderId = order._id;
        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: orderId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                const updatedOrders = orders.filter(o => o._id != orderId);
                setOrders(updatedOrders);
            } else {
                console.log(`Error deleting order ${orderId}`);
            }
        });
    }

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                    onDelete={(order) => handleDelete(order)}
                />
            </div>
        </Template>
    );
}