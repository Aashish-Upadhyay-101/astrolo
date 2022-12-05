import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="text-2">
          <Link to="/">
            Astrol<span className="text-color-primary">o</span>
          </Link>
        </h1>
      </div>

      <ul className="navbar__right text-1">
        <li className="navbar__right-link">
          <Link to="/login">Login</Link>
        </li>
        <li className="navbar__right-link">
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
