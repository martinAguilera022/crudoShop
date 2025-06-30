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
	offerPercentage,
}) => {
	const [quantityAdded, setQuantityAdded] = useState(0);
	const { addItem } = useContext(CartContext);
	const handleOnAdd = (quantity) => {
		setQuantityAdded(quantity);
		const item = {
			id,
			title,
			image,
			price: discount > 0 ? discountedPrice : price, // ← Usamos el precio con descuento si existe
			originalPrice: price, // ← Guardamos también el precio original por si lo necesitás en el carrito
			offerPercentage: discount, // ← También podés pasar el descuento si querés mostrarlo
		};
		addItem(item, quantity);
	};
	const formattedPrice = price.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});
	const cleanPrice = Number(String(price).replace(/[^0-9.-]+/g, ""));
	const discount = Number(offerPercentage);
	const discountedPrice = cleanPrice * (1 - discount / 100);

	const formattedOriginalPrice = cleanPrice.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	const formattedDiscountedPrice = discountedPrice.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	return (
		<div className="item-detail-container">
			<div className="image-container">
				<img src={image} alt={description} className="item-image" />
			</div>

			<div className="detail-content">
				<p className="offer">-{offerPercentage}%</p>
				<h2 className="item-title">{title}</h2>
				<p className="item-category">{category}</p>
				<p className="item-description">{description}</p>

				<div className="price-section">
					{discount > 0 ? (
						<p className="item-price">
							<span className="price-old">{formattedOriginalPrice}</span>{" "}
							<span className="price-new">{formattedDiscountedPrice}</span>
						</p>
					) : (
						<p className="item-price">{formattedOriginalPrice}</p>
					)}
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
