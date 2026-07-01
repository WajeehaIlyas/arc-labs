import { pathToPage } from "./Navbar";

export default function Footer({ lab, navigate, nav = [] }) {
  // Footer nav mirrors the main nav, minus Home.
  const links = nav.filter((item) => item.path !== "/");

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <span className="footer-lab-name">{lab.name}</span>
          {lab.fullName && <span className="footer-lab-full">{lab.fullName}</span>}
          {lab.department && <span className="footer-dept">{lab.department}</span>}
          {lab.university && <span className="footer-uni">{lab.university}</span>}
        </div>
        <div className="footer-col">
          <span className="footer-section-label">Contact</span>
          <a href={`mailto:${lab.email}`} className="footer-link">{lab.email}</a>
          {lab.address && <span className="footer-address">{lab.address}</span>}
        </div>
        <div className="footer-col">
          <span className="footer-section-label">Navigate</span>
          {links.map((item) => (
            <button
              key={item.path}
              className="footer-link footer-nav-btn"
              onClick={() => navigate(pathToPage(item.path))}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {lab.name}{lab.university ? ` — ${lab.university}` : ""}</span>
      </div>
    </footer>
  );
}
