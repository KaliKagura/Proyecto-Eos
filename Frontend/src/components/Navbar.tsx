import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // 👈 aquí usas tu CSS personalizado

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Proyecto EOS</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/predicciones">Predicciones</Link>
        </li>
        <li>
          <Link to="/cargar">Subidas</Link>
        </li>
        <li>
          <Link to="/reportes">Reportes</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Registro</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;