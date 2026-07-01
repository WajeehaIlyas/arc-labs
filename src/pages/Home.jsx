import { useMemo, useRef } from "react";
import siteData from "../data/lab/site.json";
import researchData from "../data/lab/research.json";

const isImageAsset = (src) => /\.(gif|png|jpe?g|webp|svg|avif)$/i.test(src || "");

// Fisher–Yates shuffle over a copy, so the teaser order varies per visit.
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ResearchTeaser({ projects, navigate }) {
  // Only projects that have a real image asset; randomize once per mount.
  const ordered = useMemo(
    () => shuffle(projects.filter((p) => isImageAsset(p.image))),
    [projects]
  );

  // Click-and-drag horizontal scrolling. We do NOT use pointer capture — it
  // would swallow the card's click. Instead we track whether the pointer moved
  // far enough to count as a drag, and navigate on click only when it didn't.
  const trackRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, dragged: false });

  const onPointerDown = (e) => {
    const el = trackRef.current;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, dragged: false };
  };
  const onPointerMove = (e) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.dragged = true;
    trackRef.current.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  if (ordered.length === 0) return null;

  return (
    <div
      className="teaser-scroller"
      ref={trackRef}
      aria-label="Research project highlights"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      {ordered.map((p) => (
        <button
          key={p.id}
          className="teaser-card"
          onClick={() => { if (!drag.current.dragged) navigate("research", p.id); }}
          draggable={false}
        >
          <div className="teaser-image-wrap">
            <img
              src={p.image}
              alt={p.title}
              className="teaser-image"
              draggable={false}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
          <div className="teaser-body">
            <span className="teaser-tag">{p.tags?.[0]}</span>
            <h3 className="teaser-title">{p.title}</h3>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function Home({ navigate }) {
  const { lab, news } = siteData;
  const { projects } = researchData;

  return (
    <div className="page-home">
      {/* Hero */}
      <section className="home-hero">
        <div className="container">
          <h1 className="home-title">{lab.fullName}</h1>
          <p className="home-objective">{lab.objective}</p>
        </div>
      </section>

      <div className="container home-body">

        {/* Research Snapshot */}
        <section className="home-section">
          <h2 className="section-heading">Research</h2>
          <p className="home-text">{lab.description}</p>
          {projects.length > 0 && (
            <ResearchTeaser projects={projects} navigate={navigate} />
          )}
          <button className="btn-link" onClick={() => navigate("research")}>
            View all projects →
          </button>
        </section>
        
        {/* News */}
        <section className="home-section">
          <h2 className="section-heading">News &amp; Updates</h2>
          <div className="news-list">
            {news.map((item) => (
              <div key={item.id} className="news-item">
                <span className="news-date">{item.date}</span>
                <span className="news-text">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Join */}
        <section className="home-section home-join">
          <h2 className="section-heading">Join the Lab</h2>
          <p className="home-text">{lab.joinText}</p>
          <p className="home-text">
            Interested? Email us at{" "}
            <a href={`mailto:${lab.applyEmail}?subject=Joining the ARC Lab`}>{lab.applyEmail}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
