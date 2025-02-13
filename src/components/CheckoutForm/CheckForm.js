
import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom"; // Cambiar de useHistory a useNavigate
import AuthForm from "../AuthForm/AuthForm";
import {handleGoogleSignIn,handleLogout,handleRegister} from "../Auth/Auth";

const CheckoutForm = ({ onConfirm }) => {
	
	const [user, setUser] = useState(null); // Mantener el estado de usuario
	const navigate = useNavigate(); // Usamos el hook navigate

	
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(setUser);
		return () => unsubscribe();
	}, []);

	const handleConfirm = (event) => {
		event.preventDefault();
		if (user) {
			let userName = user.displayName || "Anonimo"; 
			let userEmail = user.email || ""; // y también para email y phone
			let userPhone = user.phoneNumber || "";

			const userData = { name: userName, phone: userPhone, email: userEmail };
			console.log(userData);
			onConfirm(userData);
		}
	};

	const handleLogout = () => {
		auth.signOut();
		navigate("/auth");
		navigate("/checkout"); // Usamos navigate en lugar de history.push
	};

	const confirmarCompra = () => {
		if (user) {
			let userName = user.displayName || ""; // Usamos "" si no tiene displayName
			let userEmail = user.email || ""; // y también para email y phone
			let userPhone = user.phoneNumber || "";

			const userData = { name: userName, phone: userPhone, email: userEmail };
			console.log(userData);
			onConfirm(userData);
		}
	};

	return (
		<div >
			{user ? (
				<div className="user-info Container checkout-card" >
					<p>
						Hola, {user.displayName || user.email}. ¿Deseas continuar la compra?
					</p>
					<button className="Button" type="button" onClick={confirmarCompra}>
						Confirmar
					</button>
					<p>Comprar con otra cuenta</p>
					<button onClick={handleLogout}>Cerrar sesión</button>
				</div>
			) : (
				<form onSubmit={handleConfirm} className="Form">
					<AuthForm />
				</form>
			)}
		</div>
	);
};

export default CheckoutForm;
