import React, { useState, useEffect } from 'react';
import './ourvision.css';
import { useLanguage } from '../../context/LanguageContext';

// Import your local images
import conceptImage from '../../assets/images/OurVision-image/ttttttttt@4x.png';  
import buildImage from '../../assets/images/OurVision-image/668@4x.png';     
import launchImage from '../../assets/images/OurVision-image/kkkkkk@4x.png';    
import scaleImage from '../../assets/images/OurVision-image/vvvvvvvv@4x.png';

const CardGallery = () => {
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);
  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load translations based on current language
  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      try {
        // Dynamically import the translation file for current language
        const module = await import(`../../locales/${language}/vision.json`);
        setTranslations(module.default);
      } catch (error) {
        console.error(`Failed to load ${language} translations:`, error);
        // Fallback to English
        try {
          const fallback = await import(`../../locales/en/vision.json`);
          setTranslations(fallback.default);
        } catch (fallbackError) {
          console.error("Failed to load fallback translations:", fallbackError);
        }
      }
      setLoading(false);
    };

    loadTranslations();
  }, [language]);

  const toggleMobileExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Image array - these stay the same regardless of language
  const cardImages = [
    { id: 1, img: conceptImage },
    { id: 2, img: buildImage },
    { id: 3, img: launchImage },
    { id: 4, img: scaleImage }
  ];

  if (loading || !translations) {
    return (
      <div id='outvision' className="vision-wrapper">
        <div className="orbit-header">
          <h1 className="orbit-main-title">Our <span>Vision</span></h1>
        </div>
        <div className="vision-container">
          <div className="loading-placeholder">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id='outvision' 
      className="vision-wrapper"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="orbit-header">
        <h1 className="orbit-main-title">
          {translations.title}
        </h1>
      </div>
      
      <div className="vision-container">
        {translations.cards.map((card) => {
          // Find the corresponding image for this card
          const cardImage = cardImages.find(img => img.id === card.id);
          
          return (
            <div
              key={card.id}
              className={`vision-card ${expandedId === card.id ? 'active' : ''}`}
              style={{ backgroundImage: `url(${cardImage?.img})` }}
            >
              <div className="bottom-left-horizontal"></div>
              <div className="bottom-left-vertical"></div>
              <div className="vision-overlay" />
              
              <div className="vision-content">
                <span className="vision-subtitle">{card.subtitle}</span>
                <h2 className="vision-title">{card.title}</h2>
                
                {/* This button only displays on mobile via CSS */}
                <button 
                  className="mobile-expand-trigger"
                  onClick={() => toggleMobileExpand(card.id)}
                >
                  {expandedId === card.id ? 
                    translations.buttons.show_less : 
                    translations.buttons.learn_more
                  }
                </button>
                
                <div className="vision-details">
                  <p>{card.text}</p>
                  {/* Uncomment if you want to use the Get Started button */}
                  {/* <button className="vision-btn">
                    {translations.buttons.get_started}
                  </button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardGallery;