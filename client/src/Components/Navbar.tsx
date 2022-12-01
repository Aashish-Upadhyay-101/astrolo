import React, { useState } from "react";
import { Avatar } from "antd";
import { BellOutlined, HeartOutlined, UserOutlined } from "@ant-design/icons";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
