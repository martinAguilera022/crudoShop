import { Link } from "react-router-dom";
import "./CategoryGrid.css";
const CategoryGrid = () => {
  return (
   <section className="categoriesPadre">
   <section className="categories">

      <Link to="/category/buzos" className="itemsCat buzos">
        <p className="CatNombre">Buzos</p>
      </Link>

      <Link to="/category/accesorios" className="itemsCat accesorios">
        <p className="CatNombre">Accesorios</p>
      </Link>

      <Link to="/category/pantalones" className="itemsCat pantalones">
        <p className="CatNombre">Pantalones</p>
      </Link>

      <Link to="/category/remeras" className="itemsCat remeras">
        <p className="CatNombre">Remeras</p>
      </Link>

      <Link to="/category/zapatillas" className="itemsCat zapatillas">
        <p className="CatNombre">Zapatillas</p>
      </Link>

    </section>
    </section>
  );
};

export default CategoryGrid;