import React, { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
// import About from './components/About/About';
import Services from './components/Services/Services';
// import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingMenu from './components/Shared/FloatingMenu'; 
import './styles/globals.css';
import './styles/variables.css';
import './styles/animations.css';
import './App.css';
import ScrollProgress from './hooks/ScrollProgress';
import NanoNexusProduction from './components/About/NanoNexusProduction'
import SmoothStickySection from './components/About/SmoothStickySection'

function App() {
      // Add CSS for logo animation
    useEffect(() => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes charJump {
          0% {
            opacity: 1;
            transform: translateY(-30px);
          }
          50% {
            opacity: 1;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shrinkJump {
          0% {
            opacity: 1;
            transform: translateY(-15px) scale(1.5);
          }
          60% {
            opacity: 1;
            transform: translateY(5px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .logo-box.animated .logo-char:nth-child(1) { animation-delay: 0.1s; }
        .logo-box.animated .logo-char:nth-child(2) { animation-delay: 0.2s; }
        .logo-box.animated .logo-char:nth-child(3) { animation-delay: 0.3s; }
        .logo-box.animated .logo-char:nth-child(4) { animation-delay: 0.4s; }
        .logo-box.animated .logo-char:nth-child(5) { animation-delay: 0.5s; }
        .logo-box.animated .logo-char:nth-child(6) { animation-delay: 0.6s; }
        .logo-box.animated .logo-char:nth-child(7) { animation-delay: 0.7s; }
        .logo-box.animated .logo-char:nth-child(8) { animation-delay: 0.8s; }
        .logo-box.animated .logo-char:nth-child(9) { animation-delay: 0.9s; }
        .logo-box.animated .logo-char:nth-child(10) { animation-delay: 1.0s; }
        .logo-box.animated .logo-char:nth-child(11) { animation-delay: 1.1s; }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }, []);

  const { theme, toggleTheme } = useTheme();

  // toggle event listener for FloatingMenu
  React.useEffect(() => {
    const handleThemeToggle = () => {
      toggleTheme();
    };

    window.addEventListener('toggleTheme', handleThemeToggle);

    return () => {
      window.removeEventListener('toggleTheme', handleThemeToggle);
    };
  }, [toggleTheme]);

  return (
    <div className="App">
      {/* ScrollProgress  */}
      <ScrollProgress />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main>
        <Hero />
        {/* <About /> */}
        {/* <NanoNexusProduction/> */}
         <SmoothStickySection />
        <Services />
        {/* <Projects /> for another time */}
        <Contact />
      </main>
      <Footer />
      <FloatingMenu />  
    </div>
  );
}

export default App;