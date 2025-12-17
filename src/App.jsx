import Contact from "./components/ContactUs/Contact";
import Hero from "./components/navbar/Hero";
import ServicesSection from './components/popup-cards/ServicesSection';
import About from "./components/about/About";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

   const [trianglePosition, setTrianglePosition] = useState(-100);
 const [lettersVisible, setLettersVisible] = useState([]);
 const [taglineVisible, setTaglineVisible] = useState(false);
 const [isScrolled, setIsScrolled] = useState(false);

 /** Logo animation start */
 React.useEffect(() => {
   const letters = "MiteMaverick".split("");

   setTimeout(() => setTrianglePosition(0), 300);
   setTimeout(() => setTrianglePosition(100), 1000);

   letters.forEach((_, i) => {
     setTimeout(() => {
       setLettersVisible(prev => [...prev, i]);
     }, 1200 + i * 100);
   });

   setTimeout(() => {
     setTaglineVisible(true);
   }, 1200 + letters.length * 100 + 500);
 }, []);


  const [theme, setTheme] = useState('light');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  // Track mouse movement for light effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Generate random particles
  const renderParticles = () => {
    return Array.from({ length: 50 }).map((_, i) => (
      <div 
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: Math.random() * 0.5 + 0.2,
          background: `var(--accent-${i % 2 === 0 ? '1' : '2'})`
        }}
      />
    ));
  };

 

  return (
    <div className="modern-container">
             <Navbar
toggleTheme={toggleTheme}
      theme={theme}
       />
       <Hero/>
       <About/>
       <ServicesSection />

       <Contact/>


       <Footer/>
      
      {/* Floating Gradient Orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      
      {/* Grid Lines */}
      <div className="grid-lines"></div>
      
      {/* Animated Shapes */}
      <div className="floating-shape shape-a"></div>
      <div className="floating-shape shape-b"></div>
      
      {/* Moving Lines */}
      <div className="moving-lines">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
        <div className="line line-4"></div>
      </div>
      
      {/* Mouse Following Light */}
      <div 
        className="mouse-light"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      ></div>
      
      {/* Particles */}
      <div className="particles">
        {renderParticles()}
      </div>
    </div>
  );
}

export default App;




