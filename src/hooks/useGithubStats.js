import { useEffect, useState } from "react";

// Fetches live repo stats (stars, forks, last push) from the GitHub REST API
// in the browser. Unauthenticated and CORS-friendly; results are cached in
// sessionStorage so navigating between pages doesn't refetch. Fails silently
// (returns null) on rate limits or network errors so the UI can just omit the
// metrics rather than show an error.
export default function useGithubStats(repo) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!repo) return;
    const key = `gh-stats:${repo}`;

    const cached = sessionStorage.getItem(key);
    if (cached) {
      try {
        setStats(JSON.parse(cached));
        return;
      } catch {
        sessionStorage.removeItem(key);
      }
    }

    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        const s = {
          stars: d.stargazers_count,
          forks: d.forks_count,
          url: d.html_url,
        };
        if (!cancelled) {
          setStats(s);
          try {
            sessionStorage.setItem(key, JSON.stringify(s));
          } catch {
            /* storage full / disabled — ignore */
          }
        }
      })
      .catch(() => {
        /* rate-limited or offline — leave stats null */
      });

    return () => {
      cancelled = true;
    };
  }, [repo]);

  return stats;
}
