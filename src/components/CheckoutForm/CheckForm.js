import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ onConfirm }) => {
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [notes, setNotes] = useState("");
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(setUser);
		return () => unsubscribe();
	}, []);

	const handleLogout = async () => {
		await auth.signOut();
		navigate("/auth");
	};

	const handleConfirm = () => {
		if (!user) return;

		onConfirm({
			name: user.displayName || "Anonimo",
			email: user.email || "",
			phone: user.phoneNumber || "",
			address,
			city,
			postalCode,
			notes,
		});
	};

	return (
		<div className="checkout-card">
			{user ? (
				<>
					<h3>Datos de envío</h3>

					<input
						type="text"
						placeholder="Dirección"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>

					<input
						type="text"
						placeholder="Ciudad"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>

					<input
						type="text"
						placeholder="Código postal"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					/>

					<textarea
						placeholder="Notas (opcional)"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					/>

					<hr />

					<p>Hola, {user.displayName || user.email}. Confirmar compra:</p>

					<button className="Button" onClick={handleConfirm}>
						Confirmar compra
					</button>

					<button onClick={handleLogout}>Cambiar cuenta</button>
				</>
			) : (
				<p>Debes iniciar sesión para continuar</p>
			)}
		</div>
	);
};

export default CheckoutForm;
