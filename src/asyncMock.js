import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/firebase";

export const getProducts = async () => {
	try {
		const itemsCollectionRef = collection(db, "items");

		const data = await getDocs(itemsCollectionRef);
		
		return data.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			
		}));
		
	} catch (error) {
		console.error("Error al obtener productos:", error);
		return [];
	}
};


export const getProductsById = async (productId) => {
	try {
		const productos = await getProducts(); // Obtener todos los productos
		console.log("Productos disponibles:", productos); // Log para verificar los productos
		console.log("Buscando producto con ID:", productId);

		// Asegurarse de que ambos valores sean del mismo tipo
		const productoEncontrado = productos.find(
			(producto) => producto.id === productId
		);

		console.log("Producto encontrado:", productoEncontrado || "No encontrado");
		return productoEncontrado || null;
	} catch (error) {
		console.error("Error al obtener el producto por ID:", error.message);
		return null;
	}
};

export const getProductsByCategory = async (category) => {
	try {
		const productos = await getProducts(); // Obtener los productos
		console.log("Productos disponibles:", productos);
		console.log("Filtrando por categoría:", category);
		const productosFiltrados = productos.filter(
			(producto) => producto.category && producto.category === category
		);
		console.log("Productos encontrados:", productosFiltrados);
		return productosFiltrados;
	} catch (error) {
		console.error(
			"Error al obtener los productos por categoría:",
			error.message
		);
		return [];
	}
};
