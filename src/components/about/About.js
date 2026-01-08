import React, { useEffect, useRef, useState } from "react";
import "./About.css";
import conceptImage from "../../assets/images/OurVision-image/ddddd@4x.png";
import { useLanguage } from "../../context/LanguageContext";

const ScrollingNumber = ({ value, duration = 2500 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [numericValue, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load translations based on current language
  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      try {
        // Dynamically import the translation file for current language
        const module = await import(`../../locales/${language}/about.json`);
        setTranslations(module.default);
      } catch (error) {
        console.error(`Failed to load ${language} translations:`, error);
        // Fallback to English
        try {
          const fallback = await import(`../../locales/en/about.json`);
          setTranslations(fallback.default);
        } catch (fallbackError) {
          console.error("Failed to load fallback translations:", fallbackError);
        }
      }
      setLoading(false);
    };

    loadTranslations();
  }, [language]);

  if (loading || !translations) {
    return (
      <div className="smooth-container" id="about">
        <section className="smooth-section">
          <div className="content-wrapper">
            <div className="loading-placeholder">Loading...</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div 
      className="smooth-container" 
      id="about"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <section className="smooth-section">
        <div className="orbit-header">
          <h1 className="orbit-main-title">
            {translations.title}
          </h1>
        </div>
        <div className="content-wrapper">
          <div className="about-grid">
            {/* Left Side: Text Section */}
            <div className="about-text-section">
              {/* Corner Accents */}
              <div className="bottom-left-horizontal"></div>
              <div className="bottom-left-vertical"></div>

              <h2>{translations.heading}</h2>
              
              {translations.paragraphs.map((paragraph, index) => (
                <React.Fragment key={index}>
                  <p>{paragraph}</p>
                  {index < translations.paragraphs.length - 1 && <br />}
                </React.Fragment>
              ))}

              {/* Stats Section - Uncomment if needed */}
              {/* <div className="image-stats">
                {translations.stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-value">
                      <ScrollingNumber value={stat.value} />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Right Side: Image Section */}
            <div className="about-image-section">
              <div className="image-container">
                <div className="main-image">
                  <img src={conceptImage} alt="Infrastructure Concept" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;