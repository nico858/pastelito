import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import "../styles/navBar.scss";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user} = useAuth();
  console.log(isAuthenticated, user);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__content__logo">
          Benzema Cakes
        </Link>
        {(location.pathname !== "/login" && location.pathname !== "/register") && (
          <>
            <nav
              className={`header__content__nav ${
                menuOpen && size.width < 768 ? "isMenu" : ""
              }`}
            >
              <ul>
                <li>
                  <Link to="/catalogo">Catalogo</Link>
                </li>
                <li>
                  <Link to="/customCupCakes">Crea tu pastel</Link>
                </li>
                <Link to="/register">
                  <button className="btn">Inscríbete</button>
                </Link>
                <Link to="/login">
                  <button className="btn btn__login">Inicia sesión</button>
                </Link>
              </ul>
            </nav>
            <div className="header__content__toggle">
              {!menuOpen ? (
                <BiMenuAltRight onClick={menuToggleHandler} />
              ) : (
                <AiOutlineClose onClick={menuToggleHandler} />
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
