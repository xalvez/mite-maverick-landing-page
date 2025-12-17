import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const TechNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [lettersVisible, setLettersVisible] = useState([]);
  const [trianglePosition, setTrianglePosition] = useState(-100);
  
  const navbarRef = useRef(null);
  const logoRef = useRef(null);

  // Logo loading animation on page load
  useEffect(() => {
    const logo = "MiteMaverick";
    const letters = logo.split('');
    
    setTimeout(() => setTrianglePosition(0), 300);
    setTimeout(() => setTrianglePosition(100), 1000);
    
    letters.forEach((_, index) => {
      setTimeout(() => {
        setLettersVisible(prev => [...prev, index]);
      }, 1200 + (index * 100));
    });
    
    setTimeout(() => {
      setLoadingComplete(true);
    }, 1200 + (letters.length * 100) + 500);
  }, []);

  // Scroll effect for navbar shrinking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      if (navbarRef.current) {
        const navbar = navbarRef.current;
        const progress = Math.min(scrollY / 300, 1);
        
        // Start at 100% width, shrink to 70% when scrolling
        const startWidth = 100;
        const endWidth = 70;
        const currentWidth = startWidth - (startWidth - endWidth) * progress;
        
        navbar.style.width = `${currentWidth}%`;
        navbar.style.left = `${(100 - currentWidth) / 2}%`;
        
        // Reduce padding when scrolled
        if (scrollY > 50) {
          navbar.style.padding = '0 30px';
        } else {
          navbar.style.padding = '0 40px';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav 
        ref={navbarRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="nav-content">
          {/* Logo */}
          <div className="logo-section">
            <div 
              className="triangle-animation" 
              style={{ left: `${trianglePosition}%` }}
            >
              <div className="triangle"></div>
            </div>
            
            <div ref={logoRef} className="logo">
              <h1 className="logo-text">
                {"MiteMaverick".split('').map((letter, index) => (
                  <span 
                    key={index} 
                    className={`letter ${lettersVisible.includes(index) ? 'visible' : ''}`}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
              <div className="tagline">solutions</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to MiteMaverick</h2>
          <p>Innovative solutions for modern businesses</p>
          <div className="scroll-indicator">
            <i className="fas fa-chevron-down"></i>
            <span>Scroll down to see navbar shrink</span>
          </div>
        </div>
      </section>

      {/* Content Sections for scrolling */}
      <div className="content">
        {['Section 1', 'Section 2', 'Section 3', 'Section 4'].map((section, index) => (
          <div key={index} className="section">
            <h3>{section}</h3>
            <p>Content for {section.toLowerCase()}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>© 2024 MiteMaverick Solutions</p>
      </footer>
    </div>
  );
};

export default TechNavbar;