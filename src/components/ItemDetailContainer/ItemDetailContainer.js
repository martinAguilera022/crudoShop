import { useEffect, useState } from "react";
import { getProductsById } from "../../asyncMock";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
	const [producto, setProducto] = useState(null); // Cambié "productos" a "producto"
	const { itemId } = useParams(); // Usamos useParams para obtener el id del producto

	useEffect(() => {
		getProductsById(itemId)
			.then((response) => {
				console.log(response);
				setProducto(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [itemId]); // La dependencia es el itemId

	if (!producto) {
		return <p className="loading-text">Cargando producto...</p>; // Si el producto no está disponible, mostramos un mensaje
	}
   
	return (
		<ItemDetail {...producto} /> // Pasamos el producto directamente a ItemDetail
	);
};

export default ItemDetailContainer;
