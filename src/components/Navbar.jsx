export default function Navbar({ currentPage, navigate, lab, nav }) {
  const pageMap = {
    "/": "home",
    "/research": "research",
    "/publications": "publications",
    "/tools": "tools",
    "/team": "team",
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => navigate("home")}>
          <span className="brand-logo-slot">
            {/* Replace with <img src="/assets/logo.png" alt="ARC Lab Logo" className="brand-logo-img" /> when logo is ready */}
            <span className="brand-logo-placeholder">ARC</span>
          </span>
          <span className="brand-text">
            <span className="brand-name">{lab.name}</span>
            <span className="brand-sub">{lab.university}</span>
          </span>
        </button>
        <nav className="navbar-nav">
          {nav.map((item) => {
            const page = pageMap[item.path];
            return (
              <button
                key={item.path}
                className={`nav-link${currentPage === page ? " nav-link-active" : ""}`}
                onClick={() => navigate(page)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
