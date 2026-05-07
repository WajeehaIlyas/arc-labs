export default function Footer({ lab, navigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <span className="footer-lab-name">{lab.name}</span>
          <span className="footer-lab-full">{lab.fullName}</span>
          <span className="footer-dept">{lab.department}</span>
          <span className="footer-uni">{lab.university}</span>
        </div>
        <div className="footer-col">
          <span className="footer-section-label">Contact</span>
          <a href={`mailto:${lab.email}`} className="footer-link">{lab.email}</a>
          <span className="footer-address">{lab.address}</span>
        </div>
        <div className="footer-col">
          <span className="footer-section-label">Navigate</span>
          {[
            ["Research", "research"],
            ["Publications", "publications"],
            ["Tools & Models", "tools"],
            ["Team", "team"],
          ].map(([label, page]) => (
            <button key={page} className="footer-link footer-nav-btn" onClick={() => navigate(page)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {lab.name} — {lab.university}</span>
      </div>
    </footer>
  );
}
