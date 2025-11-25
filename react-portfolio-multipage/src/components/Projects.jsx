import React, { useMemo, useState } from "react";
import {
  useGithubProjects,
  GITHUB_USERNAME,
} from "../hooks/useGithubProjects.js";

const OG_IMAGE_BASE_URL = "https://opengraph.githubassets.com/1";

function withBasePath(path = "") {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}

function getCuratedImagePath(repoName) {
  return withBasePath(
    `project-images/${encodeURIComponent(repoName)}.jpg`
  );
}

function getOgPreviewUrl(repo) {
  const owner =
    repo.owner?.login ||
    (repo.full_name ? repo.full_name.split("/")[0] : GITHUB_USERNAME);
  return `${OG_IMAGE_BASE_URL}/${encodeURIComponent(owner)}/${encodeURIComponent(
    repo.name
  )}`;
}

export default function Projects() {
  const { repos, loading, error } = useGithubProjects();
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState("updated");
  const [query, setQuery] = useState("");

  const languages = useMemo(() => {
    const set = new Set();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return ["All", ...Array.from(set).sort()];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    let list = [...repos];

    if (selectedLanguage !== "All") {
      list = list.filter((r) => r.language === selectedLanguage);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description || "").toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (sortBy === "stars") {
        return b.stargazers_count - a.stargazers_count;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    return list;
  }, [repos, selectedLanguage, sortBy, query]);

  return (
    <div className="projects">
      <header className="section__header">
        <h2>Projects</h2>
        <p>
          These projects are fetched live from my{" "}
          <a
            href="https://github.com/Ch1m3rical"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{" "}
          and auto-update as I build new things.
        </p>
      </header>

      <div className="projects__controls">
        <div className="projects__control">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="projects__control">
          <label htmlFor="sortBy">Sort by</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="updated">Last updated</option>
            <option value="stars">Stars</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="projects__control projects__control--search">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="search"
            placeholder="Filter by name or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loading && <p className="projects__status">Loading projects…</p>}
      {error && (
        <p className="projects__status projects__status--error">
          {error}
        </p>
      )}

      {!loading && !error && filteredRepos.length === 0 && (
        <p className="projects__status">
          No projects found. Try changing filters.
        </p>
      )}

      <div className="projects__grid">
        {filteredRepos.map((repo) => {
          const curatedImage = getCuratedImagePath(repo.name);
          const ogFallbackImage = getOgPreviewUrl(repo);

          return (
            <article key={repo.id} className="project-card">
              <div className="project-card__media">
                <img
                  src={curatedImage}
                  alt={`${repo.name} preview`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = ogFallbackImage;
                  }}
                />
              </div>
              <header className="project-card__header">
                <h3 className="project-card__title">{repo.name}</h3>
                {repo.language && (
                  <span className="project-card__language">
                    {repo.language}
                  </span>
                )}
              </header>
              {repo.description && (
                <p className="project-card__description">
                  {repo.description}
                </p>
              )}
              <dl className="project-card__meta">
                <div>
                  <dt>⭐ Stars</dt>
                  <dd>{repo.stargazers_count}</dd>
                </div>
                <div>
                  <dt>🔄 Updated</dt>
                  <dd>
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt>🔗</dt>
                  <dd>{repo.visibility}</dd>
                </div>
              </dl>
              <div className="project-card__actions">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--ghost"
                >
                  View on GitHub
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--text"
                  >
                    Live demo ↗
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
