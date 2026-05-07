import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Research from "./pages/Research";
import Publications from "./pages/Publications";
import Tools from "./pages/Tools";
import Team from "./pages/Team";
import siteData from "./data/site.json";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <Home navigate={navigate} />;
      case "research": return <Research />;
      case "publications": return <Publications />;
      case "tools": return <Tools />;
      case "team": return <Team />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="app-root">
      <Navbar currentPage={currentPage} navigate={navigate} lab={siteData.lab} nav={siteData.nav} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer lab={siteData.lab} navigate={navigate} />
    </div>
  );
}
