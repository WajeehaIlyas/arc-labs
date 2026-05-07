import toolsData from "../data/tools.json";

export default function Tools() {
  const { tools, benchmarks } = toolsData;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Tools &amp; Models</h1>
        <p className="page-intro">
          We develop and release open-source tools, verification frameworks, and benchmark suites
          to support reproducibility and enable further research in the community.
        </p>

        {/* Tools */}
        <section className="tools-section">
          <h2 className="section-heading">Software Tools</h2>
          <div className="tools-list">
            {tools.map((tool) => (
              <div key={tool.id} className="tool-card">
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
                <div className="tool-meta-row">
                  <span className="tool-meta"><strong>Version:</strong> {tool.version}</span>
                  <span className="tool-meta"><strong>Language:</strong> {tool.language}</span>
                  <span className="tool-meta"><strong>License:</strong> {tool.license}</span>
                </div>
                <div className="tool-actions">
                  {tool.github && (
                    <a href={tool.github} className="btn-outline" target="_blank" rel="noreferrer">
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

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
