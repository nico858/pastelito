import React, { useEffect, useState } from "react";
import "../styles/shoppingCar.css";
import { useAuth } from "../context/AuthContext";
import jwtDecode from 'jwt-decode';


export default function ShoppingCar() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [tokenInfo, setTokenInfo] = useState(null);
  const { user } = useAuth();
  //console.log("isAuthenticated", user);

  let contID = 0;

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setTokenInfo(decodedToken);
        //console.log(decodedToken);
      } catch (error) {
        //console.log("Error al decodificar el token:", error.message);
        return;
      }
    } else {
      //console.log("No se encontró el token en la cookie.");
      return;
    }
  }, [user]);


  useEffect(() => {
    const itemsString = localStorage.getItem("items");
    const items = JSON.parse(itemsString);
    setCartItems(items);

    let cartTotal = 0;
    if (items) {
      items.forEach((item) => {
        cartTotal += item.totalPrice;
      });
    }
    setTotal(cartTotal);
  }, []);

  const handleRemoveItem = (itemTitle) => {
    //Filter the cart items, excluding the item with the specified title

    const updatedItems = cartItems.filter((item) => item.title !== itemTitle);

    //Update the cart items
    setCartItems(updatedItems);

    //Save the updated items in the localStorage
    localStorage.setItem("items", JSON.stringify(updatedItems));

    // Calculate the new total
    let cartTotal = 0;
    if (updatedItems) {
      updatedItems.forEach((item) => {
        cartTotal += item.totalPrice;
      });
    }
    setTotal(cartTotal);
  };

  const handleOrder = () => {
    console.log("Generando pedido...");
    const objectOrder = {
      products: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      clientId: tokenInfo.sub,
    };
    console.log(objectOrder);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems?.length > 0 ? (
        <div className="cart-container">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={contID++}>
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
                <button onClick={() => handleRemoveItem(item.title)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="cart-item">
            <div className="cart-item-details">
              <h5>Total: ${total}</h5>
            </div>
            <div className="cart-item-button">
              <button onClick={handleOrder}>Generar pedido</button>
            </div>
          </div>
        </div>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
}
