
import { useState, useEffect } from "react";

import { auth } from "../../config/firebase"; // Importar auth correctamente
import { handleRegister, handleGoogleSignIn, handleLogout } from "../Auth/Auth"; // Importar funciones de autenticación
import { onAuthStateChanged } from "firebase/auth";
    function AuthForm() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [name, setName] = useState("");
        
        const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado
        useEffect(() => {
            // Suscribirse a los cambios de autenticación
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                
            });
    
            return () => unsubscribe(); // Limpiar la suscripción al desmontar el componente
        }, []);
        return (
            
            <div className="container">
                <div className="contenedor-registro">
                <>
                    {!auth.currentUser && (
                        <>
                        <div className="form-box">
                            <h2 className="title">Regístrate</h2>
                            <input
                            type="text"
                            placeholder="Nombre"
                            className="input-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
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
                            <button className="register-button" onClick={handleRegister}>
                            Registrarse
                            </button>
                        </div>

                        <div className="google-signin">
                            <h2>Ingresar con Google</h2>
                            <button onClick={handleGoogleSignIn}>Google</button>
                        </div>
                        </>
                    )}
                    </>


                    {auth.currentUser && (
                        <button className="logout-button" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    )}
                </div>
            </div>
        );
    }
    export default AuthForm;