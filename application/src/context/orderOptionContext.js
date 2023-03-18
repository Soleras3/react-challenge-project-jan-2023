import { createContext } from 'react';

export const OrderOptionContext = createContext({
	orderItems: ["Soup of the Day",
		"Linguini With White Wine Sauce",
		"Eggplant and Mushroom Panini",
		"Chili Con Carne"],
	quantities: [1, 2, 3, 4, 5, 6],
	orderOptions: (
		this.orderItems.map(order =>
			<option value={order}>{order}</option>
		)
	),
	quantityOptions: (
		this.quantities.map(quantity =>
			<option value={quantity}>{quantity}</option>
		)
	)
});
