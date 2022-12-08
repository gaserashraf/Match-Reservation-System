import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);

  const toogleMobileIcon = () => setMobileView(!mobileView);
  const gusetLinks = (
    <>
      <li className="nav-item">
        <Link
          className="nav-links"
          to="/register"
          onClick={() => setMobileView(false)}
        >
          Regsiter
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-links"
          to="/login"
          onClick={() => setMobileView(false)}
        >
          Login
        </Link>
      </li>
    </>
  );

  return (
    <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
      <h1>
        <Link to="/">
          <i className="fas fa-trophy mr-1"></i>
          Qatar 2022
        </Link>
      </h1>

      <div class="justify-content-end">
        <button class="navbar-toggler" onClick={toogleMobileIcon}>
          <i
            className={`text-dark ${
              mobileView ? "fas fa-times" : "fas fa-bars"
            }`}
          />
        </button>
        <ul className={(mobileView ? "nav-menu active" : "nav-menu")+" mb-0"}>
          {gusetLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
