import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";

import Error from "./pages/Error";
import Layout from "./pages/Layout";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import CargarProductos from "./components/CargaProductos/CargarProductos";
import AuthForm from "./components/AuthForm/AuthForm";

function App() {
	return (
		<BrowserRouter>
			<CartProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						
						<Route index element={<ItemListContainer />} />
						<Route path="/auth" element={<AuthForm />} />

						<Route
							path="/category/:categoryId"
							element={<ItemListContainer />}
						/>
						<Route path="/item/:itemId" element={<ItemDetailContainer />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/admin" element={<CargarProductos />} />
						<Route path="/checkout" element={<Checkout />} />
					</Route>

					<Route path="*" element={<Error />} />
				</Routes>
			</CartProvider>
		</BrowserRouter>
	);
}

export default App;
