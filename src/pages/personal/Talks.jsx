import talksData from "../../data/personal/talks.json";

export default function Talks() {
  // Only render talks that have actually been filled in.
  const talks = talksData.talks.filter((t) => t.title);

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Talks</h1>
        <p className="page-intro">
          Invited talks and presentations, with slide decks where available.
        </p>

        {talks.length === 0 ? (
          <p className="no-results">Talks will be listed here soon.</p>
        ) : (
          <div className="talks-list">
            {talks.map((t) => (
              <div key={t.id} className="talk-entry">
                <h3 className="talk-title">{t.title}</h3>
                <p className="talk-meta">
                  {[t.venue, t.location, t.date].filter(Boolean).join(" · ")}
                </p>
                <div className="pub-actions">
                  {t.slides && (
                    <a href={t.slides} className="pub-action-link" target="_blank" rel="noreferrer">[Slides PDF]</a>
                  )}
                  {t.link && (
                    <a href={t.link} className="pub-action-link" target="_blank" rel="noreferrer">[Link]</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
