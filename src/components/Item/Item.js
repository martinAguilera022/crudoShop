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
}) => {
	const cleanPrice = Number(String(price).replace(/[^0-9.-]+/g, ""));
	const discount = Number(offerPercentage);
	const discountedPrice = cleanPrice * (1 - discount / 100);
	return (
		<div className="ItemDetailContainer">
			<div className="image-wrapper">
				<img src={image} alt={description} />
				{stock === 0 && <p className="sin-stock-overlay">SIN STOCK</p>}
				{offerPercentage > 0 && (
					<p className="offer-overlay">-{offerPercentage}%</p>
				)}

				<div className="information-item">
					<h2>{title}</h2>
					<p className="category">{category}</p>
					<div className="precio-button">
						{discount > 0 ? (
							<p>
								<span className="price-old">ARS {cleanPrice.toFixed(3)}</span>
								<br />
								<span className="price-new">
									ARS {discountedPrice.toFixed(3)}
								</span>
							</p>
						) : (
							<p className="price-regular">ARS {cleanPrice.toFixed(3)}</p>
						)}
						<Link to={`/item/${id}`} className="link ver-button">
							Ver
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Item;
