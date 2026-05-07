import siteData from "../data/site.json";

export default function Home({ navigate }) {
  const { lab, news } = siteData;

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

        {/* Research Snapshot */}
        <section className="home-section">
          <h2 className="section-heading">Research</h2>
          <p className="home-text">{lab.description}</p>
          <button className="btn-link" onClick={() => navigate("research")}>
            View all projects →
          </button>
        </section>

        {/* Join */}
        <section className="home-section home-join">
          <h2 className="section-heading">Join the Lab</h2>
          <p className="home-text">{lab.joinText}</p>
          <a href={`mailto:${lab.applyEmail}?subject=Application to ARC Lab`} className="btn-primary">
            Apply Now
          </a>
        </section>
      </div>
    </div>
  );
}
