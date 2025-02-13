import "./ItemCount.css";
import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
	const [quantity, setQuantity] = useState(initial);

	const increment = () => {
		if (quantity < stock) {
			setQuantity(quantity + 1); // Incrementa la cantidad
		}
	};

	const decrement = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1); // Decrementa la cantidad
		}
	};

	const handleAddToCart = () => {
		onAdd(quantity); // Llama a la función onAdd al hacer clic en "Agregar al carrito"
	};

	return (
		<div className="ItemCount">
			<button className="ItemCount__button" onClick={decrement}>
				-
			</button>
			<h4 className="ItemCount__number">{quantity}</h4>
			<button className="ItemCount__button" onClick={increment}>
				+
			</button>
			<button
				className="ItemCount__addToCart"
				onClick={handleAddToCart}
				
			>
				Agregar al carrito
			</button>
		</div>
	);
};

export default ItemCount;
