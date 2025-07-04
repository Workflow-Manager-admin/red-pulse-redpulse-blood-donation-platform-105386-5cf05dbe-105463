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
          <nav className="navbar">
            <div className="navbar-logo" style={{ color: red, fontWeight: 800 }}>
              <span role="img" aria-label="blood drop" style={{ marginRight: 6 }}>🩸</span>
              RedPulse+
            </div>
            <ul className="navbar-links">
              <li>
                <NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : ""}>Register</NavLink>
              </li>
              <li>
                <NavLink to="/search" className={({ isActive }) => isActive ? "active-link" : ""}>Search Donor</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact Us</NavLink>
              </li>
            </ul>
            <button
              className="theme-toggle theme-toggle--small"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              type="button"
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  fontSize: "1.1em",
                  lineHeight: 1,
                  verticalAlign: "middle"
                }}
              >
                {theme === "dark" ? "☀️" : "🌙"}
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
