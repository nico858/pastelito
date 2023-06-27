import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="footer-title">Benzema Cakes</h2>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Contáctanos:</h3>
          <ul className="footer-contact-list">
            <li className="footer-contact-item">Teléfono: 3147222389</li>
            <li className="footer-contact-item">Teléfono: 3122569874</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Síguenos en:</h3>
          <ul className="footer-social-icons">
            <li className="footer-social-icon">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="footer-social-icon">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className="footer-social-icon">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2023 Benzema Cakes – Todos los derechos reservados.</div>
    </footer>
  );
};

export default Footer;
