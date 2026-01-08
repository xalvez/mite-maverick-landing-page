import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext"; 

import logonavbar from "../../assets/images/Navbar/Asset 7@4x.png";

const FixedLogoNavbar = ({ heroLogoImage = logonavbar, heroVideo }) => {
  const { language, changeLanguage } = useLanguage(); 
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [logoLoaded, setLogoLoaded] = useState(false);

  const navbarRef = useRef(null);

  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(true);

  // Updated navItems to use translations from your JSON files
  // We use a fallback label in case the translation hasn't loaded yet
const navItems = [
    { id: "home", label: translations?.nav?.home || "Home" },
    { id: "about", label: translations?.nav?.about || "About" },
    { id: "outvision", label: translations?.nav?.ourVision || "OurVision" },
    { id: "services", label: translations?.nav?.services || "Services" },
    { id: "YourRequest", label: translations?.nav?.yourRequest || "YourRequest" },
    { id: "contact", label: translations?.nav?.contact || "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      updateActiveLinkOnScroll();
    };
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => setLogoLoaded(true), 200);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateActiveLinkOnScroll = () => {
    const sections = navItems.map((item) => document.getElementById(item.id));
    const scrollPosition = window.scrollY + 100;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && scrollPosition >= section.offsetTop) {
        setActiveLink(navItems[i].id);
        break;
      }
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveLink(id);
      setMenuOpen(false);
    }
  };

  const handleLangChange = (code) => {
    changeLanguage(code); 
    setLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      try {
        // This imports your locale file (e.g., locales/en/about.json)
        const module = await import(`../../locales/${language}/navbar.json`);
        setTranslations(module.default);
      } catch (error) {
        console.error(`Failed to load ${language} translations:`, error);
        try {
          const fallback = await import(`../../locales/en/navbar.json`);
          setTranslations(fallback.default);
        } catch (fallbackError) {
          console.error("Failed to load fallback translations:", fallbackError);
        }
      }
      setLoading(false);
    };

    loadTranslations();
  }, [language]);

  // Loading state handling
  if (loading || !translations) {
    return null; // Return null or a minimal skeleton to avoid layout shift
  }

  return (
    <nav ref={navbarRef} className={`logo-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="logo-section">
          <div
            className={`logo-box ${logoLoaded ? "loaded" : ""}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <video
              src={heroVideo}
              className="logo-page"
              autoPlay
              loop
              muted
              playsInline
              poster={heroLogoImage}
            />
          </div>
        </div>

        <div className="nav-links-wrapper">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-button ${activeLink === item.id ? "active" : ""}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions-wrapper">
          <div className={`lang-container ${langOpen ? "open" : ""}`}>
            <button
              className="lang-toggle"
              onClick={() => setLangOpen(!langOpen)}
            >
              <FiGlobe />
              <span className="lang-current-code">
                {language.toUpperCase()}
              </span>
            </button>

            <div className="lang-dropdown">
              <button
                className={`lang-btn ${language === "ar" ? "active" : ""}`}
                onClick={() => handleLangChange("ar")}
              >
                AR
              </button>
              <button
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => handleLangChange("en")}
              >
                EN
              </button>
            </div>
          </div>

          <button
            className="mobile-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu-wrapper ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-menu-button ${
              activeLink === item.id ? "active" : ""
            }`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
            <span className="menu-arrow">→</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default FixedLogoNavbar;