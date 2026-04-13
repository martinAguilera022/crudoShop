import "./ItemListContainer.css";
import Item from "../Item/Item";
import Carousel from "../Carrousel/Carrousel";
import CategoryGrid from "../CategoryGrid/CategoryGrid";
import MostPopular from "../MostPopular/MostPopular";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import SkeletonItem from "../SkeletonItem/SkeletonItem";
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner.jsx";
import SkeletonCategory from "../SkeletonCategory/SkeletonCategory";
import SkeletonPopular from "../SkeletonPopular/SkeletonPopular";

const ItemList = ({ productos, loading }) => {
	const { categoryId } = useParams();

	const banners = [
		"/Modacollage.png",
		"/Coleccióndemodaurbanacruda.png",
		"/Estilo urbano y energía cruda.png",
		"/Nueva colección urbana cruda.png",
	];

	const container = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.08,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20, scale: 0.95 },
		show: { opacity: 1, y: 0, scale: 1 },
	};

	return (
		<motion.div
			key={categoryId || "home"}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			{/* 🔥 SOLO HOME */}
			{!categoryId && (
				<>
					{loading ? (
						<>
							<SkeletonBanner />
							<SkeletonCategory />
							<SkeletonPopular />
						</>
					) : (
						<>
							<Carousel images={banners} autoPlay delay={4000} />
							<CategoryGrid />
							<MostPopular productos={productos} />
						</>
					)}
				</>
			)}

			<h2 className="productos-title">
				{categoryId ? categoryId.toUpperCase() : "CRUDO"}
			</h2>

			{/* 🔥 SIN FLICKER */}

			{loading ? (
				<div className="productos-container">
					{[...Array(6)].map((_, i) => (
						<SkeletonItem key={i} />
					))}
				</div>
			) : (
				<motion.div
					className="productos-container"
					variants={container}
					initial="hidden"
					animate="show"
				>
					{productos.map((producto) => {
						const formattedPrice = producto.price.toLocaleString("es-AR", {
							style: "currency",
							currency: "ARS",
						});

						return (
							<motion.div
								key={producto.id}
								className="grid-item"
								variants={item}
								whileHover={{ scale: 1.05 }} // 🔥 hover pro
							>
								<Item {...producto} price={formattedPrice} />
							</motion.div>
						);
					})}
				</motion.div>
			)}
		</motion.div>
	);
};

export default ItemList;
