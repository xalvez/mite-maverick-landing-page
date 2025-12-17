// SmoothStickySection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./About.css";
import TextAnimation from "../../hooks/TextAnimation";

const About = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("outside");
  const [bgTransform, setBgTransform] = useState({
    scale: 1,
    translateY: 100,
    opacity: 0,
    blur: 10,
  });

  useEffect(() => {
    let rafId;

    const updateAnimations = () => {
      if (!sectionRef.current || !bgRef.current) return;

      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const scrollDistance = scrollY - sectionTop + windowHeight * 0.5;
      const totalScrollable = sectionHeight + windowHeight * 0.5;
      const currentProgress = Math.max(
        0,
        Math.min(1, scrollDistance / totalScrollable)
      );
      setProgress(currentProgress);

      if (currentProgress < 0.15) {
        setPhase("entering");
        const phaseProgress = currentProgress / 0.15;
        const translateY = 100 - phaseProgress * 100;
        const opacity = phaseProgress;
        const scale = 0.9 + phaseProgress * 0.1;
        const blur = 10 - phaseProgress * 10;

        setBgTransform({ translateY, opacity, scale, blur });
        bgRef.current.style.position = "fixed";
        bgRef.current.style.top = "0";
      } else if (currentProgress >= 0.15 && currentProgress < 0.75) {
        setPhase("sticky");
        setBgTransform({
          translateY: 0,
          opacity: 1,
          scale: 1,
          blur: 0,
        });
        bgRef.current.style.position = "fixed";
        bgRef.current.style.top = "0";
      } else if (currentProgress >= 0.75 && currentProgress < 1) {
        setPhase("leaving");
        const fadeOutProgress = (currentProgress - 0.75) / 0.25;
        const translateY = -(fadeOutProgress * 50);
        const opacity = 1 - fadeOutProgress;
        const scale = 1 - fadeOutProgress * 0.1;
        const blur = fadeOutProgress * 5;

        setBgTransform({ translateY, opacity, scale, blur });
        if (currentProgress < 0.95) {
          bgRef.current.style.position = "fixed";
          bgRef.current.style.top = "0";
        } else {
          bgRef.current.style.position = "absolute";
          bgRef.current.style.top = "100%";
        }
      } else {
        setPhase("exited");
        setBgTransform({
          translateY: -100,
          opacity: 0,
          scale: 0.9,
          blur: 10,
        });
        bgRef.current.style.position = "absolute";
        bgRef.current.style.top = "100%";
      }

      if (contentRef.current) {
        const contentParallax = Math.min(100, currentProgress * 150);
        contentRef.current.style.transform = `translateY(${contentParallax}px)`;
      }

      rafId = requestAnimationFrame(updateAnimations);
    };

    rafId = requestAnimationFrame(updateAnimations);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const features = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology solutions",
      icon: "🚀",
      color: "var(--accent-1)",
    },
    {
      title: "Quality",
      description: "Delivering excellence in every product and service",
      icon: "⭐",
      color: "var(--accent-2)",
    },
    {
      title: "Sustainability",
      description: "Building a greener future through responsible practices",
      icon: "🌱",
      color: "#1e8f75",
    },
  ];

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "50+", label: "Countries Served" },
    { value: "99%", label: "Client Satisfaction" },
  ];

  return (
    <div className="smooth-container">
      <section
        ref={sectionRef}
        className="smooth-section"
        style={{ minHeight: "300vh" }}
      >
        <div
          ref={bgRef}
          className="smooth-background"
          style={{
            transform: `translateY(${bgTransform.translateY}px) scale(${bgTransform.scale})`,
            opacity: bgTransform.opacity,
            filter: `blur(${bgTransform.blur}px)`,
            position: "fixed",
            top: "0",
          }}
        >
        </div>

        <div ref={contentRef} className="smooth-content">
          <div className="content-wrapper">
            <div className="smooth-header">
              <h1 className="main-title">
                <span className="title-word">About Us</span>
          
             
              </h1>
              <p className="subtitle">
                Building the future with innovation, quality, and sustainability
              </p>
            </div>

            {/* Main About Grid */}
            <div className="about-grid">
              <div className="about-text-section">
                <div className="text-content">
                  <h2>Pioneering Excellence Since 2013</h2>
                  <p>
                    We are a global technology company dedicated to creating
                    innovative solutions that transform industries and improve
                    lives. Our team of experts combines cutting-edge technology
                    with human-centered design to deliver products that matter.
                  </p>
                  <p>
                    With a decade of experience, we've established ourselves as
                    leaders in digital transformation, helping businesses adapt
                    and thrive in the modern world. Our commitment to quality
                    and sustainability drives everything we do.
                  </p>
                  <div className="highlight-box">
                    <div className="highlight-icon">💡</div>
                    <div className="highlight-text">
                      <strong>Our Mission:</strong> To empower businesses with
                      technology that drives growth, efficiency, and positive
                      impact.
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-image-section">
                <div className="image-container">
                  <div className="main-image">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Our Company Team"
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="image-stats">
                    {stats.map((stat, index) => (
                      <div key={index} className="stat-item">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Company Summary Section */}
            <div className="company-summary">
              <div className="summary-header">
                <TextAnimation
                  text="Our Vision for Tomorrow"
                  type="word"
                  animationType="scale"
                  delay={0.3}
                />
                <p className="summary-subtitle">
                  Building sustainable solutions for generations to come
                </p>
              </div>

              <div className="summary-grid">
                <div className="summary-card">
                  <div className="summary-image">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Innovation Lab"
                    />
                  </div>
                  <div className="summary-content">
                    <h3>Innovation Lab</h3>
                    <p>
                      Our state-of-the-art R&D facility where ideas become
                      reality. We invest 20% of our revenue back into research
                      to stay ahead of the curve.
                    </p>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-content">
                    <h3>Global Impact</h3>
                    <p>
                      Operating across 50+ countries, we're committed to
                      creating technology that bridges gaps and creates
                      opportunities worldwide.
                    </p>
                  </div>
                  <div className="summary-image">
                    <img
                      src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80"
                      alt="Global Network"
                    />
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-image">
                    <img
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                      alt="Sustainability"
                    />
                  </div>
                  <div className="summary-content">
                    <h3>Sustainable Future</h3>
                    <p>
                      Carbon-neutral since 2020, we're pioneering green
                      technology solutions that help businesses reduce their
                      environmental footprint.
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Features */}
              <div className="features-section">
                <div class="glow-bottom-left"></div>
                <div class="glow-left-bottom"></div>

                <h2 className="features-title">What Makes Us Different</h2>
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="transform-glow-border"
                      style={{
                        opacity: Math.max(0, Math.min(1, (progress - 0.1) * 3)),
                      }}
                    >
                      <div class="bottom-left-horizontal"></div>
                      <div class="bottom-left-vertical"></div>
                      <div
                        className="feature-icon-wrapper"
                        style={{ backgroundColor: feature.color }}
                      >
                        <div className="feature-icon">{feature.icon}</div>
                      </div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
                <div class="glow-bottom-left"></div>
              </div>

              {/* Final CTA */}
              <div className="final-cta">
                <TextAnimation
                  text="Join us in shaping the future"
                  type="word"
                  animationType="fade"
                  delay={0.2}
                />
                <p className="cta-subtitle">
                  Interested in working with us or learning more about our
                  solutions?
                </p>
                <button className="cta-button">Get in Touch</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
