import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Nano Nexus</h3>
            <p className="footer-description">
              Creating innovative software solutions that drive business growth 
              and digital transformation.
            </p>
            <div className="social-links">
              <a href="http://localhost:3000/Nano_Nexus_Landing_page" aria-label="Twitter">🐦</a>
              <a href="http://localhost:3000/Nano_Nexus_Landing_page" aria-label="LinkedIn">💼</a>
              <a href="http://localhost:3000/Nano_Nexus_Landing_page" aria-label="GitHub">🐱</a>
              <a href="http://localhost:3000/Nano_Nexus_Landing_page" aria-label="Instagram">📷</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="http://localhost:3000/Nano_Nexus_Landing_page">Web Development</a></li>
              <li><a href="http://localhost:3000/Nano_Nexus_Landing_page">Mobile Apps</a></li>
              <li><a href="http://localhost:3000/Nano_Nexus_Landing_page">Cloud Solutions</a></li>
              <li><a href="http://localhost:3000/Nano_Nexus_Landing_page">Custom Software</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📧 hello@nanonexus.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 123 Tech Street, Silicon Valley, CA</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Nano Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;