import { Link } from "react-router-dom";
import "../styles/card.css";

export default function Card({ title, description, image, price }) {
  return (
    <Link to="/buy" className="link-card">
      <div className="card animate__animated animate__fadeInUp">
        <div className="overflow">
          <img src={image} alt="..." className="card-img-top" />
        </div>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{description}</p>
          <p className="card-text">${price}</p>
        </div>
      </div>
    </Link>
  );
}
