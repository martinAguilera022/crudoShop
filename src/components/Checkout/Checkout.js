import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { db } from "../../config/firebase";
import { documentId, Timestamp } from "firebase/firestore";
import CheckoutForm from "../CheckoutForm/CheckForm";
import { Link } from "react-router-dom";
import {
	addDoc,
	collection,
	getDocs,
	query,
	writeBatch,
	where,
} from "firebase/firestore";
import "./Checkout.css";
const Checkout = () => {
	const [loading, setLoading] = useState(false);
	const [orderId, setOrderId] = useState(null);

	const { cart, total, clearCart } = useContext(CartContext);
	const createOrder = async ({ name, phone, email }) => {
		setLoading(true);
		try {
			const objOrder = {
				estate: "Pendiente",
				buyer: {
					name: name,
					phone: phone,
					email: email,
				},
				items: cart,
				total: total(),
				date: Timestamp.fromDate(new Date()),
			};
			const batch = writeBatch(db);
			const outOfStock = [];
			const ids = cart.map((prod) => String(prod.id));
			const productsRef = collection(db, "products");
			const productsAddedFromFirestore = await getDocs(
				query(productsRef, where(documentId(), "in", ids))
			);
			const { docs } = productsAddedFromFirestore;

			docs.forEach((doc) => {
				const dataDoc = doc.data();
				const stockDb = dataDoc.stock;

				const productAddedToCart = cart.find((prod) => prod.id === doc.id);
				const prodQuantity = productAddedToCart?.quantity;

				if (stockDb >= prodQuantity) {
					batch.update(doc.ref, { stock: stockDb - prodQuantity });
				} else {
					outOfStock.push({ id: doc.id, ...dataDoc });
				}
			});

			if (outOfStock.length === 0) {
				await batch.commit();
				const orderRef = collection(db, "orders");
				const orderAdded = await addDoc(orderRef, objOrder);
				setOrderId(orderAdded.id);
				clearCart();
			} else {
				console.error("Hay productos fuera de stock");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	if (loading) {
		return (
			<div className="checkout-container">
				<div className="checkout-card">
					<div className="spinner"></div>
					<h2 className="loading-message">Generando tu orden...</h2>
				</div>
			</div>
		);
	}

	if (orderId) {
		return (
			<div className="checkout-container">
				<div className="checkout-card">
					<h2 className="order-success-message">¡Orden generada con éxito!</h2>
					<p className="loading-message">El ID de tu orden es:</p>
					<span className="order-id">{orderId}</span>
					<p className="loading-message">Gracias por tu compra!</p>
					<Link className="linkButton" to="/">
						Volver
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="checkout-container">
			<CheckoutForm onConfirm={createOrder} />
		</div>
	);
};
export default Checkout;
