import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import SearchDonorPage from "./components/SearchDonorPage";
import ContactPage from "./components/ContactPage";
import { DonorProvider } from "./components/_DonorContext";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("dark");
  // Color palette
  const red = "#d32f2f";
  const accent = "#b71c1c";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <DonorProvider>
      <Router>
        <div className="main-bg">
          <nav className="navbar" role="navigation" style={{ boxShadow: "0 0.5px 0 #fff1, 0 8px 32px 0 rgba(0,0,0,0.08)" }}>
            <div className="navbar-logo" tabIndex="0" aria-label="RedPulse+ home" style={{ color: red, fontWeight: 900, letterSpacing: "1.5px", userSelect: "none", fontFamily: 'SF Pro Display, Inter, Avenir Next, Segoe UI, sans-serif' }}>
              <span role="img" aria-label="blood drop" style={{ marginRight: 7, fontSize: "1.26em", filter: "drop-shadow(0 2px 2px #b71c1c30)" }}>🩸</span>
              RedPulse+
            </div>
            <ul className="navbar-links" aria-label="Page Navigation">
              <li>
                <NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : ""} tabIndex={0}>Register</NavLink>
              </li>
              <li>
                <NavLink to="/search" className={({ isActive }) => isActive ? "active-link" : ""} tabIndex={0}>Search Donor</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""} tabIndex={0}>Contact Us</NavLink>
              </li>
            </ul>
            <button
              className="theme-toggle theme-toggle--small"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              type="button"
              tabIndex={0}
              style={{
                display: "flex",
                alignItems: "center",
                minWidth: 52,
                boxShadow: "0 3px 24px 0 rgba(211,47,47,0.04)"
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "1.36em",
                  lineHeight: 1,
                  verticalAlign: "middle",
                  transition: "color 0.2s"
                }}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
              <span style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                pointerEvents: "none"
              }}>
                {theme === "dark" ? "Light theme" : "Dark theme"}
              </span>
            </button>
          </nav>
          <main className="content">
            <Routes>
              <Route path="/" element={<RegisterPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<SearchDonorPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <footer className="footer">
            <span style={{ color: accent, fontWeight: "bold" }}>RedPulse+ &copy; {new Date().getFullYear()}</span>
          </footer>
        </div>
      </Router>
    </DonorProvider>
  );
}

export default App;
