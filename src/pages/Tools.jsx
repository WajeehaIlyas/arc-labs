import labTools from "../data/lab/tools.json";
import useGithubStats from "../hooks/useGithubStats";

export default function Tools({ data = labTools, intro }) {
  const tools = (data.tools ?? []).filter((t) => t.name);
  const benchmarks = (data.benchmarks ?? []).filter((b) => b.name);

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Tools &amp; Models</h1>
        {intro && <p className="page-intro">{intro}</p>}

        {tools.length === 0 && benchmarks.length === 0 && (
          <p className="no-results">Tools and models will be listed here soon.</p>
        )}

        {/* Tools */}
        {tools.length > 0 && (
        <section className="tools-section">
          <h2 className="section-heading">Software Tools</h2>
          <div className="tools-list">
            {tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        </section>
        )}

        {/* Benchmarks */}
        {benchmarks?.length > 0 && (
          <section className="tools-section">
            <h2 className="section-heading">Benchmarks &amp; Datasets</h2>
            <div className="benchmark-list">
              {benchmarks.map((b) => (
                <div key={b.id} className="benchmark-entry">
                  <div className="benchmark-info">
                    <h3 className="benchmark-name">{b.name}</h3>
                    <p className="benchmark-desc">{b.description}</p>
                  </div>
                  {b.link && (
                    <a href={b.link} className="btn-link" target="_blank" rel="noreferrer">
                      View on GitHub →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ToolCard({ tool }) {
  const stats = useGithubStats(tool.repo);

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        {tool.image && (
          <div className="tool-image-wrap">
            <img src={tool.image} alt={tool.name} className="tool-image"
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>
        )}
        <div className="tool-header-info">
          <h3 className="tool-name">{tool.name}</h3>
          <span className="tool-subtitle">{tool.subtitle}</span>
          <div className="tool-tags">
            {tool.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
          </div>
        </div>
      </div>
      <p className="tool-desc">{tool.description}</p>

      {stats && (
        <div className="tool-stats">
          <span className="tool-stat" title="GitHub stars">★ {stats.stars} stars</span>
          <span className="tool-stat" title="GitHub forks">⑂ {stats.forks} forks</span>
        </div>
      )}

      <div className="tool-meta-row">
        {tool.version && <span className="tool-meta"><strong>Version:</strong> {tool.version}</span>}
        {tool.language && <span className="tool-meta"><strong>Language:</strong> {tool.language}</span>}
        {tool.license && <span className="tool-meta"><strong>License:</strong> {tool.license}</span>}
      </div>
      <div className="tool-actions">
        {tool.github && (
          <a href={tool.github} className="btn-outline" target="_blank" rel="noreferrer">
            GitHub →
          </a>
        )}
        {tool.fileExchange && (
          <a href={tool.fileExchange} className="btn-outline" target="_blank" rel="noreferrer">
            MATLAB File Exchange →
          </a>
        )}
      </div>
    </div>
  );
}
