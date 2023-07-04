import React, { useEffect, useState } from "react";
import { productsRequest } from "../api/auth";
import Card from '../components/Card';
import "../styles/cupCakes.css";

export default function CupCakes() {
  const [products, setProducts] = useState([]);
  const [cardsLoaded, setCardsLoaded] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await productsRequest();
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setCardsLoaded(true);
    }
  }, [products]);

  const categories = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  return (
    <div className="container">
      {cardsLoaded ? (
        <>
          {categories.map((category) => (
            <div key={category}>
              <h2 className="category-heading">{category}</h2>
              <div className="card-grid">
                {products
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <div key={product.productId} className="card-item">
                      <Card
                        image={product.urlImage}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
