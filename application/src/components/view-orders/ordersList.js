import React, { useState } from 'react';

const OrdersList = ({ orders, onEdit, onDelete }) => {
    const [editingOrder, setEditingOrder] = useState(null);
    const [orderItem, setOrderItem] = useState(null);
    const [quantity, setQuantity] = useState(null);

    function handleEditing(order) {
        setOrderItem(order.order_item);
        setQuantity(order.quantity);
        setEditingOrder(order);
    }

    function handleEdited(order, isConfirmed) {
        setEditingOrder(null);
        if (!isConfirmed) {
            setOrderItem(null);
            setQuantity(null);
            return
        };

        onEdit(order, orderItem, quantity);

        setOrderItem(null);
        setQuantity(null);
    }

    function handleOrderChange(event) {
        setOrderItem(event.value);
    }

    function handleQuantityChange(event) {
        setQuantity(event.value);
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
                <select value={orderItem} onChange={(event) => handleOrderChange(event)}>
                    <option value="Soup of the Day">Soup of the Day</option>
                    <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                    <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                    <option value="Chili Con Carne">Chili Con Carne</option>
                </select>
            );
            quantityElement = (
                <select value={quantity} onChange={(event) => handleQuantityChange(event)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
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