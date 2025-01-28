import { Link } from "react-router-dom"

function Error(){

    return(
        <div>
            <h1>Error 404</h1>
            <h2>La pagina que buscas no existe</h2>
            <Link to="/">Volver a la pagina principal</Link>
        </div>
    )
}

export default Error