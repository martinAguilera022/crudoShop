import './ItemListContainer.css';
import Item from '../Item/Item';

const ItemList = ({ productos }) => {
    return (
        <div>
            {productos.length > 0 ? (
                <div className="productos-container">
                    {productos.map((producto) => {
                        
                        return (
                            <Item
                                key={producto.id}
                                id={producto.id} 
                                image={producto.image}
                                title={producto.title}
                                price={producto.price}
                                category={producto.category}

                                description={producto.description}
                            />
                        );
                    })}
                </div>
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>
    );
};

export default ItemList;
