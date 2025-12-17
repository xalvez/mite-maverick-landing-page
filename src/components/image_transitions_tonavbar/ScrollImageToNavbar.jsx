import React, { useState, useEffect, useRef } from 'react';
import './ScrollImageToNavbar.css';

const ScrollImageToNavbar = ({ 
  heroImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  navbarLogo = 'ScrollEffect',
  navItems = [
    { id: 1, label: 'Home', href: '#home' },
    { id: 2, label: 'About', href: '#about' },
    { id: 3, label: 'Gallery', href: '#gallery' },
    { id: 4, label: 'Contact', href: '#contact' },
  ]
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navbarRef = useRef(null);
  const imageRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSectionRef.current ? heroSectionRef.current.offsetHeight : 600;
      const scrollThreshold = heroHeight * 0.5; // Start transition halfway through hero
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = heroHeight * 0.8; // Complete transition at 80% of hero
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
      
      // Update scroll state
      setIsScrolled(scrollY > 50);
      
      // Update navbar and image based on scroll
      updateNavbarAndImage(progress, scrollY);
    };

    const updateNavbarAndImage = (progress, scrollY) => {
      if (!navbarRef.current || !imageRef.current || !heroSectionRef.current) return;
      
      const navbar = navbarRef.current;
      const image = imageRef.current;
      const heroSection = heroSectionRef.current;
      
      // Navbar shrinking effect
      const navbarStartHeight = 80;
      const navbarEndHeight = 40; // 50% of original
      const navbarHeight = navbarStartHeight - (navbarStartHeight - navbarEndHeight) * progress;
      
      const navbarStartWidth = 100;
      const navbarEndWidth = 50; // 50% of original
      const navbarWidth = navbarStartWidth - (navbarStartWidth - navbarEndWidth) * progress;
      
      navbar.style.height = `${navbarHeight}px`;
      navbar.style.width = `${navbarWidth}%`;
      navbar.style.left = `${(100 - navbarWidth) / 2}%`; // Center the shrinking navbar
      
      // Calculate image position - moving from hero to navbar
      const heroRect = heroSection.getBoundingClientRect();
      const navbarRect = navbar.getBoundingClientRect();
      
      // Hero section image position (starting point)
      const heroImageTop = heroRect.top + heroRect.height * 0.3;
      const heroImageLeft = heroRect.left + heroRect.width * 0.7;
      
      // Navbar target position (ending point)
      const navbarImageTop = navbarRect.top + (navbarHeight - 30) / 2;
      const navbarImageLeft = navbarRect.left + 20;
      
      // Interpolate between hero and navbar positions
      const currentTop = heroImageTop - (heroImageTop - navbarImageTop) * progress;
      const currentLeft = heroImageLeft - (heroImageLeft - navbarImageLeft) * progress;
      
      // Image scaling
      const startSize = 200; // Size in hero section
      const endSize = 30; // Size in navbar (matches navbar height)
      const currentSize = startSize - (startSize - endSize) * progress;
      
      // Apply transformations
      image.style.top = `${currentTop}px`;
      image.style.left = `${currentLeft}px`;
      image.style.width = `${currentSize}px`;
      image.style.height = `${currentSize}px`;
      image.style.opacity = `${1 - progress * 0.3}`; // Slight fade
      image.style.borderRadius = `${50 - 30 * progress}%`; // From circle to rounded square
      
      // Navbar logo opacity - fades as image moves in
      const logo = navbar.querySelector('.logo-text');
      if (logo) {
        logo.style.opacity = `${1 - progress}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initialize positions
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="scroll-image-to-navbar">
      {/* Navigation Bar */}
      <nav 
        ref={navbarRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="nav-content">
          {/* This is where the image will end up */}
          <div className="nav-image-placeholder"></div>
          
          <div className="logo">
            <i className="fas fa-compass"></i>
            <span className="logo-text">{navbarLogo}</span>
          </div>
          
          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.id} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Transitioning Image */}
      <img
        ref={imageRef}
        src={heroImage}
        alt="Hero"
        className="transition-hero-image"
        style={{
          transform: `rotate(${scrollProgress * 720}deg) scale(${1 - scrollProgress * 0.5})`,
        }}
      />

      {/* Hero Section */}
      <section 
        ref={heroSectionRef}
        id="home" 
        className="hero"
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Scroll Down Effect</h1>
          <p>Watch the image move from hero section to the navbar as you scroll</p>
          <div className="hero-image-container">
            <div className="image-label">This image will move to navbar</div>
          </div>
          <div className="scroll-instruction">
            <i className="fas fa-chevron-down"></i>
            <span>Scroll Down</span>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="content">
        <section id="about" className="section">
          <h2>How This Effect Works</h2>
          <p>
            As you scroll down, two things happen simultaneously:
          </p>
          <ol>
            <li>The navbar shrinks to 50% of its original width and height</li>
            <li>The image from the hero section moves to the left side of the navbar</li>
            <li>The image scales down to match the size of the smaller navbar</li>
          </ol>
          
          <div className="progress-container">
            <div className="progress-info">
              <div className="progress-item">
                <span>Navbar Width:</span>
                <span>{Math.round(100 - scrollProgress * 50)}%</span>
              </div>
              <div className="progress-item">
                <span>Navbar Height:</span>
                <span>{Math.round(80 - scrollProgress * 40)}px</span>
              </div>
              <div className="progress-item">
                <span>Image Size:</span>
                <span>{Math.round(200 - scrollProgress * 170)}px</span>
              </div>
            </div>
            
            <div className="progress-visual">
              <div className="progress-label">Transition Progress</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${scrollProgress * 100}%` }}
                ></div>
              </div>
              <div className="progress-percent">{Math.round(scrollProgress * 100)}%</div>
            </div>
          </div>
        </section>

        <section id="gallery" className="section">
          <h2>Image Gallery</h2>
          <p>Scroll further to see these images appear</p>
          <div className="gallery">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="gallery-item">
                <img 
                  src={`https://picsum.photos/400/300?random=${num}`} 
                  alt={`Gallery ${num}`} 
                />
                <div className="gallery-caption">Image {num}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Try It Again</h2>
          <p>Scroll back to the top to see the animation reverse, or scroll down again to watch the effect.</p>
          <div className="demo-controls">
            <button 
              className="demo-btn" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <i className="fas fa-arrow-up"></i> Scroll to Top
            </button>
            <button 
              className="demo-btn" 
              onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
            >
              <i className="fas fa-arrow-down"></i> Scroll to Middle
            </button>
          </div>
        </section>
        
        {/* Spacer to ensure enough scroll area */}
        <div className="spacer" style={{ height: '1000px' }}></div>
      </div>
      
      <footer>
        <p>Scroll Image to Navbar Effect • React Component</p>
      </footer>
    </div>
  );
};

export default ScrollImageToNavbar;