import React from 'react';

export const orderItems = ["Soup of the Day",
"Linguini With White Wine Sauce",
"Eggplant and Mushroom Panini",
"Chili Con Carne"];

export const quantities = [1, 2, 3, 4, 5, 6];

export const orderOptions = (
	orderItems.map(order =>
		<option value={order}>{order}</option>
	)
);

export const quantityOptions = (
	quantities.map(quantity =>
		<option value={quantity}>{quantity}</option>
	)
);
