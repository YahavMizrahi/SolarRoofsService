import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import Logo from "./Logo.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">
            <Link to="/">
              <img className="website-logo" src={Logo} alt=""></img>
              <span>S</span>olar <span>R</span>oofs <span>S</span>ervice
            </Link>
          </h1>
          <ul>
            <li>
              <Link to="/service/private">Private service</Link>
            </li>
            <li>
              <Link to="/service/organizational">Organizational service</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
