import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import useFirebase from "../../config/useFireBase";

const ItemListContainer = () => {
	const { categoryId } = useParams();

	const { getItemsList, getItemsByCategory } = useFirebase();

	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		let isMounted = true;

		setLoading(true);
		setProductos([]);

		const fetchData = async () => {
			try {
				let data;

				if (categoryId) {
					data = await getItemsByCategory(categoryId);
				} else {
					data = await getItemsList();
				}

				if (isMounted) {
					setProductos(data);
				}
			} catch (error) {
				console.error("Error cargando productos:", error);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId]);
	return <ItemList productos={productos} loading={loading} />;
};

export default ItemListContainer;
