import { useEffect, useState } from "react";

export const GITHUB_USERNAME = "Ch1m3rical";

export function useGithubProjects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch GitHub repositories");
        }
        const data = await res.json();
        const filtered = data.filter(
          (repo) => !repo.fork && !repo.archived
        );
        setRepos(filtered);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return { repos, loading, error };
}
