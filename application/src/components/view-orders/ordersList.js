import React, { useContext, useState } from 'react';
import { orderOptions, quantityOptions } from '../../context/orderOptionDisplayData';
import './ordersList.css'

const OrdersList = ({ orders, onEdit, onDelete }) => {
    const [editingOrder, setEditingOrder] = useState(null);
    const [orderItem, setOrderItem] = useState(undefined);
    const [quantity, setQuantity] = useState(undefined);

    function handleEditing(order) {
        setOrderItem(order.order_item);
        setQuantity(order.quantity);
        setEditingOrder(order);
    }

    function handleEdited(order, isConfirmed) {
        if (!isConfirmed) {
            setEditingOrder(null);
            setOrderItem(undefined);
            setQuantity(undefined);
            return
        };
        onEdit({ ...order, order_item: orderItem, quantity });
    }

    function handleOrderChange(event) {
        setOrderItem(event.target.value);
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    }

    if (!orders || !orders.length) return (
        <div className="empty-orders">
            <h2>There are no orders to display</h2>
        </div>
    );

    return orders.map(order => {
        const createdDate = new Date(order.createdAt);

        let buttons = (
            <>
                <button className="btn btn-success" onClick={() => handleEditing(order)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(order)}>Delete</button>
            </>
        );
        let orderItemElement = (
            <h2>{order.order_item}</h2>
        );
        let quantityElement = (
            order.quantity
        );

        if (order === editingOrder) {
            buttons = (
                <>
                    <button className="btn btn-success" onClick={() => handleEdited(order, true)}>Confirm</button>
                    <button className="btn btn-danger" onClick={() => handleEdited(order, false)}>Cancel</button>
                </>
            );
            orderItemElement = (
                <div className="order-select-wrapper">
                    <select className="order-select" value={orderItem} onChange={(event) => handleOrderChange(event)}>
                        { orderOptions }
                    </select>
                </div>
            );
            quantityElement = (
                <select value={quantity} onChange={(event) => handleQuantityChange(event)}>
                    { quantityOptions }
                </select>
            );
        }

        return (
            <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                    { orderItemElement }
                    <p>Ordered by: {order.ordered_by || ''}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                    <p>Quantity: {quantityElement} </p>
                </div>
                <div className="col-md-4 view-order-right-col">
                    { buttons }
                </div>
            </div>
        );
    });
}

export default OrdersList;