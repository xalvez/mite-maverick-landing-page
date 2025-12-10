import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import './Hero.css';

const Hero = () => {
  const typewriterTexts = [
    'Innovative Software',
    'Digital Solutions',
    'Business Growth'
  ];

  const dynamicText = useTypewriter(typewriterTexts, 100, 2000);

  return (
    <section id="home" className="hero section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Transform Your Business with <br></br> {' '}
            <span className="highlight typewriter-container">
              <span className="typewriter-text">{dynamicText}</span>
              <span className="typewriter-cursor">|</span>
            </span>
          </h1>
          <p className="hero-description">
            We create cutting-edge software solutions that drive growth, 
            efficiency, and digital transformation for businesses worldwide.
          </p>
          <div className="hero-buttons">
            <button className="cta-button primary">
              Start Your Project Today
            </button>
            <button className="cta-button secondary">
              View Our Work
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;