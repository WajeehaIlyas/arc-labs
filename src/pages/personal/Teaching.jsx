import teachingData from "../../data/personal/teaching.json";

export default function Teaching() {
  // Only render courses that have actually been filled in.
  const courses = teachingData.courses.filter((c) => c.title);

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Teaching</h1>
        <p className="page-intro">
          Public lecture notes and slides from courses I teach.
        </p>

        {courses.length === 0 ? (
          <p className="no-results">Course materials will be posted here soon.</p>
        ) : (
          <div className="teaching-list">
            {courses.map((c) => (
              <section key={c.id} className="teaching-course">
                <h2 className="section-heading">
                  {c.code ? `${c.code} — ` : ""}{c.title}
                </h2>
                {(c.term || c.year) && (
                  <p className="teaching-term">
                    {[c.term, c.year].filter(Boolean).join(" ")}
                  </p>
                )}
                {c.description && <p className="home-text">{c.description}</p>}
                {c.materials?.length > 0 && (
                  <ul className="material-list">
                    {c.materials
                      .filter((m) => m.file)
                      .map((m, i) => (
                        <li key={i} className="material-item">
                          <a href={m.file} className="pub-action-link" target="_blank" rel="noreferrer">
                            {m.label || (m.type === "notes" ? "Lecture notes" : "Slides")}
                          </a>
                          {m.type && <span className="material-type">[{m.type}]</span>}
                        </li>
                      ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
