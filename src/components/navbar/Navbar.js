import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "../../style/variables.css";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import MITVideo from "../../assets/videos/MIT.mp4";
import Logo_M from "../../assets/images/logo_M.png";
import LogoImagenav from "../../assets/images/Asset 7@4x.png";

const FixedLogoNavbar = ({
  toggleTheme,
  theme = "light",
  heroImage = Logo_M,
  heroLogoImage = LogoImagenav,
  heroVideo = null,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [imageVisible, setImageVisible] = useState(false); // Hidden until scroll

  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const imageRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 80; // Increased threshold
      setScrolled(isScrolled);

      // Show image when scrolled down
      if (scrollY > 100) {
        setImageVisible(true);
      } else {
        setImageVisible(false);
      }

      // Update active link based on scroll position
      updateActiveLinkOnScroll();
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate logo on load - simple fade in
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Navigation items
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  // Update active link based on scroll position
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

  // Scroll to section function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveLink(id);
      setMenuOpen(false);
    }
  };

  // Handle logo click (scroll to top)
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveLink("home");
  };

  // FIXED Theme toggle handler
  const handleThemeToggle = () => {
    if (toggleTheme) {
      toggleTheme();
    } else {
      // Fallback: Toggle theme locally
      const newTheme = theme === "light" ? "dark" : "light";

      // Update body attribute
      document.body.setAttribute("data-theme", newTheme);

      // Update localStorage
      localStorage.setItem("theme", newTheme);

      // Force re-render by changing theme state if needed
      window.dispatchEvent(
        new CustomEvent("themeChanged", { detail: newTheme })
      );
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    // Set initial theme from localStorage or default
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail) {
        document.body.setAttribute("data-theme", e.detail);
      }
    };

    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <nav
      ref={navbarRef}
      className={`logo-nav ${scrolled ? "scrolled" : ""}`}
      data-theme={theme}
    >
      <div className="nav-inner">
        {/* Logo Section */}
        <div className="logo-section">
          {/* Profile Image/Video - Appears only on scroll */}
          {/* <div
            ref={imageRef}
            className={`logo-image ${imageVisible ? "visible" : ""}`}
          >
            <video
              src={heroVideo}
              className="profile-image"
              autoPlay
              loop
              muted
              playsInline
              poster={heroImage}
            />
          </div> */}

          {/* Logo Text with Animation */}
          {/* <div 
            ref={logoRef}
            className={`logo-box ${logoLoaded ? 'loaded' : ''}`}
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          >
            <h1 className="logo-title">
              <span className="logo-char logo-char-1">M</span>
              <span className="logo-char logo-char-2">i</span>
              <span className="logo-char logo-char-3">t</span>
              <span className="logo-char logo-char-4">e</span>
              <span className="logo-space">&nbsp;</span>
              <span className="logo-char logo-char-5">M</span>
              <span className="logo-char logo-char-6">a</span>
              <span className="logo-char logo-char-7">v</span>
              <span className="logo-char logo-char-8">e</span>
              <span className="logo-char logo-char-9">r</span>
              <span className="logo-char logo-char-10">i</span>
              <span className="logo-char logo-char-11">c</span>
              <span className="logo-char logo-char-12">k</span>
            </h1>
          </div> */}
          <div
            ref={imageRef}
            className={`logo-box ${logoLoaded ? "loaded" : ""}`}
            style={{ cursor: "pointer" }}
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

        {/* Desktop Navigation Links */}
        <div className="nav-links-wrapper">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`
        nav-button underline-link 
        relative pb-1 transition-all duration-300
        hover:text-blue-500 hover:translate-y-[-2px]
        ${activeLink === item.id ? "active text-blue-700 font-semibold" : ""}
      `}
              onClick={() => scrollToSection(item.id)}
              aria-label={`Scroll to ${item.label}`}
            >
              {item.label}
              <span className="button-line absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Right Actions (Theme Toggle & Mobile Menu) */}
        <div className="nav-actions-wrapper">
          {/* Theme Toggle Button - FIXED */}
          <button
            className="theme-button"
            onClick={handleThemeToggle}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title="Toggle theme"
          >
            {theme === "dark" ? <FiMoon /> : <FiSun />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu-wrapper ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-menu-button ${
              activeLink === item.id ? "active" : ""
            }`}
            onClick={() => scrollToSection(item.id)}
            aria-label={`Scroll to ${item.label}`}
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
