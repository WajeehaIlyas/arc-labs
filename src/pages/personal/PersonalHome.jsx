import profileData from "../../data/personal/profile.json";

export default function PersonalHome({ navigate }) {
  const { person } = profileData;
  const { links } = person;

  return (
    <div className="page-home">
      {/* Hero */}
      <section className="home-hero">
        <div className="container home-hero-inner">
          {person.photo && (
            <div className="home-photo-wrap">
              <img
                src={person.photo}
                alt={person.name}
                className="home-photo"
                onError={(e) => {
                  e.target.outerHTML = `<div class="home-photo-placeholder">${person.name.charAt(0)}</div>`;
                }}
              />
            </div>
          )}
          <div className="home-hero-text">
            <h1 className="home-title">{person.name}</h1>
            <p className="home-objective">
              {person.title}, {person.affiliation}
            </p>
          </div>
        </div>
      </section>

      <div className="container home-body">
        {/* Bio */}
        <section className="home-section">
          <h2 className="section-heading">About</h2>
          <p className="home-text">{person.bio}</p>
        </section>

        {/* Interests */}
        {person.interests?.length > 0 && (
          <section className="home-section">
            <h2 className="section-heading">Research Interests</h2>
            <div className="member-interests">
              {person.interests.map((i) => (
                <span key={i} className="project-tag">{i}</span>
              ))}
            </div>
          </section>
        )}

        {/* Links & Contact */}
        <section className="home-section">
          <h2 className="section-heading">Contact &amp; Links</h2>
          <div className="member-links">
            <a href={`mailto:${person.email}`} className="pub-action-link">{person.email}</a>
            {links?.googleScholar && links.googleScholar !== "#" && (
              <a href={links.googleScholar} className="pub-action-link" target="_blank" rel="noreferrer">Google Scholar</a>
            )}
            {links?.labWebsite && links.labWebsite !== "#" && (
              <a href={links.labWebsite} className="pub-action-link" target="_blank" rel="noreferrer">ARC Lab</a>
            )}
            {links?.cv && (
              <a href={links.cv} className="pub-action-link" target="_blank" rel="noreferrer">CV (PDF)</a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
