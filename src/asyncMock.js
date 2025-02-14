import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/firebase";
import Swal from "sweetalert2";

export const getProducts = async () => {
	try {
		const itemsCollectionRef = collection(db, "items");

		const data = await getDocs(itemsCollectionRef);

		return data.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Error al obtener los productos",
			text: error.message,
		});
		return [];
	}
};

export const getProductsById = async (productId) => {
	try {
		const productos = await getProducts(); // Obtener todos los productos

		// Asegurarse de que ambos valores sean del mismo tipo
		const productoEncontrado = productos.find(
			(producto) => producto.id === productId
		);

		return productoEncontrado || null;
	} catch (error) {
		return null;
	}
};

export const getProductsByCategory = async (category) => {
	try {
		const productos = await getProducts(); // Obtener los productos

		const productosFiltrados = productos.filter(
			(producto) => producto.category && producto.category === category
		);

		return productosFiltrados;
	} catch (error) {
		console.error(
			"Error al obtener los productos por categoría:",
			error.message
		);
		return [];
	}
};
