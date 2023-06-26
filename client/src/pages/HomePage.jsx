import "../styles/homePage.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Card from "../components/Card";

export default function HomePage() {
  return (
    <HelmetProvider>
      <Helmet>
        <style>{`body { background-color: #2a9c9d; }`}</style>
      </Helmet>
      <div className="containerHome">
        <h1>HomePage</h1>
        <Card />
        </div>
    </HelmetProvider>
  );
}
