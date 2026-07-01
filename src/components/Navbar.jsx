// Derive a page key from a nav path: "/" -> "home", "/research" -> "research".
export const pathToPage = (path) => (path === "/" ? "home" : path.replace(/^\//, ""));

export default function Navbar({ currentPage, navigate, brand, nav }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => navigate("home")}>
          <span className="brand-logo-slot">
            {/* Replace with <img src="/assets/logo.png" alt="Logo" className="brand-logo-img" /> when logo is ready */}
            <span className="brand-logo-placeholder">{brand.logoText ?? brand.name.charAt(0)}</span>
          </span>
          <span className="brand-text">
            <span className="brand-name">{brand.name}</span>
            {brand.sub && <span className="brand-sub">{brand.sub}</span>}
          </span>
        </button>
        <nav className="navbar-nav">
          {nav.map((item) => {
            const page = pathToPage(item.path);
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
