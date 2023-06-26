import "../styles/homePage.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { productsRequest } from "../api/auth";

import Card from "../components/Card";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await productsRequest();
      console.log(res.data);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <style>{`body { background-color: #2a9c9d; }`}</style>
      </Helmet>
      <div className="containerHome">
        <h1>HomePage</h1>
        <div className="container">
          <div className="row">
            {product &&
              product.slice(0, 6).map((item) => (
                <div className="col-md-4" key={item.productId}>
                  <Card title={item.name} description={item.description} image={item.urlImage} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
