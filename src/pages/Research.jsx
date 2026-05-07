import { useState } from "react";
import researchData from "../data/research.json";

export default function Research() {
  const { tags, projects } = researchData;
  const [activeTag, setActiveTag] = useState("All");
  const [activeStatus, setActiveStatus] = useState("all");

  const filtered = projects.filter((p) => {
    const tagMatch = activeTag === "All" || p.tags.includes(activeTag);
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
          {tags.map((tag) => (
            <button
              key={tag}
              className={`tag-btn${activeTag === tag ? " tag-btn-active" : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
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
              {ongoing.map((p) => <ProjectCard key={p.id} project={p} />)}
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
              {completed.map((p) => <ProjectCard key={p.id} project={p} />)}
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

function ProjectCard({ project }) {
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
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
