import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Ch1m3rical. Built with React and GitHub Pages.</p>
      <p className="footer__meta">
        <span>Last updated: {year}</span>
      </p>
    </footer>
  );
}
