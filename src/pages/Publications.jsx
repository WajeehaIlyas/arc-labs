import { useState } from "react";
import pubData from "../data/publications.json";
import { SITE } from "../site";

// Publications are a single shared dataset. Each entry's `scope` ("lab",
// "personal", or "both") decides which site(s) it appears on; a missing scope
// is treated as "both" so older entries still show everywhere.
const inScope = (p) => (p.scope ?? "both") === "both" || p.scope === SITE;
const scopedPubs = pubData.publications.filter(inScope);

// Per-publication tag chips are populated in the data but hidden for now.
// Flip to true to display them under each entry.
const SHOW_TAGS = false;

const ALL_TYPES = ["All", "Journal", "Conference"];
const YEARS = ["All", ...Array.from(new Set(scopedPubs.map(p => p.year))).sort((a,b)=>b-a).map(String)];

export default function Publications() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const filtered = scopedPubs.filter((p) => {
    const typeMatch = typeFilter === "All" || p.type === typeFilter.toLowerCase();
    const yearMatch = yearFilter === "All" || String(p.year) === yearFilter;
    return typeMatch && yearMatch;
  });

  // Group by year
  const byYear = filtered.reduce((acc, p) => {
    if (!acc[p.year]) acc[p.year] = [];
    acc[p.year].push(p);
    return acc;
  }, {});

  const sortedYears = Object.keys(byYear).sort((a,b) => b - a);

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Publications</h1>

        {/* Filters */}
        <div className="pub-filters">
          <div className="filter-group">
            <span className="filter-label">Type:</span>
            {ALL_TYPES.map(t => (
              <button
                key={t}
                className={`tag-btn${typeFilter === t ? " tag-btn-active" : ""}`}
                onClick={() => setTypeFilter(t)}
              >{t}</button>
            ))}
          </div>
          <div className="filter-group">
            <span className="filter-label">Year:</span>
            {YEARS.map(y => (
              <button
                key={y}
                className={`tag-btn${yearFilter === y ? " tag-btn-active" : ""}`}
                onClick={() => setYearFilter(y)}
              >{y}</button>
            ))}
          </div>
        </div>

        {/* Publication list */}
        <div className="pub-sections">
          {sortedYears.map(year => (
            <section key={year} className="pub-year-section">
              <h2 className="pub-year-heading">{year}</h2>
              <div className="pub-list">
                {byYear[year].map(pub => (
                  <PubEntry key={pub.id} pub={pub} />
                ))}
              </div>
            </section>
          ))}
          {filtered.length === 0 && (
            <p className="no-results">No publications match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PubEntry({ pub }) {
  const [showAbstract, setShowAbstract] = useState(false);
  const typeLabel = pub.type === "journal" ? "Journal" : "Conference";
  const typeClass = pub.type === "journal" ? "pub-type-journal" : "pub-type-conf";

  return (
    <div className="pub-entry">
      <div className="pub-entry-left">
        <span className={`pub-type-badge ${typeClass}`}>{typeLabel}</span>
      </div>
      <div className="pub-entry-body">
        <h3 className="pub-title">{pub.title}</h3>
        <p className="pub-authors">{pub.authors.join(", ")}</p>
        <p className="pub-venue">
          <em>{pub.venue}</em>, {pub.year}
        </p>
        {SHOW_TAGS && pub.tags?.length > 0 && (
          <div className="pub-tags">
            {pub.tags.map((t) => (
              <span key={t} className="project-tag">{t}</span>
            ))}
          </div>
        )}
        <div className="pub-actions">
          {pub.abstract && (
            <button className="pub-action-link" onClick={() => setShowAbstract(!showAbstract)}>
              [{showAbstract ? "Hide Abstract" : "Abstract"}]
            </button>
          )}
          {pub.pdf && (
            <a href={pub.pdf} className="pub-action-link" target="_blank" rel="noreferrer">[PDF]</a>
          )}
          {pub.doi && (
            <a href={`https://doi.org/${pub.doi}`} className="pub-action-link" target="_blank" rel="noreferrer">[DOI]</a>
          )}
        </div>
        {showAbstract && pub.abstract && (
          <div className="pub-abstract">
            <p>{pub.abstract}</p>
          </div>
        )}
      </div>
    </div>
  );
}
