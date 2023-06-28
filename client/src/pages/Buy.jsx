import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/buy.css';

const Buy = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cardDataString = params.get('cardData');
  const navigate = useNavigate();
  let cardData = null;

  const handleChange = () => {
    const currentItemsString = localStorage.getItem('items');
    const currentItems = currentItemsString ? JSON.parse(currentItemsString) : [];

    // Buscar si el producto ya existe en el carrito
    const existingItemIndex = currentItems.findIndex(item => item.title === cardData.title);

    if (existingItemIndex !== -1) {
      // Si el producto ya existe, incrementar la cantidad y actualizar el precio total
      currentItems[existingItemIndex].quantity += 1;
      currentItems[existingItemIndex].totalPrice = currentItems[existingItemIndex].price * currentItems[existingItemIndex].quantity;
    } else {
      // Si el producto no existe, agregarlo al carrito con la cantidad y el precio total
      cardData.quantity = 1;
      cardData.totalPrice = cardData.price;
      currentItems.push(cardData);
    }

    localStorage.setItem('items', JSON.stringify(currentItems));
    navigate('/shoppingCar');
  };

  try {
    cardData = cardDataString ? JSON.parse(decodeURIComponent(cardDataString)) : null;
  } catch (error) {
    console.error('Error parsing card data:', error);
  }

  return (
    <div>
      {cardData && (
        <div className="card-container">
          <div className="card-image">
            <img src={cardData.image} alt={cardData.title} />
          </div>
          <div className="card-details">
            <h2>{cardData.title}</h2>
            <p>{cardData.description}</p>
            <p>Precio: ${cardData.price}</p>
            <button onClick={handleChange}>Añadir al carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
