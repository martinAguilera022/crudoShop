import "./Cart.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
	const { cart, clearCart, totalQuantity, total } = useContext(CartContext);

	if (totalQuantity === 0) {
		return (
			<div className="cart-empty">
				<h2>El carrito está vacío</h2>
				<Link to="/">
					<button>Ir a comprar</button>
				</Link>
			</div>
		);
	}

	return (
		<div className="cart-container">
			<div className="cart-items">
				{cart.map((p) => (
					<CartItem key={p.id} {...p} />
				))}
			</div>

			<div className="cart-summary">
				<h3>Total: {total()}</h3>
			</div>

			<div className="cart-actions">
				<button className="clear-cart-btn" onClick={clearCart}>
					Vaciar carrito
				</button>
				<Link to="/checkout">
					<button>Finalizar compra</button>
				</Link>
			</div>
		</div>
	);
};

export default Cart;
