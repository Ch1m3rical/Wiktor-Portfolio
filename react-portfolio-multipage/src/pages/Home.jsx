import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const portraitSrc = useMemo(
    () => `${import.meta.env.BASE_URL}portrait.jpg`,
    []
  );

  return (
    <section className="section section--hero">
      <div className="hero">
        <div className="hero__text">
          <p className="hero__eyebrow">Hi, I’m</p>
          <h1 className="hero__title">Wiktor Wojtan</h1>
          <p className="hero__subtitle">
            A <span className="hero__highlight">Software Developer</span> focused on creating clean, performant web experiences while constantly exploring new ideas and technologies.
          </p>

          <p className="hero__description">
            I build sleek, maintainable interfaces with React, TypeScript, and modern tools, but my curiosity goes far beyond the front end. I enjoy diving into algorithms, blending finance with technology, and experimenting with robotics. I’m a creative problem-solver at heart, always exploring new fields and refining my skills. Here, you’ll find some of my GitHub projects and a simple way to reach me.
          </p>

          <div className="hero__actions">
            <Link to="/projects" className="button button--primary">
              View Projects
            </Link>
            <a
              href="https://github.com/Ch1m3rical"
              target="_blank"
              rel="noreferrer"
              className="button button--ghost"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="hero__photo-wrapper">
          <img
            src={portraitSrc}
            alt="Ch1m3rical"
            className="hero__photo"
          />
        </div>
      </div>
    </section>
  );
}
