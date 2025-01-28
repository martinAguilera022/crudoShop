import React from "react";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="logo">
				<Link to="/" className="link">CRUDO</Link>
			</div>
			<ul className="nav-links">
				<NavLink to={"/category/women's clothing"} className="link">
					Ropa Mujer
				</NavLink>
				<NavLink to={"/category/men's clothing"} className="link">
					Ropa Hombre
				</NavLink>
				<NavLink to={"/category/electronics"} className="link">
					Electronica
				</NavLink>
				<NavLink to={"/category/jewelery"} className="link">
					Joyeria
				</NavLink>
			</ul>

			<CartWidget />
		</nav>
	);
};

export default NavBar;
