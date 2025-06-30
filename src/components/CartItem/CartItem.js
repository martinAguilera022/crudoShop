import "./CartItem.css";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

const CartItem = ({
	id,
	title,
	price,
	quantity,
	image,
	offerPercentage,
	originalPrice, // ← Asegurate de recibir este prop
}) => {
	const { removeItem } = useContext(CartContext);

	const total = price * quantity;

	const formattedUnitPrice = price.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	const formattedOriginalPrice = originalPrice?.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	const formattedTotal = total.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	return (
		<div className="cart-item" key={id}>
			<img src={image} alt={title} />
			<div className="cart-item-details">
				<h3>{title}</h3>

				{offerPercentage > 0 ? (
					<p>
						<span className="price-old">{formattedOriginalPrice}</span>{" "}
						<span className="price-new">{formattedUnitPrice}</span>
					</p>
				) : (
					<p>{formattedUnitPrice}</p>
				)}

				<p>Cantidad: {quantity}</p>
				<p>Total: {formattedTotal}</p>
			</div>

			<button className="delete-button" onClick={() => removeItem(id)}>
				X
			</button>
		</div>
	);
};

export default CartItem;
