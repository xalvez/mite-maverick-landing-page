import React, { useState, useEffect, useRef } from 'react';
import './NavbarImageTransition.css';

const NavbarImageTransition = ({ 
  transitionImage, 
  navbarLogo = 'Logo',
  navItems = [
    { id: 1, label: 'Home', href: '#home' },
    { id: 2, label: 'About', href: '#about' },
    { id: 3, label: 'Services', href: '#services' },
    { id: 4, label: 'Contact', href: '#contact' },
  ]
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navbarRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 100;
      
      // Update scroll state
      setIsScrolled(scrollY > scrollThreshold);
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = 500;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
      
      // Update image position based on scroll
      updateImagePosition(scrollY, scrollThreshold);
    };

    const updateImagePosition = (scrollY, threshold) => {
      if (!imageRef.current || !navbarRef.current) return;
      
      const image = imageRef.current;
      const navbar = navbarRef.current;
      
      if (scrollY > threshold) {
        // Image is in navbar
        const navbarRect = navbar.getBoundingClientRect();
        const navbarRight = window.innerWidth - (navbarRect.left + navbarRect.width);
        
        // Calculate position within navbar
        const progressInNavbar = Math.min((scrollY - threshold) / 200, 1);
        const rightPosition = 20 + (navbarRight - 20) * (1 - progressInNavbar);
        
        image.style.right = `${rightPosition}px`;
        image.style.top = `${10 + progressInNavbar * 5}px`;
        image.style.width = `${50 - progressInNavbar * 10}px`;
        image.style.height = `${50 - progressInNavbar * 10}px`;
        image.style.opacity = `${progressInNavbar}`;
      } else {
        // Image is transitioning from right side
        const startPosition = -300;
        const endPosition = 50;
        const progress = Math.min(scrollY / threshold, 1);
        const currentRight = startPosition + (endPosition - startPosition) * progress;
        
        image.style.right = `${currentRight}px`;
        image.style.top = `${20 + progress * 40}px`;
        image.style.width = `${120 - progress * 70}px`;
        image.style.height = `${120 - progress * 70}px`;
        image.style.opacity = `${progress}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize image position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="navbar-image-transition">
      {/* Navigation Bar */}
      <nav 
        ref={navbarRef} 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        style={{
          backgroundColor: `rgba(44, 62, 80, ${0.9 + scrollProgress * 0.1})`,
          padding: isScrolled ? '10px 30px' : '15px 30px'
        }}
      >
        <div className="logo">
          <i className="fas fa-mountain"></i>
          <span>{navbarLogo}</span>
        </div>
        
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.id} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        
        {/* Transitioning Image */}
        <img
          ref={imageRef}
          src={transitionImage}
          alt="Transition"
          className="transition-image"
          style={{
            transform: `rotate(${scrollProgress * 360}deg)`,
            borderColor: `hsl(${scrollProgress * 120}, 70%, 50%)`,
          }}
        />
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <h1>Image Transition Demo</h1>
        <p>Scroll down to see the image transition from the right side into the navbar</p>
        <div className="scroll-indicator">
          <i className="fas fa-chevron-down fa-2x"></i>
        </div>
      </section>

      {/* Content Sections */}
      <div className="content">
        <section id="about" className="section">
          <h2>About This Effect</h2>
          <p>
            This React component demonstrates how to create a smooth image transition 
            from the right side of the screen into the navigation bar as you scroll down.
            The image starts off-screen on the right and smoothly animates into the navbar.
          </p>
          <div className="scroll-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${scrollProgress * 100}%` }}
              ></div>
            </div>
            <p>Scroll Progress: {Math.round(scrollProgress * 100)}%</p>
          </div>
        </section>

        <section id="services" className="section">
          <h2>How It Works</h2>
          <ul>
            <li>The component uses React state to track scroll position</li>
            <li>CSS transitions are controlled via inline styles and classes</li>
            <li>The image position is calculated based on scroll progress</li>
            <li>Multiple properties are animated: position, size, opacity, and rotation</li>
            <li>The navbar also changes subtly as you scroll</li>
          </ul>
        </section>

        <section id="contact" className="section">
          <h2>Try It Yourself</h2>
          <p>
            Keep scrolling to see the complete transition. The image will shrink 
            and settle into the navbar as you reach the middle of the page.
          </p>
          <div className="image-gallery">
            {[1, 2, 3, 4].map((num) => (
              <img 
                key={num} 
                src={`https://picsum.photos/300/200?random=${num}`} 
                alt={`Sample ${num}`} 
              />
            ))}
          </div>
        </section>
        
        {/* Spacer to ensure enough scroll area */}
        <div className="spacer" style={{ height: '800px' }}></div>
      </div>
      
      <footer>
        <p>React Image Transition Component • Scroll to see the effect</p>
      </footer>
    </div>
  );
};

export default NavbarImageTransition;