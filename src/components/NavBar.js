import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import {handleLogout} from "./Auth/Auth";

const NavBar = () => {
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const auth = getAuth();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(setUser);
		return () => unsubscribe();
	}, []);
	// Verifica si el usuario es admin
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userDocRef = doc(db, "users", user.uid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists() && userDocSnap.data().admin === true) {
					setIsAdmin(true);
				} else {
					setIsAdmin(false);
				}
			} else {
				setIsAdmin(false);
			}
		});

		return () => unsubscribe();
	}, [auth]);
	

	return (
		<nav className="navbar">
			<div className="logo">
				<Link to="/" className="link">
					CRUDO
				</Link>
			</div>
			<ul className="nav-links">
				<NavLink to={"/category/ropa femenina"} className="link">
					Ropa Mujer
				</NavLink>
				<NavLink to={"/category/Ropa de hombre"} className="link">
					Ropa Hombre
				</NavLink>
				<NavLink to={"/category/Electrónica"} className="link">
					Electrónica
				</NavLink>
				<NavLink to={"/category/Joyería"} className="link">
					Joyería
				</NavLink>
				<NavLink to={"/category/Articulo"} className="link">
					Articulos
				</NavLink>
				{isAdmin && (
				<Link to="/admin" className="link">
					Gestion
				</Link>
			)}
			</ul>

			<CartWidget />
			{!auth.currentUser && (
				<Link to="/auth" className="link">
					Iniciar Sesión
				</Link>
			)}
			{auth.currentUser && (
				<div className="profile">
					
					<button onClick={ handleLogout }>Cerrar Sesión</button>
				</div>
			)}

			
		</nav>
	);
};

export default NavBar;
