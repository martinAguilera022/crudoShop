import { useState, useEffect, useCallback } from "react";
import { db } from "./firebase";
import {
	getDoc,
	getDocs,
	doc,
	deleteDoc,
	updateDoc,
	collection,
	addDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Colecciones de Firebase
const itemsCollectionRef = collection(db, "items");
const ordersCollectionRef = collection(db, "orders");
const usersCollectionRef = collection(db, "users");

export const useFirebase = () => {
	const [itemsList, setItemsList] = useState([]);
	const [ordersList, setOrdersList] = useState([]);
	const [disabledOrders, setDisabledOrders] = useState([]);

	const getItemsList = async () => {
		try {
			const data = await getDocs(itemsCollectionRef);
			if (!data.empty) {
				const items = data.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setItemsList(items); // Usa el estado directamente
			} else {
				setItemsList([]); // Maneja el caso vacío
			}
		} catch (error) {
			console.error("Error al obtener los productos:", error);
		}
	};

	const getOrdersList = async () => {
		try {
			const data = await getDocs(ordersCollectionRef);
			if (!data.empty) {
				const orders = data.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setOrdersList(orders); // Usa el estado directamente
			}
		} catch (error) {
			console.error("Error al obtener las órdenes:", error.message);
		}
	};

	/** Filtrar órdenes por estado */
	const getOrdersByEstate = async (estate) => {
		try {
			const data = await getDocs(ordersCollectionRef);
			if (!data.empty) {
				const filteredOrders = data.docs
					.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					.filter((order) => order.estate === estate);

				setOrdersList(filteredOrders); // Actualiza el estado con las órdenes filtradas
			} else {
				setOrdersList([]); // Si no hay órdenes, establece el estado como un array vacío
			}
		} catch (error) {
			console.error("Error al obtener las órdenes por estado:", error.message);
		}
	};
	/** Agregar nuevo producto */
	const onSubmitItem = async ({
		title,
		price,
		stock,
		description,
		category,
		image,
		offerPercentage = 0,
	}) => {
		await addDoc(itemsCollectionRef, {
			title,
			price,
			stock,
			description,
			category,
			image,
			offerPercentage,
		});

		getItemsList();

		Swal.fire({
			title: "Producto agregado exitosamente",
			icon: "success",
			draggable: true,
		});
	};

	/** Eliminar producto */
	const deleteItem = async (id) => {
		Swal.fire({
			title: "Quieres eliminar el producto?",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: "Eliminar",
			denyButtonText: `Cancelar`,
		}).then(async (result) => {
			// Cambié esto para hacer la función async
			try {
				// Eliminar la orden de la base de datos
				const itemDoc = doc(db, "items", id);
				await deleteDoc(itemDoc); // Aquí puedes usar await sin problemas

				// Actualizar el estado local para eliminar el ítem de la lista
				setItemsList((prevItems) => prevItems.filter((item) => item.id !== id));

				Swal.fire({
					title: "Item eliminado existosamente",
					icon: "success",
					draggable: true,
				});
				getItemsList(setItemsList); // Refrescar la lista después de eliminar el ítem
			} catch (error) {
				console.error("Error al eliminar el producto:", error);
			}

			if (result.isConfirmed) {
				Swal.fire("Eliminado!", "", "success");
			} else if (result.isDenied) {
				Swal.fire("Cambios no guardados", "", "info");
			}
		});
	};

	/** Actualizar producto */
	const updatedItem = async (
		id,
		{ title, price, stock, description, category, image, offerPercentage }
	) => {
		try {
			const itemDoc = doc(db, "items", id);
			await updateDoc(itemDoc, {
				title,
				price,
				stock,
				description,
				category,
				image,
				offerPercentage,
			});

			// Mostrar SweetAlert de éxito
			Swal.fire({
				title: "¡Actualizado!",
				text: "El producto se ha actualizado correctamente.",
				icon: "success",
				confirmButtonText: "Aceptar",
			});

			// Refrescar la lista de productos
			getItemsList();
		} catch (error) {
			console.error("Error al actualizar el producto:", error);

			// Mostrar SweetAlert de error
			Swal.fire({
				title: "Error",
				text: "Hubo un problema al actualizar el producto. Por favor, inténtalo de nuevo.",
				icon: "error",
				confirmButtonText: "Aceptar",
			});
		}
	};

	/** Marcar orden como entregada */
	const entregado = async (id) => {
		const itemDoc = doc(db, "orders", id);
		await updateDoc(itemDoc, { estate: "Entregado" });

		setDisabledOrders((prevState) => ({
			...prevState,
			[id]: true, // Marca el botón como deshabilitado
		}));

		getOrdersList(setItemsList);
	};

	/** Eliminar orden */
	const deleteOrder = async (id) => {
		Swal.fire({
			title: "¿Quieres eliminar la orden?",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: "Eliminar",
			denyButtonText: "No eliminar",
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					const orderDoc = doc(db, "orders", id);
					deleteDoc(orderDoc);
					setOrdersList((prevOrders) =>
						prevOrders.filter((order) => order.id !== id)
					);

					Swal.fire({
						title: "Orden eliminada exitosamente",
						icon: "success",
						draggable: true,
					});

					getOrdersList();
					console.log("Orden eliminada");
				} catch (error) {
					console.error("Error al eliminar la orden:", error);
					alert("Hubo un error al eliminar la orden");
				}
			} else if (result.isDenied) {
				Swal.fire("Cambios no guardados", "", "info");
			}
		});
	};

	/** Verificar si el usuario es administrador */
	const checkAdminStatus = async () => {
		const auth = getAuth();
		const user = await new Promise((resolve) => {
			onAuthStateChanged(auth, resolve);
		});
		if (user) {
			const userDocRef = doc(usersCollectionRef, user.uid);
			const userDocSnap = await getDoc(userDocRef);
			return userDocSnap.exists() && userDocSnap.data().admin === true;
		}
		return false;
	};

	// Cargar datos al montar el componente

	return {
		itemsList,
		ordersList,
		disabledOrders,
		getItemsList,
		getOrdersList, // Asegúrate de que esta línea esté presente
		getOrdersByEstate,
		onSubmitItem,
		deleteItem,
		updatedItem,
		entregado,
		deleteOrder,
		checkAdminStatus,
	};
};

export default useFirebase;
