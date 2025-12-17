import React, { useState, useEffect, useRef } from "react";
import { useTypewriter } from "../../hooks/useTypewriter";
import "./Hero.css";
import MITVideo from "../../assets/videos/MIT.mp4";
import LogoImg from "../../assets/images/Asset 2@4x.png";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "../../hooks/useScrollAnimation";

const Hero = ({
  heroImage = LogoImg,
  heroVideo = null,
  mediaType = "image",
  altText = "Hero visual",
  autoPlayVideo = true,
  loopVideo = true,
  mutedVideo = true,
}) => {
  const typewriterTexts = [
    "Innovative Software",
    "Digital Solutions",
    "Business Growth",
  ];

  const dynamicText = useTypewriter(typewriterTexts, 100, 2000);
  const [isScrolled, setIsScrolled] = useState(false);
  const imageRef = useRef(null);
  const heroSectionRef = useRef(null);
  const videoRef = useRef(null);
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.1);

  // Handle video play on mount
  useEffect(() => {
    if (videoRef.current && mediaType === "video" && autoPlayVideo) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [mediaType, autoPlayVideo]);

  const socialLinks = [
    { platform: "Twitter", icon: "𝕏", url: "#" },
    { platform: "LinkedIn", icon: "in", url: "#" },
    { platform: "GitHub", icon: "</>", url: "#" },
    { platform: "Discord", icon: "💬", url: "#" },
  ];

  return (
    <section id="home" className="hero section" ref={heroSectionRef}>
      <div className="hero-content">
        {/* Left Column - Text Content */}
        <div className="hero-text">
          <h1 className="hero-title">
            Transform Your Business with <br />{" "}
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
          </div>
          <div
            className={`social-connect ${isSectionVisible ? "visible" : ""}`}
          >
            <h4>Connect With Us</h4>
            <div className="social-links-minimal">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link-minimal"
                  aria-label={social.platform}
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Media Content */}
        <div className="hero-media">
          {mediaType === "image" ? (
            <div className="media-container">
              <img
                ref={imageRef}
                src={heroImage}
                alt={altText}
                className={`transition-image media-element ${
                  isScrolled ? "scrolled" : ""
                }`}
              />
              <div className="media-frame"></div>
            </div>
          ) : mediaType === "video" ? (
            <div className="media-container">
              <video
                ref={videoRef}
                className="media-video"
                autoPlay={autoPlayVideo}
                loop={loopVideo}
                muted={mutedVideo}
                playsInline
                poster={heroImage} // Fallback image
              >
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="media-frame"></div>
            </div>
          ) : (
            <div className="media-placeholder">
              <div className="placeholder-content">
                <i className="fas fa-image"></i>
                <p>Add Image or Video</p>
                <small className="placeholder-note">
                  Set mediaType prop to "image" or "video"
                </small>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="hero-visual">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
