import React, { useState, useEffect, useRef } from 'react';
import './MiteMaverickNavbar.css';

const MiteMaverickNavbar = ({ 
  heroImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [lettersVisible, setLettersVisible] = useState([]);
  const [trianglePosition, setTrianglePosition] = useState(-100);
  const [taglineVisible, setTaglineVisible] = useState(false);
  
  const navbarRef = useRef(null);
  const imageRef = useRef(null);
  const heroSectionRef = useRef(null);
  const logoRef = useRef(null);

  // Logo loading animation on page load
  useEffect(() => {
    const logo = "MiteMaverick";
    const letters = logo.split('');
    
    // Start triangle animation
    setTimeout(() => setTrianglePosition(0), 300);
    
    // Move triangle to the right
    setTimeout(() => setTrianglePosition(100), 1000);
    
    // Reveal letters one by one after triangle moves
    letters.forEach((_, index) => {
      setTimeout(() => {
        setLettersVisible(prev => [...prev, index]);
      }, 1200 + (index * 100));
    });
    
    // Show tagline after all letters are visible
    setTimeout(() => {
      setTaglineVisible(true);
      setLoadingComplete(true);
    }, 1200 + (letters.length * 100) + 500);
  }, []);

  // Scroll effect for image transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSectionRef.current ? heroSectionRef.current.offsetHeight : 600;
      const scrollThreshold = heroHeight * 0.4;
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = heroHeight * 0.8;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
      
      // Update scroll state
      setIsScrolled(scrollY > 50);
      
      // Update image position based on scroll
      if (loadingComplete) {
        updateImagePosition(progress, scrollY);
      }
    };

    const updateImagePosition = (progress, scrollY) => {
      if (!navbarRef.current || !imageRef.current || !logoRef.current) return;
      
      const navbar = navbarRef.current;
      const image = imageRef.current;
      const logo = logoRef.current;
      
      // Get navbar dimensions
      const navbarRect = navbar.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();
      
      // Navbar shrinking effect
      const navbarStartHeight = 90;
      const navbarEndHeight = 60;
      const navbarHeight = navbarStartHeight - (navbarStartHeight - navbarEndHeight) * progress;
      
      const navbarStartWidth = 80;
      const navbarEndWidth = 50;
      const navbarWidth = navbarStartWidth - (navbarStartWidth - navbarEndWidth) * progress;
      
      navbar.style.height = `${navbarHeight}px`;
      navbar.style.width = `${navbarWidth}%`;
      
      // Target position: right next to the logo
      const targetLeft = logoRect.right + 20;
      const targetTop = navbarRect.top + (navbarHeight - 40) / 2;
      
      // Starting position: hero section (centered)
      const heroRect = heroSectionRef.current.getBoundingClientRect();
      const startLeft = heroRect.left + heroRect.width / 2 - 100;
      const startTop = heroRect.top + heroRect.height * 0.3;
      
      // Calculate current position
      const currentLeft = startLeft + (targetLeft - startLeft) * progress;
      const currentTop = startTop + (targetTop - startTop) * progress;
      
      // Image scaling
      const startSize = 200;
      const endSize = 40; // Matches navbar height
      const currentSize = startSize - (startSize - endSize) * progress;
      
      // Apply transformations
      image.style.left = `${currentLeft}px`;
      image.style.top = `${currentTop}px`;
      image.style.width = `${currentSize}px`;
      image.style.height = `${currentSize}px`;
      image.style.opacity = `${1 - progress * 0.2}`;
      image.style.borderRadius = `${50 - 20 * progress}%`;
      image.style.zIndex = '1001';
      
      // Logo moves slightly to the left to make space for image
      const logoStartLeft = 50;
      const logoEndLeft = 30;
      const logoCurrentLeft = logoStartLeft - (logoStartLeft - logoEndLeft) * progress;
      
      logo.style.left = `${logoCurrentLeft}%`;
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
    <div className="mite-maverick-app">
      {/* Navigation Bar - Fixed in Middle */}
      <nav 
        ref={navbarRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="nav-content">
          {/* Animated Logo */}
          <div className="logo-container">
            {/* Triangle animation */}
            <div 
              className="triangle-animation" 
              style={{ left: `${trianglePosition}%` }}
            >
              <div className="triangle"></div>
            </div>
            
            {/* Logo Text */}
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
              
              {/* Tagline */}
              <div className={`tagline ${taglineVisible ? 'visible' : ''}`}>
                <span className="tagline-text">solutions</span>
              </div>
            </div>
          </div>
          
          {/* Nav Links */}
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Transitioning Image */}
      {loadingComplete && (
        <img
          ref={imageRef}
          src={heroImage}
          alt="MiteMaverick"
          className="transition-image"
          style={{
            transform: `rotate(${scrollProgress * 360}deg)`,
            borderColor: `hsl(${scrollProgress * 180}, 70%, 50%)`,
          }}
        />
      )}

      {/* Hero Section */}
      <section 
        ref={heroSectionRef}
        id="home" 
        className="hero"
      >
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h2>Welcome to MiteMaverick</h2>
            <p>Innovative solutions for modern challenges</p>
            <p className="hero-instruction">
              Scroll down to see the image transition to the navbar
            </p>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className="hero-image-placeholder">
            <div className="placeholder-content">
              <i className="fas fa-user-tie"></i>
              <p>Profile Image</p>
              <p className="placeholder-note">This will move to navbar when scrolling</p>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* Content Sections */}
      <div className="content">
        <section id="about" className="section">
          <h2>About MiteMaverick</h2>
          <p>
            MiteMaverick specializes in cutting-edge solutions that transform businesses. 
            Our innovative approach combines creativity with technical excellence.
          </p>
          
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Fast Solutions</h3>
              <p>Rapid deployment of effective strategies</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovative Ideas</h3>
              <p>Creative approaches to complex problems</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Growth Focused</h3>
              <p>Solutions designed for sustainable growth</p>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service">
              <h3>Consulting</h3>
              <p>Expert guidance for business transformation</p>
            </div>
            <div className="service">
              <h3>Development</h3>
              <p>Custom software and application development</p>
            </div>
            <div className="service">
              <h3>Strategy</h3>
              <p>Long-term planning and execution strategies</p>
            </div>
            <div className="service">
              <h3>Support</h3>
              <p>24/7 technical support and maintenance</p>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section">
          <h2>Portfolio</h2>
          <p>See our work in action with these featured projects:</p>
          
          <div className="portfolio-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="portfolio-item">
                <div className="portfolio-image">
                  <img 
                    src={`https://picsum.photos/400/300?random=${item + 10}`} 
                    alt={`Portfolio ${item}`} 
                  />
                </div>
                <div className="portfolio-info">
                  <h4>Project {item}</h4>
                  <p>MiteMaverick Solution Implementation</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>contact@mitemaverick.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Innovation Drive, Tech City</span>
            </div>
          </div>
        </section>
        
        {/* Scroll progress indicator */}
        <div className="scroll-progress-section">
          <h3>Transition Progress</h3>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${scrollProgress * 100}%` }}
              ></div>
            </div>
            <div className="progress-info">
              <span>Image Position: {Math.round(scrollProgress * 100)}%</span>
              <span>Navbar Size: {Math.round(80 - scrollProgress * 20)}%</span>
            </div>
          </div>
          
          <button 
            className="reset-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <i className="fas fa-undo"></i> Reset Animation
          </button>
        </div>
        
        <div className="spacer" style={{ height: '800px' }}></div>
      </div>
      
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <h3>MiteMaverick</h3>
            <p className="footer-tagline">solutions</p>
          </div>
          <p className="copyright">© 2024 MiteMaverick Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MiteMaverickNavbar;