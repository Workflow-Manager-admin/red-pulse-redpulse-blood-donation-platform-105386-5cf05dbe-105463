import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import SearchDonorPage from "./components/SearchDonorPage";
import ContactPage from "./components/ContactPage";
import { DonorProvider } from "./components/_DonorContext";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  const navRef = useRef(null);

  // Static brand colors
  const red = "#d32f2f";
  const accent = "#b71c1c";

  // Focus management: skip to main button
  function handleSkipToMain(e) {
    e.preventDefault();
    const main = document.querySelector(".content");
    main && main.focus();
  }

  // Custom SVG logo: premium minimal icon
  function LogoIcon({ style = {} }) {
    return (
      <svg
        width="42"
        height="42"
        viewBox="0 0 40 40"
        aria-hidden="true"
        focusable="false"
        style={{
          display: "block",
          filter: "drop-shadow(0 4px 8px #b71c1c3c)",
          ...style
        }}
        fill="none"
      >
        <defs>
          <radialGradient id="drop-radial" cx="50%" cy="50%" r="60%" fx="38%" fy="38%">
            <stop offset="0%" stopColor="#e57373" stopOpacity="0.90"/>
            <stop offset="80%" stopColor={red} stopOpacity="0.94"/>
            <stop offset="100%" stopColor={accent} stopOpacity="1"/>
          </radialGradient>
        </defs>
        <path
          d="M20.5 4C14.5 15.2 6 19.6 6 27.23C6 33.13 12.08 37 20 37C27.92 37 34 33.13 34 27.23C34 19.6 25.5 15.2 20.5 4Z"
          fill="url(#drop-radial)"
          stroke="#920808"
          strokeWidth="0.18"
          style={{ filter: "drop-shadow(0 2px 7px #80030333)" }}
        />
        <circle
          cx="20"
          cy="26"
          r="5.8"
          fill="#fff"
          fillOpacity="0.11"
        />
      </svg>
    );
  }

  return (
    <DonorProvider>
      <Router>
        <div className="main-bg">
          {/* Accessibility: skip to main link */}
          <a
            href="#main-content"
            className="skip-link"
            style={{
              position: "absolute",
              left: -9999,
              top: 12,
              background: "#fff",
              color: red,
              padding: "0.9em 2em",
              borderRadius: "16px",
              fontWeight: 700,
              fontFamily: "inherit",
              fontSize: "1.12em",
              outline: 0,
              zIndex: 99999,
              transition: "left 0.28s"
            }}
            onFocus={e => (e.currentTarget.style.left = "18px")}
            onBlur={e => (e.currentTarget.style.left = "-9999px")}
            onClick={handleSkipToMain}
          >
            Skip to main content
          </a>
          <nav
            className="navbar"
            aria-label="Main navigation"
            ref={navRef}
            role="navigation"
            tabIndex="-1"
            style={{
              WebkitBackdropFilter: "blur(18px)",
              backdropFilter: "blur(18px)",
              background: "rgba(17,17,18, 0.82)",
              boxShadow: "0 10px 42px 0 rgba(179,21,19,0.16), 0 0.5px 0 #fff1"
            }}
          >
            <NavLink
              to="/register"
              className="navbar-logo-link"
              style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
              tabIndex={0}
              aria-label="Go to home (Registration)"
            >
              <span
                className="navbar-logo"
                tabIndex={-1}
                aria-label="RedPulse+ Home"
                style={{ fontWeight: 800, fontSize: "2.0rem", gap: "0.75em", display: "flex", alignItems: "center", marginRight: 0 }}
              >
                <LogoIcon style={{marginRight: "0.23em"}} />
                <span className="navbar-logo-text" style={{
                  fontWeight: 900, fontFamily: "var(--font-brand)",
                  letterSpacing: "0.02em",
                  color: "var(--color-primary)",
                  fontSize: "1.34em",
                  textShadow: "0 3px 18px #80000028"
                }}>
                  <span style={{ fontFamily: "inherit", fontWeight: 900 }}>RedPulse</span>
                  <span style={{
                    display: "inline-block",
                    color: accent,
                    fontWeight: 800,
                    fontSize: "0.93em",
                    marginLeft: "1.5px"
                  }}>+</span>
                </span>
              </span>
            </NavLink>
            <ul className="navbar-links" aria-label="Site sections" role="menubar">
              <li role="none">
                <NavLink
                  to="/register"
                  role="menuitem"
                  className={({ isActive }) => isActive ? "active-link" : ""}
                  tabIndex={0}
                  aria-current={({ isActive }) => isActive ? "page" : undefined}
                >Register</NavLink>
              </li>
              <li role="none">
                <NavLink
                  to="/search"
                  role="menuitem"
                  className={({ isActive }) => isActive ? "active-link" : ""}
                  tabIndex={0}
                  aria-current={({ isActive }) => isActive ? "page" : undefined}
                >Search Donor</NavLink>
              </li>
              <li role="none">
                <NavLink
                  to="/contact"
                  role="menuitem"
                  className={({ isActive }) => isActive ? "active-link" : ""}
                  tabIndex={0}
                  aria-current={({ isActive }) => isActive ? "page" : undefined}
                >Contact Us</NavLink>
              </li>
            </ul>
          </nav>
          <main className="content" id="main-content" tabIndex="-1">
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
