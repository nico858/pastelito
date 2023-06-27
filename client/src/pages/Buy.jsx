import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/buy.css';

const Buy = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cardDataString = params.get('cardData');
  const navigate = useNavigate();
  let cardData = null;

  const handleChange = () => {
    console.log('Añadir al carrito');
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
