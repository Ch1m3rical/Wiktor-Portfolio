import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    function evaluateMatch() {
      if (typeof window === "undefined") {
        return;
      }
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    }

    evaluateMatch();
    window.addEventListener("resize", evaluateMatch);
    return () => window.removeEventListener("resize", evaluateMatch);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setCollapsed(false);
      return undefined;
    }

    function handleScroll() {
      if (typeof window === "undefined") return;
      setCollapsed(window.scrollY > 48);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <header className={`navbar${collapsed ? " navbar--collapsed" : ""}`}>
      <div className="navbar__inner">
        <div className="navbar__top">
          <button
            className="navbar__brand"
            onClick={() => navigate("/")}
          >
            <span className="navbar__logo">{"<dev/>"}</span>
            <span className="navbar__name">Ch1m3rical</span>
          </button>
          <ThemeToggle />
        </div>

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
      </div>
    </header>
  );
}
