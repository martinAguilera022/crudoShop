import "./CartItem.css";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
const CartItem = ({ id, title, price, quantity, image }) => {
	const { removeItem } = useContext(CartContext);

	let total = price * quantity;
	const precio = price.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});
	const formattedPrice = total.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});
	return (
		<div className="cart-item" key={id}>
			<img src={image} alt={title} />
			<div className="cart-item-details">
				<h3>{title}</h3>
				<p>ARS {precio}</p>
				<p>Cantidad: {quantity}</p>
				<p>Total: {formattedPrice}</p>
			</div>
			<button className="delete-button" onClick={() => removeItem(id)}>
				X
	 		</button>
		</div>
	);
};

export default CartItem;
