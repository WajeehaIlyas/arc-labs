import teamData from "../data/lab/team.json";

export default function Team() {
  const { pi, members, alumni } = teamData;

  const gradMembers = members.filter(m => m.level === "graduate");
  const undergradMembers = members.filter(m => m.level === "undergraduate");

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Team</h1>

        {/* PI */}
        <section className="team-section">
          <h2 className="section-heading">Principal Investigator</h2>
          <div className="pi-card">
            <div className="pi-photo-wrap">
              <img src={pi.photo} alt={pi.name} className="member-photo"
                onError={(e) => { e.target.outerHTML = `<div class="member-photo-placeholder">${pi.name.charAt(0)}</div>`; }} />
            </div>
            <div className="pi-info">
              <h3 className="member-name">{pi.name}</h3>
              <div className="pi-contact-line">
                {pi.cv && pi.cv !== "#" && (
                  <a href={pi.cv} className="pub-action-link" target="_blank" rel="noreferrer">CV</a>
                )}
                {pi.cv && pi.cv !== "#" && <span className="pi-sep">|</span>}
                <span>Email: <a href={`mailto:${pi.email}`} className="pub-action-link">{pi.email}</a></span>
              </div>
              {pi.degrees?.length > 0 && (
                <ul className="pi-degrees">
                  {pi.degrees.map((d, idx) => (
                    <li key={idx} className="pi-degree">
                      {d.degree} – {d.institution}, {d.year}
                    </li>
                  ))}
                </ul>
              )}
              <p className="member-bio">{pi.bio}</p>
              {pi.interests?.length > 0 && (
                <div className="member-interests">
                  {pi.interests.map(i => <span key={i} className="project-tag">{i}</span>)}
                </div>
              )}
              <div className="member-links">
                {pi.website && pi.website !== "#" && pi.website !== "null" && (
                  <a href={pi.website} className="pub-action-link" target="_blank" rel="noreferrer">Website</a>
                )}
                {pi.googleScholar && pi.googleScholar !== "#" && pi.googleScholar !== "null" && (
                  <a href={pi.googleScholar} className="pub-action-link" target="_blank" rel="noreferrer">Google Scholar</a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Graduate / Master Research Assistants */}
        {gradMembers.length > 0 && (
          <section className="team-section">
            <h2 className="section-heading">Graduate Research Assistants</h2>
            <div className="members-grid">
              {gradMembers.map(m => <MemberCard key={m.id} member={m} />)}
            </div>
          </section>
        )}

        {/* Undergraduate Research Assistants */}
        {undergradMembers.length > 0 && (
          <section className="team-section">
            <h2 className="section-heading">Undergraduate Research Assistants</h2>
            <div className="members-grid">
              {undergradMembers.map(m => <MemberCard key={m.id} member={m} />)}
            </div>
          </section>
        )}

        {/* Alumni */}
        {alumni?.filter(a => a.name).length > 0 && (
          <section className="team-section">
            <h2 className="section-heading">Alumni</h2>
            <div className="alumni-list">
              {alumni.filter(a => a.name).map(a => (
                <div key={a.id} className="alumni-entry">
                  <div className="alumni-left">
                    <span className="alumni-name">{a.name}</span>
                    <span className="alumni-role">{a.role}, {a.year}</span>
                  </div>
                  <div className="alumni-right">
                    {a.thesisTitle && <span className="alumni-thesis">{a.thesisTitle}</span>}
                    {a.currentPosition && <span className="alumni-now">→ {a.currentPosition}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function MemberCard({ member }) {
  return (
    <div className="member-card">
      <div className="member-photo-wrap">
        <img src={member.photo} alt={member.name} className="member-photo"
          onError={(e) => {
            e.target.outerHTML = `<div class="member-photo-placeholder">${member.name.charAt(0)}</div>`;
          }} />
      </div>
      <div className="member-card-info">
        <h3 className="member-name">{member.name}</h3>
        <span className="member-role">{member.role}</span>
        {member.year && <span className="member-year">Joined {member.year}</span>}
        {member.bio && <p className="member-bio">{member.bio}</p>}
        {member.interests?.filter(i => i).length > 0 && (
          <div className="member-interests">
            {member.interests.filter(i => i).map(i => (
              <span key={i} className="project-tag">{i}</span>
            ))}
          </div>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`} className="pub-action-link">{member.email}</a>
        )}
      </div>
    </div>
  );
}
