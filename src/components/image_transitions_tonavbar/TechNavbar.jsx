import React, { useState, useEffect, useRef } from 'react';
import './TechNavbar.css';

const TechNavbar = () => {
  const heroImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [lettersVisible, setLettersVisible] = useState([]);
  const [trianglePosition, setTrianglePosition] = useState(-100);
  
  const navbarRef = useRef(null);
  const imageRef = useRef(null);
  const heroSectionRef = useRef(null);
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 500, 1);
      setScrollProgress(progress);
      setIsScrolled(scrollY > 50);
      
      if (loadingComplete) {
        updateNavbar(progress);
        updateImage(progress);
      }
    };

    const updateNavbar = (progress) => {
      if (!navbarRef.current) return;
      
      const navbar = navbarRef.current;
      const startWidth = 100;
      const endWidth = 70;
      const currentWidth = startWidth - (startWidth - endWidth) * progress;
      
      navbar.style.width = `${currentWidth}%`;
      navbar.style.left = `${(100 - currentWidth) / 2}%`;
    };

    const updateImage = (progress) => {
      if (!navbarRef.current || !imageRef.current || !logoRef.current || !heroSectionRef.current) return;
      
      const navbar = navbarRef.current;
      const image = imageRef.current;
      const logo = logoRef.current;
      const heroSection = heroSectionRef.current;
      
      const navbarRect = navbar.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();
      const heroRect = heroSection.getBoundingClientRect();
      
      // Target: Left side of logo
      const targetLeft = logoRect.left - 45;
      const targetTop = navbarRect.top + 15;
      
      // Start: Right side of hero
      const startLeft = heroRect.left + heroRect.width - 200;
      const startTop = heroRect.top + 150;
      
      // Calculate positions
      const currentLeft = startLeft + (targetLeft - startLeft) * progress;
      const currentTop = startTop + (targetTop - startTop) * progress;
      
      // Image scaling
      const startSize = 160;
      const endSize = 40;
      const currentSize = startSize - (startSize - endSize) * progress;
      
      // Apply styles
      image.style.left = `${currentLeft}px`;
      image.style.top = `${currentTop}px`;
      image.style.width = `${currentSize}px`;
      image.style.height = `${currentSize}px`;
      image.style.opacity = `${1 - progress * 0.2}`;
      image.style.borderRadius = `${50 - 35 * progress}%`;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    if (loadingComplete) {
      handleScroll();
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [loadingComplete]);

  return (
    <div className="tech-app">
      {/* Navigation Bar - Centered */}
      <nav 
        ref={navbarRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="nav-content">
          <div className="logo-container">
            <div 
              className="triangle-animation" 
              style={{ left: `${trianglePosition}%` }}
            >
              <div className="triangle"></div>
            </div>
            
            <div ref={logoRef} className="logo-text">
              <h1 className="company-name">
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
        </div>
      </nav>

      {/* Transitioning Image */}
      {loadingComplete && (
        <img
          ref={imageRef}
          src={heroImage}
          alt="Profile"
          className="transition-image"
        />
      )}

      {/* Hero Section - Simple grid */}
      <section 
        ref={heroSectionRef}
        className="hero"
      >
        <div className="hero-grid">
          {/* Left: Text */}
          <div className="hero-text">
            <h2>Innovative Tech Solutions</h2>
            <p>
              We build modern, scalable technology solutions that help businesses 
              grow and succeed in the digital age.
            </p>
          </div>
          
          {/* Right: Image placeholder */}
          <div className="hero-image">
            <div className="image-placeholder">
              <div className="image-label">Scroll to see transition →</div>
            </div>
          </div>
        </div>
        
        <div className="scroll-hint">
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* Progress indicator */}
      <div className="progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${scrollProgress * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          Transition: {Math.round(scrollProgress * 100)}%
        </div>
      </div>

      <div className="spacer"></div>
    </div>
  );
};

export default TechNavbar;