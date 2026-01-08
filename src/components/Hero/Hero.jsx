import React, { useEffect, useRef, memo, useState, useMemo } from "react";
import "./Hero.css";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import LogoImg from "../../assets/images/Asset 2@4x.png";
import { useLanguage } from "../../context/LanguageContext";

// Social Icon Imports
import Facebook from '../../assets/images/Hero/iconoir_facebook.png';  
import Instagram from '../../assets/images/Hero/line-md_instagram.png';     
import Whatsapp from '../../assets/images/Hero/mdi_whatsapp.png';    
import Linkedin from '../../assets/images/Hero/basil_linkedin-outline.png';
import Telegram from '../../assets/images/Hero/Telegram.png';    

// Memoize the typewriter component properly
const ZenithTypewriter = memo(({ texts }) => {
  const dynamicText = useTypewriter(texts, 80, 2000);
  
  return (
    <span className="zenith-highlight zenith-typewriter-container">
      <span className="zenith-typewriter-text">{dynamicText}</span>
      <span className="zenith-typewriter-cursor"></span>
    </span>
  );
}, (prevProps, nextProps) => {
  // Only re-render if texts array actually changed
  return JSON.stringify(prevProps.texts) === JSON.stringify(nextProps.texts);
});

const Hero = ({
  heroImage = LogoImg,
  heroVideo = null,
  mediaType = "image",
  altText = "Hero visual",
  autoPlayVideo = true,
  loopVideo = true,
  mutedVideo = true,
}) => {
  const { language } = useLanguage();
  const videoRef = useRef(null);
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.1);
  const [heroTranslations, setHeroTranslations] = useState(null);
  const translationsLoaded = useRef(false);

  // Load translations once
  useEffect(() => {
    if (translationsLoaded.current) return;
    
    const loadTranslations = async () => {
      try {
        const response = await import(`../../locales/${language}/hero.json`);
        setHeroTranslations(response.default);
        translationsLoaded.current = true;
      } catch (error) {
        console.error(`Failed to load hero translations for ${language}:`, error);
        try {
          const fallback = await import(`../../locales/en/hero.json`);
          setHeroTranslations(fallback.default);
          translationsLoaded.current = true;
        } catch (e) {
          console.error("Failed to load fallback translations:", e);
        }
      }
    };

    loadTranslations();

    return () => {
      translationsLoaded.current = false;
    };
  }, [language]);

  // Memoize typewriter texts to prevent recreation on every render
  const typewriterTexts = useMemo(() => {
    if (!heroTranslations) return ["", "", ""];
    return [
      heroTranslations.title_part2,
      heroTranslations.title_part3,
      heroTranslations.title_part4
    ];
  }, [heroTranslations]);

  useEffect(() => {
    if (videoRef.current && mediaType === "video" && autoPlayVideo) {
      videoRef.current.play().catch((err) => console.log("Video blocked", err));
    }
  }, [mediaType, autoPlayVideo]);

  // Memoize social links
  const socialLinks = useMemo(() => [
    { platform: "Facebook", img: Facebook, url: "#" },
    { platform: "Instagram", img: Instagram, url: "#" },
    { platform: "WhatsApp", img: Whatsapp, url: "#" },
    { platform: "LinkedIn", img: Linkedin, url: "#" },
    { platform: "Telegram", img: Telegram, url: "#" },
  ], []);

  // Early return if translations aren't loaded
  if (!heroTranslations) {
    return <div className="zenith-hero-section">Loading...</div>;
  }

  return (
    <section id="home" className="zenith-hero-section" ref={sectionRef}>
      <div className="zenith-main-layout">
        
        {/* Left Side Content */}
        <div className="zenith-text-block">
          <h1 className="zenith-main-title">
            {heroTranslations.title_part1} <br /> 
            <ZenithTypewriter key={language} texts={typewriterTexts} />
          </h1>
          
          <p className="zenith-sub-text">
            {heroTranslations.subtitle}
          </p>

          <div className="zenith-action-area">
            <a href="#contact" className="zenith-cta-btn">
              <span>{heroTranslations.cta_button}</span>
              <span className="zenith-btn-arrow">→</span>
            </a>
          </div>

          <div className={`zenith-social-wrapper ${isSectionVisible ? "zenith-visible" : ""}`}>
            <h4 className="zenith-social-label">{heroTranslations.social_label}</h4>
            <div className="zenith-social-grid">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.url} className="zenith-social-item" aria-label={social.platform}>
                  <img src={social.img} alt={social.platform} className="zenith-icon-asset" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Media (Logo) */}
        <div className="zenith-media-block">
          <div className="zenith-asset-holder">
            {mediaType === "image" ? (
              <img src={heroImage} alt={altText} className="zenith-img-fluid" />
            ) : (
              <video ref={videoRef} className="zenith-video-fluid" autoPlay loop muted playsInline>
                <source src={heroVideo} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);