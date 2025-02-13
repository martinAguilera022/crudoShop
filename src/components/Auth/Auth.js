import { auth, googleProvider } from "../../config/firebase";
import {
    createUserWithEmailAndPassword,signInWithPopup,signOut
} from "firebase/auth";

// Registro con email y contraseña
export const handleRegister = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
    }
};

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
