import { createContext, useState } from "react";

export const CartContext = createContext({
	cart: [],
});

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	console.log(cart);

	const addItem = (item, quantity) => {
		if (!isInCart(item.id)) {
			setCart((prev) => [...prev, { ...item, quantity }]);
		} else {
			console.log("El producto ya esta en el carrito");
		}
	};
	const totalQuantity = () => {
		let total = 0;
		cart.forEach((prod) => (total += prod.quantity));
		return total;
	};
	const total = () => {
		let total = 0;
		cart.forEach((prod) => (total += prod.price * prod.quantity));
		const formattedPrice = total.toLocaleString("es-AR", {
			style: "currency",
			currency: "ARS",
		});
		total = formattedPrice;
		return total;
	};
	const removeItem = (itemId) => {
		const cartUpdated = cart.filter((prod) => prod.id !== itemId);
		setCart(cartUpdated);
	};
	const clearCart = () => {
		setCart([]);
	};
	const isInCart = (itemId) => {
		return cart.some((prod) => prod.id === itemId);
	};
	return (
		<CartContext.Provider
			value={{
				cart,
				addItem,
				removeItem,
				clearCart,
				isInCart,
				totalQuantity,
				total,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
