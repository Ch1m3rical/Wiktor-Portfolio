import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <button
          className="navbar__brand"
          onClick={() => navigate("/")}
        >
          <span className="navbar__logo">{"<dev/>"}</span>
          <span className="navbar__name">Ch1m3rical</span>
        </button>

        <nav className="navbar__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "navbar__link" + (isActive ? " navbar__link--active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              "navbar__link" + (isActive ? " navbar__link--active" : "")
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              "navbar__link" + (isActive ? " navbar__link--active" : "")
            }
          >
            Contact
          </NavLink>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
