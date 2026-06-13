import { useState } from "react";
import researchData from "../data/research.json";

export default function Research() {
  const { tags, projects } = researchData;
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeStatus, setActiveStatus] = useState("all");
  const [lightbox, setLightbox] = useState(null); // holds image src when open

  const toggleTag = (tag) => {
    if (tag === "All") {
      setSelectedTags([]);
      return;
    }
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const isTagActive = (tag) => {
    if (tag === "All") return selectedTags.length === 0;
    return selectedTags.includes(tag);
  };

  const filtered = projects.filter((p) => {
    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.some((t) => p.tags.includes(t));
    const statusMatch = activeStatus === "all" || p.status === activeStatus;
    return tagMatch && statusMatch;
  });

  const ongoing = filtered.filter((p) => p.status === "ongoing");
  const completed = filtered.filter((p) => p.status === "completed");

  return (
    <div className="page">
      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            {lightbox.endsWith(".html") ? (
              <iframe
                src={lightbox}
                className="lightbox-iframe"
                title="Project preview"
              />
            ) : (
              <img src={lightbox} alt="Project preview" className="lightbox-img" />
            )}
          </div>
        </div>
      )}

      <div className="container">
        <h1 className="page-title">Research</h1>

        {/* Tag Filter */}
        <div className="tag-filter-bar">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`tag-btn${isTagActive(tag) ? " tag-btn-active" : ""}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {selectedTags.length > 0 && (
          <p className="tag-hint">
            Showing projects matching{" "}
            {selectedTags.map((t, i) => (
              <span key={t}>
                <strong>{t}</strong>
                {i < selectedTags.length - 1 ? " + " : ""}
              </span>
            ))}
            {" · "}
            <button className="btn-link small" onClick={() => setSelectedTags([])}>
              Clear
            </button>
          </p>
        )}

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
              {ongoing.map((p) => (
                <ProjectCard key={p.id} project={p} onImageClick={setLightbox} />
              ))}
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
              {completed.map((p) => (
                <ProjectCard key={p.id} project={p} onImageClick={setLightbox} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <p className="no-results">No projects match the selected filters.</p>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, onImageClick }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="project-card">
      <div className="project-card-main">
        <div className="project-info">
          <div className="project-tags">
            {project.tags.map((t) => (
              <span key={t} className="project-tag">{t}</span>
            ))}
          </div>
          <h3 className="project-title">{project.title}</h3>
          <p className={`project-desc${expanded ? " project-desc-expanded" : ""}`}>
            {project.description}
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
            {project.image.endsWith(".html") ? (
              <button
                className="project-image-btn"
                onClick={() => onImageClick(project.image)}
                title="Click to expand"
              >
                <iframe
                  src={project.image}
                  className="project-image project-iframe"
                  title={project.title}
                  scrolling="no"
                />
                <span className="project-image-hint">🔍</span>
              </button>
            ) : (
              <button
                className="project-image-btn"
                onClick={() => onImageClick(project.image)}
                title="Click to enlarge"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  onError={(e) => { e.target.parentElement.style.display = "none"; }}
                />
                <span className="project-image-hint">🔍</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
