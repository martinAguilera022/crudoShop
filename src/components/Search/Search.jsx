import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const search = query.get("q")?.toLowerCase() || "";

  useEffect(() => {
    const getProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const result = products.filter(p =>
      p.title.toLowerCase().includes(search)
    );

    setFiltered(result);
  }, [products, search]);

  return (
    <div>
      <h2>Resultados para: {search}</h2>

      {filtered.length === 0 ? (
        <p>No se encontraron productos</p>
      ) : (
        filtered.map(p => (
          <div key={p.id}>{p.title}</div>
        ))
      )}
    </div>
  );
};

export default Search;