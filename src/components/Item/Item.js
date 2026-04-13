import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({
	id,
	title,
	description,
	price,
	category,
	stock,
	image,
	offerPercentage,
	vecesVendido,
}) => {
	const cleanPrice = Number(
		String(price)
			.replace(/\./g, "") // elimina puntos de miles
			.replace(/,/g, ".") // por si viene con coma decimal
			.replace(/[^0-9.-]+/g, ""),
	);
	const discount = Number(offerPercentage);
	const discountedPrice = cleanPrice * (1 - discount / 100);

	return (
		<div key={id} className="popular-card">
			{discount > 0 && <div className="offer-badge">{discount}% OFF</div>}
			<img src={image} alt={title} className="card-img" />

			<div className="card-bottom">
				<div className="card-info">
					<h3>{title}</h3>
				</div>

				<div className="card-actions">
					{discount > 0 ? (
						<div className="card-price">
							<span className="new">
								${Math.round(discountedPrice).toLocaleString("es-AR")}
							</span>
							<span className="old">${cleanPrice.toLocaleString("es-AR")}</span>
						</div>
					) : (
						<span className="new">{price.toLocaleString("es-AR")}</span>
					)}

					<Link to={`/item/${id}`} className="btn-ver">
						Ver
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Item;
