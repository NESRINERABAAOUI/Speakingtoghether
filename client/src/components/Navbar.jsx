// src/components/NavBar.js
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.scss";
import logo from "../assets/images/logo.png";
import burgerIcon from "../assets/images/burger.jpg";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
    toggleMenu();
  };

  return (
    <div className="nav-bar">
      <img className="nav-logo" src={logo} alt="logo" />

      <nav ref={menuRef}>
        <button
          type="button"
          aria-label="burgerMenu"
          className="burgerMenu"
          onClick={toggleMenu}
        >
          <img
            className={`burger-bar ${menuOpen ? "clicked" : "unclicked"}`}
            src={burgerIcon}
            alt="Burger Icon"
          />
        </button>
        <ul className={`menu ${menuOpen ? "visible" : "hidden"}`}>
          <img className="phone-menu-logo" src={logo} alt="logo" />

          <li>
            <Link
              to="/"
              onClick={toggleMenu}
              aria-label="link to the Home page"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/traducteur"
              onClick={toggleMenu}
              aria-label="link to translator page"
            >
              Service
            </Link>
          </li>
          <li>
            <Link
              to="/devis"
              onClick={toggleMenu}
              aria-label="link estimation page"
            >
              Devis
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={toggleMenu}
              aria-label="link to contact page"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              onClick={toggleMenu}
              aria-label="link to profile page"
            >
              Profil
            </Link>
          </li>
          <li>
            <button onClick={handleAuthClick} className="nav-auth-btn">
              {isLoggedIn ? "Déconnexion" : "Connexion"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
