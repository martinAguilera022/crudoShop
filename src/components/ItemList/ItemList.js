import "./ItemListContainer.css";
import Item from "../Item/Item";
import Carousel from "../Carrousel/Carrousel";
const ItemList = ({ productos }) => {
	const banners = ["/50OFF.png", "/BannerCrudo.png","/CrudoShopBanner.png"];
	return (
		<div>
			<Carousel images={banners} autoPlay={true} delay={4000} />

			{productos.length > 0 ? (
				<div className="productos-container">
					{productos.map((producto) => {
						const formattedPrice = producto.price.toLocaleString("es-AR", {
							style: "currency",
							currency: "ARS",
						});
						return (
							<Item
								key={producto.id}
								id={producto.id}
								image={producto.image}
								title={producto.title}
								price={formattedPrice}
								offerPercentage={producto.offerPercentage}
								category={producto.category}
								description={producto.description}
								stock={producto.stock}
							/>
						);
					})}
				</div>
			) : (
				<p className="loading-text">Cargando productos...</p>
			)}
		</div>
	);
};

export default ItemList;
