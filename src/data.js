import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/firebase";

// Hook personalizado para obtener productos
export const useGetProducts = () => {
	const [productos, setProductos] = useState([]);

	useEffect(() => {
		const itemsCollectionRef = collection(db, "items");
		const getItemsList = async () => {
			try {
				const data = await getDocs(itemsCollectionRef);
				const filteredData = data.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProductos(filteredData);
			} catch (error) {
				console.error("Error al obtener productos:", error.message);
			}
		};
		getItemsList();
	}, []); // Solo ejecuta el efecto al montar el componente

	return productos;
};
