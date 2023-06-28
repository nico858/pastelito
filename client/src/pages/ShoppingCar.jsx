import React, { useEffect, useState } from "react";
import "../styles/shoppingCar.css"; // Importa tu archivo CSS para los estilos

export default function ShoppingCar() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const itemsString = localStorage.getItem("items");
    const items = JSON.parse(itemsString);
    setCartItems(items);
  }, []);

  const handleRemoveItem = (itemTitle) => {
    // Filtra los productos del carrito, excluyendo el producto con el título especificado
    const updatedItems = cartItems.filter((item) => item.title !== itemTitle);

    // Actualiza los productos del carrito
    setCartItems(updatedItems);

    // Guarda los productos actualizados en el localStorage
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };



  let total = 0;

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems?.length > 0 ? (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div className="cart-item" key={total++}>
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.totalPrice}</p>
              </div>
              <div className="cart-item-button">
                <button onClick={() => handleRemoveItem(item.title)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
}
