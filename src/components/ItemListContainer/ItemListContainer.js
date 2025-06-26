import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getProducts,getProductsByCategory } from "../../asyncMock";
import ItemList from "../ItemList/ItemList";



const ItemListContainer = () => {
	const [productos, setProductos] = useState([]);
	const { categoryId } = useParams();
	
	// Estado inicial como array vacío
	useEffect(() => {
		const asyncFunc = categoryId ? getProductsByCategory : getProducts;
			
		asyncFunc(categoryId)
			.then((response) => {
				setProductos(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [categoryId]);

	return <ItemList productos={productos}></ItemList>;
};

export default ItemListContainer;
