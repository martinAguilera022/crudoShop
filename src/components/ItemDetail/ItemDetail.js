import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import "./ItemDetail.css";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const ItemDetail = ({
	id,
	title,
	description,
	price,
	category,
	stock,
	image,
}) => {
	const [quantityAdded, setQuantityAdded] = useState(0);
	const { addItem } = useContext(CartContext);
	const handleOnAdd = (quantity) => {
		setQuantityAdded(quantity);
		const item = {
			id,
			title,
			price,
			image,
		};
		addItem(item, quantity);
	};
	const formattedPrice = price.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});
	return (
		<div className="item-detail-container">
			<div className="image-container">
				<img src={image} alt={description} className="item-image" />
			</div>

			<div className="detail-content">
				<h2 className="item-title">{title}</h2>
				<p className="item-category">{category}</p>
				<p className="item-description">{description}</p>

				<div className="price-section">
					<p className="item-price">ARS {formattedPrice}</p>
				</div>
				<div className="stock-section">
					<p className="item-stock">En Stock: {stock}</p>
				</div>
				{quantityAdded > 0 ? (
					<Link to="/cart" className="ir-al-carrito link">
						Ir al carrito
					</Link>
				) : (
					
					<ItemCount stock={stock} initial={1} onAdd={handleOnAdd} />
				)}

				<Link to="/" className="back-button">
					Volver a la tienda
				</Link>
			</div>
		</div>
	);
};

export default ItemDetail;
