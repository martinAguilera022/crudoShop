import { auth, googleProvider } from "../../config/firebase";
import {getAuth,
	createUserWithEmailAndPassword,
	signInWithPopup,
    signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

// Registro con email y contraseña
export const handleRegister = async (email, password) => {
	try {
		const auth = getAuth();
		await createUserWithEmailAndPassword(auth, email, password);
		console.log("Usuario registrado correctamente");
	} catch (error) {
		console.error("Error al registrar usuario:", error.message);
	}
};
export const handleLogin = async (email, password) => {
    try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado correctamente");
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
    }
}
// Inicio de sesión con Google
export const handleGoogleSignIn = async () => {
	try {
		signInWithPopup(auth, googleProvider);
	} catch (error) {
		console.error("Error al iniciar sesión con Google:", error.message);
	}
};

// Cerrar sesión
export const handleLogout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error("Error al cerrar sesión:", error.message);
	}
};
