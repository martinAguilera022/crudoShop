import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import './ItemDetail.css'; 

const ItemDetail = ({ id, title, description, price, category, stock, image }) => {
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
                    <p className="item-price">Precio: ${price}</p>
                </div>

                <ItemCount 
                    stock={stock} 
                    initial={1} 
                    onAdd={(quantity) => console.log('Cantidad agregada:', quantity)} 
                />

                <Link to="/" className="back-button">Volver a la tienda</Link>
            </div>
        </div>
    );
}

export default ItemDetail;
