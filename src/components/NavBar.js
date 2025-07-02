import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { handleLogout } from "./Auth/Auth";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
const NavBar = () => {
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [menuActive, setMenuActive] = useState(false); // Nuevo estado para el menú
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

	const toggleMenu = () => {
		setMenuActive(!menuActive); // Cambiar el estado del menú
	};

	return (
		<nav className={`navbar ${menuActive ? "active" : ""}`}>
			{" "}
			{/* Activar menú con la clase 'active' */}
			<div className="logo">
				<div className="hamburger-menu" onClick={toggleMenu}>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<Link to="/" className="link">
					CRUDO
				</Link>
			</div>
			<ul className="nav-links">
				<NavLink to={"/category/ropa femenina"} className={({ isActive }) => `link nav-link ${isActive ? "active" : ""}`}>
					Ropa Mujer
				</NavLink>
				<NavLink to={"/category/Ropa de hombre"} className={({ isActive }) => `link nav-link ${isActive ? "active" : ""}`}>
					Ropa Hombre
				</NavLink>
				<NavLink to={"/category/Electrónica"} className={({ isActive }) => `link nav-link ${isActive ? "active" : ""}`}>
					Electrónica
				</NavLink>
				<NavLink to={"/category/Joyería"} className={({ isActive }) => `link nav-link ${isActive ? "active" : ""}`}>
					Joyería
				</NavLink>
				<NavLink to={"/category/Articulo"} className={({ isActive }) => `link nav-link ${isActive ? "active" : ""}`}>
					Articulos
				</NavLink>
				{isAdmin && (
					<Link to="/admin" className="link nav-link">
						Gestion
					</Link>
				)}
			</ul>
			{!auth.currentUser && (
				<Link to="/auth" className="link inicio-sesion">
					Iniciar Sesión
				</Link>
			)}
			<div className="cart-widget">
				<CartWidget />
				{!auth.currentUser && (
					<Link to="/auth" className="inicio-sesion-movil">
						<FaUser size={24} color="black" />
					</Link>
				)}
				{auth.currentUser && (
					<div className="profile">
						<button className="logOut" onClick={handleLogout}>
							<FiLogOut size={24} />
						</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
