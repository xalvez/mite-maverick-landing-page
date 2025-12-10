import React from "react";
import {
  useScrollAnimation,
  useStaggerAnimation,
  useShapeReveal,
} from "../../hooks/useScrollAnimation";
import "./About.css";
import TextAnimation from "../../hooks/TextAnimation";

const About = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.1);
  const [statsRef, visibleStats] = useStaggerAnimation(4, 0.2);
  // const [featuresRef, visibleFeatures] = useStaggerAnimation(3, 0.15);
  const [shapeRevealRef, revealProgress] = useShapeReveal(0.1);

  const stats = [
    { number: "50+", label: "Projects Completed", icon: "🚀" },
    { number: "5+", label: "Years Experience", icon: "⭐" },
    { number: "30+", label: "Happy Clients", icon: "😊" },
    { number: "99%", label: "Success Rate", icon: "📈" },
  ];

  // const features = [
  //   {
  //     icon: "🔍",
  //     title: "Innovation First",
  //     description:
  //       "We stay ahead of technology trends to deliver cutting-edge solutions.",
  //     gradient: "gradient-1",
  //   },
  //   {
  //     icon: "💡",
  //     title: "Creative Solutions",
  //     description:
  //       "Thinking outside the box to solve complex business challenges.",
  //     gradient: "gradient-2",
  //   },

  // ];

  const getRevealClass = () => {
    if (revealProgress < 0.3) return "";
    if (revealProgress < 0.7) return "reveal-50";
    return "reveal-100";
  };

  return (
    <section id="about" className="about section" ref={sectionRef}>
      {/* Enhanced Animated Background Elements */}
      <div className="animated-bg-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="glow-circle circle-1"></div>
        <div className="glow-circle circle-2"></div>

        {/* Floating Particles */}
        <div className="floating-particle particle-1"></div>
        <div className="floating-particle particle-2"></div>
        <div className="floating-particle particle-3"></div>
        <div className="floating-particle particle-4"></div>
      </div>

      {/* Shape Reveal Container */}
      <div className="shape-reveal-container" ref={shapeRevealRef}>
        <div className={`shape-background ${getRevealClass()}`}></div>
      </div>

      <div className="container">
        {/* Fixed Section Header - No Animation Issues */}
        <div className="section-header-fixed">
          <h2 className="section-title-fixed">
            About <span className="gradient-text">Nano Nexus</span>
          </h2>
          <p className="section-subtitle-About">
            Pioneering the Future of Digital Innovation
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="about-content">
          <div className="about-main">
            <div
              className={`about-text shape-reveal ${
                isSectionVisible ? "visible" : ""
              }`}
            >
              {/* lightning the About section */}
              {/* <div className="light-beam"></div> */}
              <h3>
                Transforming Ideas Into{" "}
                <span className="highlight-text">Digital Excellence</span>
              </h3>
              <p>
                At <strong>Nano Nexus</strong>, we are more than just a software
                development company. We are your strategic partner in digital
                transformation, combining cutting-edge technology with
                innovative thinking to create solutions that drive real business
                value.
              </p>
              <p>
                Founded with a vision to bridge the gap between complex business
                challenges and elegant technological solutions, our team of
                expert developers, designers, and strategists work
                collaboratively to deliver exceptional results.
              </p>
              <div className="hero-content">
                <TextAnimation
                  text="Immerse in the Journey"
                  type="word"
                  animationType="scale"
                  delay={0.5}
                />
                <TextAnimation
                  text="Where every scroll reveals a new dimension of visual storytelling"
                  type="line"
                  animationType="slide"
                  delay={0.5}
                />
              </div>

              <div className="mission-vision">
                <div className="mission-card glass-card glass-card-primary">
                  <h4>🎯 Our Mission</h4>
                  <p>
                    To empower businesses with innovative software solutions
                    that drive growth, efficiency, and digital transformation.
                  </p>
                  <div className="corner-glow top-left"></div>
                  <div className="corner-glow bottom-right"></div>
                </div>
                <div className="vision-card glass-card glass-card-secondary">
                  <h4>🔭 Our Vision</h4>
                  <p>
                    To be the leading force in creating a digitally transformed
                    world where technology enhances every aspect of business.
                  </p>
                  <div className="corner-glow top-left"></div>
                  <div className="corner-glow bottom-right"></div>
                </div>
              </div>
            </div>

            {/* Stats Grid with Staggered Animation */}
            <div className="stats-section" ref={statsRef}>
              <h4 className="shape-reveal">Our Impact in Numbers</h4>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`stat-item glass-card glass-card-glow stagger-item ${
                      visibleStats.includes(index) ? "visible" : ""
                    } stagger-delay-${index + 1}`}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                    <div className="stat-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Features & Technologies */}
          <div className="about-sidebar">
            {/* Features with Staggered Animation */}
            {/* <div className="features-section" ref={featuresRef}>
              <h4 className="shape-reveal">Why Choose Nano Nexus?</h4>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`feature-card glass-card glass-card-glow shape-reveal-center ${
                      visibleFeatures.includes(index) ? "visible" : ""
                    } stagger-delay-${index + 1}`}
                  >
                    <div className="feature-icon">{feature.icon}</div>
                    <h5>{feature.title}</h5>
                    <p>{feature.description}</p>
                    <div className="feature-glow"></div>
                    <div className="light-beam"></div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Technology Stack with Progress Reveal */}
            {/* <div
              className={`tech-stack shape-progress-reveal ${getRevealClass()}`}
            >
              <h4>Technology Excellence</h4>
              <div className="tech-bars">
                {[
                  { name: "React", level: 95 }, 
                  { name: "Node.js", level: 90 },
                  { name: "Python", level: 85 },
                  { name: "AWS", level: 88 },
                  { name: "UI/UX Design", level: 92 },
                  { name: "Mobile Development", level: 87 },
                ].map((tech, index) => (
                  <div key={index} className="tech-item">
                    <div className="tech-info">
                      <span className="tech-name">{tech.name}</span>
                      <span className="tech-percent">{tech.level}%</span>
                    </div>
                    <div className="tech-bar">
                      <div
                        className="tech-progress"
                        style={{ width: `${revealProgress * tech.level}%` }}
                        data-level={tech.level}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div
          className={`about-cta shape-reveal ${
            isSectionVisible ? "visible" : ""
          }`}
        >
          <div className="cta-content glow-box intense-glow">
            <h3>Ready to Start Your Digital Journey?</h3>
            <p>
              Let's collaborate to bring your vision to life with innovative
              technology solutions.
            </p>
            <button className="cta-button glow-on-hover">
              Start Your Project Today
            </button>
            <div className="cta-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default About;
