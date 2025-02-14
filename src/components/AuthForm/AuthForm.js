import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import {
	handleRegister,
	handleGoogleSignIn,
	handleLogout,
	handleLogin,
} from "../Auth/Auth";
import { onAuthStateChanged } from "firebase/auth";

function AuthForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [user, setUser] = useState(null);
	const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre registro y login
	const [error, setError] = useState(""); // Estado para manejar errores
	const [successMessage, setSuccessMessage] = useState(""); // Estado para mensajes de éxito

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => unsubscribe();
	}, []);

	const handleAuthAction = async () => {
		setError(""); // Limpiar errores anteriores
		setSuccessMessage(""); // Limpiar mensajes de éxito anteriores

		try {
			if (isRegistering) {
				await handleRegister(email, password);
				setSuccessMessage("¡Registro exitoso! Bienvenido.");
			} else {
				await handleLogin(email, password);
				setSuccessMessage("¡Inicio de sesión exitoso!");
			}
		} catch (error) {
			setError(error.message); // Mostrar el error al usuario
		}
	};

	return (
		<div className="container">
			<div className="contenedor-registro">
				{!user ? (
					<>
						<div className="form-box">
							<h2 className="title">
								{isRegistering ? "Regístrate" : "Ingresar"}
							</h2>

							{isRegistering && (
								<input
									type="text"
									placeholder="Nombre"
									className="input-field"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							)}

							<input
								type="email"
								placeholder="Email"
								className="input-field"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Contraseña"
								className="input-field"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<button className="register-button" onClick={handleAuthAction}>
								{isRegistering ? "Registrarse" : "Ingresar"}
							</button>

							{error && <p className="error-message">{error}</p>}
							{successMessage && (
								<p className="success-message">{successMessage}</p>
							)}

							<p>
								{isRegistering
									? "¿Ya tienes una cuenta? "
									: "¿No tienes una cuenta? "}
								<button
									className="toggle-button"
									onClick={() => setIsRegistering(!isRegistering)}
								>
									{isRegistering ? "Ingresar" : "Regístrate"}
								</button>
							</p>
						</div>

						<div className="form-box">
							<div className="google-signin">
								<h2>Ingresar con Google</h2>
								<button onClick={handleGoogleSignIn}>Google</button>
							</div>
						</div>
					</>
				) : (
					<button className="logout-button" onClick={handleLogout}>
						Cerrar Sesión
					</button>
				)}
			</div>
		</div>
	);
}

export default AuthForm;
