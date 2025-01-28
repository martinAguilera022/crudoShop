import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";

import Error from "./pages/Error";
import Layout from "./pages/Layout";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<ItemListContainer />} />
					<Route path="/category/:categoryId" element={<ItemListContainer />} />
					<Route path="/item/:itemId"element ={<ItemDetailContainer />} />
					
					
				</Route>

				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
