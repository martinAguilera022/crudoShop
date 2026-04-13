import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFirebase from "../../config/useFireBase";
import "./MostPopular.css";

const MostPopular = () => {
  const { itemsList, getItemsList } = useFirebase();
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getItemsList();
  }, []);

  useEffect(() => {
    if (itemsList.length > 0) {
      const sorted = [...itemsList]
        .sort((a, b) => (b.vecesVendido ?? 0) - (a.vecesVendido ?? 0))
        .slice(0, 6);

      setPopular(sorted);
    }
  }, [itemsList]);

  return (
    <section className="popular">
      <h2>Tendencias</h2>

      <div className="popular-row">
        {popular.map((prod) => {
          const price = Number(prod.price);
          const discount = Number(prod.offerPercentage);
          const finalPrice = price * (1 - discount / 100);

          return (
            <div key={prod.id} className="popular-card">
              {discount > 0 && <div className="offer-badge">{discount}% OFF</div>}
  <img src={prod.image} alt={prod.title} className="card-img" />

  <div className="card-bottom">

    <div className="card-info">
      <h3>{prod.title}</h3>
    </div>

    <div className="card-actions">
      {discount > 0 ? (
        <div className="card-price">
          <span className="new">
            ${Math.round(finalPrice).toLocaleString("es-AR")}
          </span>
          <span className="old">
            ${price.toLocaleString("es-AR")}
          </span>
        </div>
      ) : (
        <span className="new">
          ${price.toLocaleString("es-AR")}
        </span>
      )}

      <Link to={`/item/${prod.id}`} className="btn-ver">
        Ver
      </Link>
    </div>

  </div>

</div>
          );
        })}
      </div>
    </section>
  );
};

export default MostPopular;