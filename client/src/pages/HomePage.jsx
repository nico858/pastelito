import "../styles/homePage.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function HomePage() {
  return (
    <HelmetProvider>
      <Helmet>
        <style>{`body { background-color: #2a9c9d; }`}</style>
      </Helmet>
      <div className="containerHome">HomePage</div>
    </HelmetProvider>
  );
}
