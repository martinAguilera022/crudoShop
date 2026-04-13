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
		setLoading(true);
		setProductos([]);

		const fetchData = async () => {
			let data;

			if (categoryId) {
				data = await getItemsByCategory(categoryId);
			} else {
				data = await getItemsList();
			}

			setProductos(data);
			setLoading(false);
		};

		fetchData();
	}, [categoryId]);
	return <ItemList productos={productos} loading={loading} />;
};

export default ItemListContainer;
