import React from "react";
import NavBar from "./components/NavBar";
import "./styles.css"
import ItemListContainer from './components/ItemListContainer';
function App() {
	return (
		<div className="App">
			<header>
				<NavBar />
			</header>
			<main>
                <ItemListContainer greeting="Bienvenido a Crudo" />
			</main>
		</div>
	);
}

export default App;
