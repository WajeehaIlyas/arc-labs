import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Publications from "./pages/Publications";
import { isLab } from "./site";

// Lab pages + data
import Home from "./pages/Home";
import Research from "./pages/Research";
import Tools from "./pages/Tools";
import Team from "./pages/Team";
import labSite from "./data/lab/site.json";

// Personal pages + data
import PersonalHome from "./pages/personal/PersonalHome";
import Teaching from "./pages/personal/Teaching";
import Talks from "./pages/personal/Talks";
import profile from "./data/personal/profile.json";
import personalTools from "./data/personal/tools.json";

const LAB_TOOLS_INTRO =
  "We develop and release open-source tools, verification frameworks, and benchmark suites " +
  "to support reproducibility and enable further research in the community.";

// Per-site configuration: which brand, nav, and pages this build renders.
// Selected by the VITE_SITE flag (see src/site.js).
function buildConfig(navigate, pageTarget) {
  if (isLab) {
    return {
      brand: { name: labSite.lab.name, sub: labSite.lab.university },
      nav: labSite.nav,
      footer: { lab: labSite.lab },
      pages: {
        home: <Home navigate={navigate} />,
        research: <Research focusId={pageTarget} />,
        publications: <Publications />,
        tools: <Tools intro={LAB_TOOLS_INTRO} />,
        team: <Team />,
      },
    };
  }
  // personal
  return {
    brand: { name: profile.person.name, sub: profile.person.title, logoText: "UM" },
    nav: profile.nav,
    footer: {
      lab: {
        name: profile.person.name,
        fullName: profile.person.title,
        department: profile.person.affiliation,
        university: "",
        email: profile.person.email,
        address: null,
      },
    },
    pages: {
      home: <PersonalHome navigate={navigate} />,
      teaching: <Teaching />,
      talks: <Talks />,
      tools: <Tools data={personalTools} />,
      publications: <Publications />,
    },
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  // Optional in-page target (e.g. a project id) for the next page render, so a
  // link can deep-scroll to a specific item instead of the top of the page.
  const [pageTarget, setPageTarget] = useState(null);

  const navigate = (page, target = null) => {
    setPageTarget(target);
    setCurrentPage(page);
    if (!target) window.scrollTo(0, 0);
  };

  const config = buildConfig(navigate, pageTarget);
  const renderPage = () => config.pages[currentPage] ?? config.pages.home;

  return (
    <div className="app-root">
      <Navbar currentPage={currentPage} navigate={navigate} brand={config.brand} nav={config.nav} />
      <main className="main-content">{renderPage()}</main>
      <Footer lab={config.footer.lab} navigate={navigate} nav={config.nav} />
    </div>
  );
}
