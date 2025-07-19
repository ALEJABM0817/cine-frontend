import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__link logo">
          <img src="/favicon.png" alt="Logo" className="navbar__logo" /><span>Cine App</span>
        </Link>
        {role === "administrador" && (
          <Link to="/admin/panel" className="navbar__link">
            Admin
          </Link>
        )}
      </div>
      <div className="navbar__right">
        {user ? (
          <>
            <span className="navbar__greeting">Hola {user.nombre}</span>
            <button onClick={handleLogout} className="navbar__button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar__link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
