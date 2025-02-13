import "./Item.css";
import { Link } from "react-router-dom";
const Item = ({ id, title, description, price, category, stock, image }) => {
	return (
		<div className="ItemDetailContainer">
			<img src={image} alt={description} />

			<h2>{title}</h2>
			<p className="category">{category}</p>

			<div className="precio-button">
				<p>ARS {price}</p>

				<Link to={`/item/${id}`} className="link ver-button">
					Ver
				</Link>
			</div>
		</div>
	);
};
export default Item;
