import { useState, useEffect } from "react";
import researchData from "../data/lab/research.json";

// Render a description string, turning markdown-style [text](url) into links
// while leaving the rest as plain text. Links open in a new tab.
function renderWithLinks(text) {
  if (!text) return text;
  const parts = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a key={m.index} href={m[2]} target="_blank" rel="noreferrer">{m[1]}</a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function Research({ focusId = null }) {
  const { tags, projects } = researchData;
  const [activeTags, setActiveTags] = useState([]);
  const [activeStatus, setActiveStatus] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  // If we arrived here targeting a specific project, scroll it into view once
  // the page has rendered (and briefly highlight it).
  useEffect(() => {
    if (!focusId) return;
    const el = document.getElementById(`project-${focusId}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("project-card-focused");
    const t = setTimeout(() => el.classList.remove("project-card-focused"), 2000);
    return () => clearTimeout(t);
  }, [focusId]);

  // Only show filter chips for tags that at least one project actually uses,
  // so the chip list can't drift out of sync with the project data and
  // produce dead filters that always return zero results.
  const usedTags = new Set(projects.flatMap((p) => p.tags ?? []));
  const visibleTags = tags.filter((tag) => tag === "All" || usedTags.has(tag));

  const showAll = activeTags.length === 0;

  const toggleTag = (tag) => {
    if (tag === "All") {
      setActiveTags([]);
      return;
    }
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = projects.filter((p) => {
    const tagMatch = showAll || activeTags.some((t) => p.tags.includes(t));
    const statusMatch = activeStatus === "all" || p.status === activeStatus;
    return tagMatch && statusMatch;
  });

  const ongoing = filtered.filter((p) => p.status === "ongoing");
  const completed = filtered.filter((p) => p.status === "completed");

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Research</h1>

        {/* Tag Filter */}
        <div className="tag-filter-bar">
          {visibleTags.map((tag) => {
            const isActive = tag === "All" ? showAll : activeTags.includes(tag);
            return (
              <button
                key={tag}
                className={`tag-btn${isActive ? " tag-btn-active" : ""}`}
                aria-pressed={isActive}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Status Toggle */}
        <div className="status-toggle">
          {["all", "ongoing", "completed"].map((s) => (
            <button
              key={s}
              className={`status-btn${activeStatus === s ? " status-btn-active" : ""}`}
              onClick={() => setActiveStatus(s)}
            >
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Ongoing Projects */}
        {(activeStatus === "all" || activeStatus === "ongoing") && ongoing.length > 0 && (
          <section className="projects-section">
            <h2 className="projects-section-title">
              <span className="status-dot status-dot-ongoing" /> Ongoing Projects
            </h2>
            <div className="projects-list">
              {ongoing.map((p) => <ProjectCard key={p.id} project={p} activeTags={activeTags} onOpenImage={setLightbox} />)}
            </div>
          </section>
        )}

        {/* Completed Projects */}
        {(activeStatus === "all" || activeStatus === "completed") && completed.length > 0 && (
          <section className="projects-section">
            <h2 className="projects-section-title">
              <span className="status-dot status-dot-completed" /> Completed Projects
            </h2>
            <div className="projects-list">
              {completed.map((p) => <ProjectCard key={p.id} project={p} activeTags={activeTags} onOpenImage={setLightbox} />)}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <p className="no-results">No projects match the selected filters.</p>
        )}
      </div>

      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

const isImageAsset = (src) => /\.(gif|png|jpe?g|webp|svg|avif)$/i.test(src || "");

function ProjectCard({ project, activeTags = [], onOpenImage }) {
  const [expanded, setExpanded] = useState(false);
  const clickable = isImageAsset(project.image);
  return (
    <div className="project-card" id={`project-${project.id}`}>
      <div className="project-card-main">
        <div className="project-info">
          <div className="project-tags">
            {project.tags.map((t) => (
              <span
                key={t}
                className={`project-tag${activeTags.includes(t) ? " project-tag-active" : ""}`}
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="project-title">{project.title}</h3>
          <p className={`project-desc${expanded ? " project-desc-expanded" : ""}`}>
            {renderWithLinks(project.description)}
          </p>
          <div className="project-meta-row">
            {project.funding && (
              <span className="project-meta"><strong>Funding:</strong> {project.funding}</span>
            )}
            {project.collaborators?.length > 0 && (
              <span className="project-meta">
                <strong>Collaborators:</strong> {project.collaborators.join(", ")}
              </span>
            )}
            <span className="project-meta">
              <strong>Period:</strong> {project.startYear}–{project.endYear ?? "present"}
            </span>
          </div>
          <button className="btn-link small" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show less ↑" : "Read more ↓"}
          </button>
        </div>
        {project.image && (
          <div className="project-image-wrap">
            {clickable ? (
              <button
                type="button"
                className="project-image-btn"
                onClick={() => onOpenImage({ src: project.image, alt: project.title, caption: project.caption })}
                aria-label={`Enlarge ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span className="project-image-zoom" aria-hidden="true">⤢</span>
              </button>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Lightbox({ src, alt, caption, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">×</button>
        <img src={src} alt={alt} className="lightbox-image" />
        {caption && <p className="lightbox-caption">{caption}</p>}
      </div>
    </div>
  );
}
