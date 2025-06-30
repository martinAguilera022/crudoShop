import { useEffect, useState } from "react";
import "./CargarProductos.css"; // Importa los estilos
import useFirebase from "../../config/useFireBase";

function CargarProductos() {
  const {
    itemsList,
    ordersList,
    checkAdminStatus,
    onSubmitItem,
    deleteItem,
    deleteOrder,
    entregado,
    getOrdersByEstate,
    getItemsList,
    getOrdersList,
    updatedItem,
  } = useFirebase();

  // Estados para el popup de edición
  const [updatedNombre, setUpdatedNombre] = useState("");
  const [updatedPrecio, setUpdatedPrecio] = useState(0);
  const [updatedStock, setUpdatedStock] = useState(0);
  const [updatedDescripcion, setUpdatedDescripcion] = useState("");
  const [updatedCategoria, setUpdatedCategoria] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedOfferPercentage, setUpdatedOfferPercentage] = useState(0);

  // Otros estados
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [disabledOrders, setDisabledOrders] = useState({});

  // Estados del formulario de nuevo producto
  const [offerPercentage, setOfferPercentage] = useState(0);
  const [title, setNewItemNombre] = useState("");
  const [price, setNewItemPrecio] = useState(0);
  const [stock, setNewItemStock] = useState(0);
  const [description, setNewItemDescripcion] = useState("");
  const [category, setNewItemCategoria] = useState("");
  const [image, setNewItemImage] = useState(""); // acá se guarda el archivo seleccionado
  const [uploading, setUploading] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState("productos"); // "productos" o "ordenes"

  useEffect(() => {
    checkAdminStatus()
      .then((isAdmin) => setIsAdmin(isAdmin))
      .catch((err) => console.error("Error al verificar estado de admin:", err));

    getOrdersList()
      .then(() => {
        const updatedDisabledOrders = {};
        ordersList.forEach((order) => {
          if (order.estate === "Entregado") {
            updatedDisabledOrders[order.id] = true;
          }
        });
        setDisabledOrders(updatedDisabledOrders);
      })
      .catch((err) => console.error("Error al obtener órdenes:", err));

    getItemsList();
  }, []);
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "productos_CrudoShop"); // Tu preset aquí

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxenwrvi3/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("❌ Error al subir imagen a Cloudinary:", error);
    throw error;
  }
};


  const openPopup = (item) => {
    setSelectedItem(item);
    setUpdatedNombre(item.title);
    setUpdatedPrecio(item.price);
    setUpdatedStock(item.stock);
    setUpdatedDescripcion(item.description);
    setUpdatedCategoria(item.category);
    setUpdatedImage(item.image);
    setUpdatedOfferPercentage(item.offerPercentage);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  const handleUpdateItem = () => {
    updatedItem(selectedItem.id, {
      title: updatedNombre,
      price: updatedPrecio,
      description: updatedDescripcion,
      category: updatedCategoria,
      offerPercentage: updatedOfferPercentage,
      image: updatedImage,
      stock: updatedStock,
    })
      .then(() => {
        getItemsList();
        closePopup();
      })
      .catch((err) => console.error("Error al actualizar el producto:", err));
  };

  const handleEntregado = (orderId) => {
    entregado(orderId).then(() => {
      setDisabledOrders((prev) => ({ ...prev, [orderId]: true }));
      getOrdersList();
    });
  };

  const handleOrdenEliminado = (orderId) => {
    deleteOrder(orderId).then(() => {
      getOrdersList();
    });
  };

  // ✅ AHORA se sube la imagen en este paso, no al seleccionarla
  const handleSubmitItem = async () => {
  if (title && price && stock && description && category && image) {
    try {
      await onSubmitItem({
        title,
        price,
        stock,
        description,
        category,
        image, // ← ahora es una URL válida
        offerPercentage,
      });

      await getItemsList();
      alert("✅ Producto guardado correctamente");
    } catch (error) {
      console.error("❌ Error al guardar el producto:", error);
      alert("Error al guardar el producto");
    }
  } else {
    alert("⚠️ Por favor complete todos los campos.");
  }
};


  return (
    <div className="cargar-productos-container">
      {isAdmin ? (
        <>
          <div className="mobile-toggle">
            <button onClick={() => setView(view === "productos" ? "ordenes" : "productos")}>
              {view === "productos" ? "Ver Órdenes" : "Cargar Datos"}
            </button>
          </div>

          <div className={`form-container productos ${view === "ordenes" ? "hidden-mobile" : ""}`}>
            <h1>Cargar Productos</h1>

            {/* ✅ Input para seleccionar la imagen */}
            <input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setNewItemImage(url); // guardás la URL, no el archivo
      alert("✅ Imagen subida correctamente");
    } catch (error) {
      alert("❌ Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  }}
/>


            <input placeholder="Nombre" onChange={(e) => setNewItemNombre(e.target.value)} />
            <input placeholder="Precio" type="number" onChange={(e) => setNewItemPrecio(Number(e.target.value))} />
            <input placeholder="Descripción" onChange={(e) => setNewItemDescripcion(e.target.value)} />
            <select className="select" id="categoria" onChange={(e) => setNewItemCategoria(e.target.value)}>
              <option value={""}>Categoría</option>
              <option value="ropa femenina">Ropa Femenina</option>
              <option value="Ropa de hombre">Ropa de Hombre</option>
              <option value="Electrónica">Electrónica</option>
              <option value="Joyería">Joyería</option>
              <option value="Zapatilla">Zapatilla</option>
              <option value="Articulo">Articulo</option>
            </select>
            <input placeholder="Stock" type="number" onChange={(e) => setNewItemStock(Number(e.target.value))} />

            {/* ✅ El botón ahora sube la imagen al hacer clic */}
            <button onClick={handleSubmitItem} disabled={uploading}>
              {uploading ? "Subiendo imagen..." : "Guardar Producto"}
            </button>

            {/* Lista de productos cargados */}
            <div className="product-list">
              <h2>Lista de Productos</h2>
              <p>Cantidad de Productos: {itemsList.length}</p>
              {itemsList.map((item) => (
                <div className="product-card" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="product-info">
                    <h2>{item.title}</h2>
                    <div>
                      {item.offerPercentage > 0 ? (
                        <>
                          <p>
                            <strong>Precio:</strong>{" "}
                            <span className="price-old">${item.price.toLocaleString("es-AR")}</span>{" "}
                            <span className="price-new">
                              ${Math.round(item.price * (1 - item.offerPercentage / 100)).toLocaleString("es-AR")}
                            </span>
                          </p>
                          <p className="offer-label">-{item.offerPercentage}% OFF</p>
                        </>
                      ) : (
                        <p><strong>Precio:</strong> ${item.price.toLocaleString("es-AR")}</p>
                      )}
                      <p><strong>Stock:</strong> {item.stock}</p>
                    </div>
                  </div>
                  <div>
                    <button className="delete-btn" onClick={() => deleteItem(item.id)}>Borrar</button>
                    <button className="edit-btn" onClick={() => openPopup(item)}>Detalles</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Popup para editar producto */}
            {isPopupOpen && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h2>Detalles del Producto</h2>
                  <input placeholder="Nombre" value={updatedNombre} onChange={(e) => setUpdatedNombre(e.target.value)} />
                  <input placeholder="Precio" type="number" value={updatedPrecio} onChange={(e) => setUpdatedPrecio(Number(e.target.value))} />
                  <input placeholder="Stock" type="number" value={updatedStock} onChange={(e) => setUpdatedStock(Number(e.target.value))} />
                  <input placeholder="Descripción" value={updatedDescripcion} onChange={(e) => setUpdatedDescripcion(e.target.value)} />
                  <select className="select" onChange={(e) => setUpdatedCategoria(e.target.value)} value={updatedCategoria}>
                    <option value="">Categoría</option>
                    <option value="ropa femenina">Ropa Femenina</option>
                    <option value="Ropa de hombre">Ropa de Hombre</option>
                    <option value="Electrónica">Electrónica</option>
                    <option value="Joyería">Joyería</option>
                    <option value="Zapatilla">Zapatilla</option>
                    <option value="Articulo">Articulo</option>
                  </select>
                  <label>Oferta  
                    <input type="number" placeholder="Porcentaje Descuento" value={updatedOfferPercentage} onChange={(e) => setUpdatedOfferPercentage(Number(e.target.value))} />
                  </label>
                  <input placeholder="Imagen URL" value={updatedImage} onChange={(e) => setUpdatedImage(e.target.value)} />
                  <button onClick={handleUpdateItem}>Guardar</button>
                  <button onClick={closePopup}>Cerrar</button>
                </div>
              </div>
            )}
          </div>

          {/* Lista de Órdenes */}
          <div className={`orders-list ordenes ${view === "productos" ? "hidden-mobile" : ""}`}>
            <h1>Órdenes</h1>
            <div className="order-filters">
              <button onClick={() => getOrdersList()}>Todas</button>
              <button onClick={() => getOrdersByEstate("Entregado")}>Entregadas</button>
              <button onClick={() => getOrdersByEstate("Pendiente")}>Pendientes</button>
            </div>
            {ordersList && ordersList.length > 0 ? (
              ordersList.map((order) => (
                <div className="order-card" key={order.id}>
                  <h2>Comprador: {order.buyer.name}</h2>
                  <p><strong>Estado:</strong> {order.estate}</p>
                  <p><strong>Teléfono:</strong> {order.buyer.phone}</p>
                  <p><strong>Email:</strong> {order.buyer.email}</p>
                  <p><strong>Fecha:</strong> {new Date(order.date.seconds * 1000).toLocaleString()}</p>
                  <div className="order-items">
                    <h3>Productos:</h3>
                    {order.items.map((product, index) => (
                      <div key={index} className="order-item">
                        <div className="product-img"><img src={product.image} alt={product.title} /></div>
                        <div className="product-details">
                          <p><strong>Cantidad:</strong> {product.quantity}</p>
                          <p><strong>Producto:</strong> {product.title}</p>
                          <p><strong>Precio:</strong> ${product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p><strong>Total:</strong> {order.total}</p>
                  <button
                    className={`entregado-btn ${disabledOrders[order.id] ? "disabled" : ""}`}
                    onClick={() => handleEntregado(order.id)}
                    disabled={disabledOrders[order.id]}
                  >
                    {disabledOrders[order.id] ? "Entregado" : "Marcar Entregado"}
                  </button>
                  <button className="delete-btn" onClick={() => handleOrdenEliminado(order.id)}>Eliminar</button>
                </div>
              ))
            ) : (
              <p>No hay órdenes disponibles</p>
            )}
          </div>
        </>
      ) : (
        <p>No tienes permisos para ver esta sección.</p>
      )}
    </div>
  );
}

export default CargarProductos;
