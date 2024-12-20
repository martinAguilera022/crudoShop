import React from "react";
import CartWidget from "./CartWidget";
const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="logo">CRUDO</div>
			<ul className="nav-links">
				<li>
					<a href="#">INICIO</a>
				</li>
				<li>
					<a href="#">OFERTAS</a>
				</li>
				<li>
					<a href="#">BUZOS</a>
				</li>
				<li>
					<a href="#">REMERAS</a>
				</li>
			</ul>
			
            <CartWidget />
		</nav>
	);
};

export default NavBar;
