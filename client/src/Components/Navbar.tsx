import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="text-2">
          Astrol<span className="text-color-primary">o</span>
        </h1>
      </div>

      <ul className="navbar__right text-1">
        <li className="navbar__right-link">
          <a>Login</a>
        </li>
        <li className="navbar__right-link">
          <a>Sign up</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
