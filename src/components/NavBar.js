import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { handleLogout } from "./Auth/Auth";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const auth = getAuth();

	const [search, setSearch] = useState("");
	const [products, setProducts] = useState([]);
	const [results, setResults] = useState([]);

	// 🔐 Auth
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(setUser);
		return () => unsubscribe();
	}, []);

	// 🔥 TRAER PRODUCTOS (CORREGIDO → items)
	useEffect(() => {
		const getProducts = async () => {
			const snapshot = await getDocs(collection(db, "items"));
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			setProducts(data);
		};

		getProducts();
	}, []);

	// 🔍 FILTRO EN VIVO (CORREGIDO → title)
	useEffect(() => {
		if (search.trim() === "") {
			setResults([]);
			return;
		}

		const filtered = products.filter((p) =>
			p.title?.toLowerCase().includes(search.toLowerCase()),
		);

		setResults(filtered.slice(0, 5));
	}, [search, products]);

	// 🔐 Admin
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
		<header className="navbar">
			<div className="nav-top">
				<div className="logo">
					<Link to="/" className="link">
						CRUDO
					</Link>
				</div>

				{/* 🔍 BUSCADOR CON DROPDOWN */}
				<div className="search-container">
					<input
						type="text"
						placeholder="Buscar..."
						className="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					{results.length > 0 && (
						<div className="search-results">
							{results.map((p) => (
								<Link
									to={`/item/${p.id}`}
									key={p.id}
									className="search-item"
									onClick={() => setSearch("")}
								>
									<img src={p.image} alt={p.title} width={40} />
									<div>
										<p>{p.title}</p>
										<span>${p.price}</span>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>

				<div className="icons">
					<CartWidget />

					{!auth.currentUser && (
						<Link to="/auth">
							<FaUser size={20} />
						</Link>
					)}

					{auth.currentUser && (
						<button className="logOut" onClick={handleLogout}>
							<FiLogOut size={20} />
						</button>
					)}
				</div>
			</div>

			<nav className="nav-bottom">
				<NavLink to={"/category/remeras"}>Remeras</NavLink>
				<NavLink to={"/category/buzos"}>Buzos</NavLink>
				<NavLink to={"/category/zapatillas"}>Zapatillas</NavLink>
				<NavLink to={"/category/accesorios"}>Accesorios</NavLink>
				<NavLink to={"/category/pantalones"}>Pantalones</NavLink>

				{isAdmin && <Link to="/admin">Gestión</Link>}
			</nav>
		</header>
	);
};

export default NavBar;
