import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import listaProductos from "../data";



 

function DetalleProducto(){

 

    const {productoId} = useParams();

    const producto = listaProductos.find((producto)=>producto.id == productoId);

    const { images, title, price, description } = producto

    return (

        <div>

            <h1>Detalle Producto</h1>

            <div className="productos-container">

                <img src={images}/>

                <h2>{title}</h2>

                <h3>{description}</h3>

                <p>{price}$</p>

                <Link to="/productos">Volver</Link>

            </div>
        </div>

            )

}

 

export default DetalleProducto;