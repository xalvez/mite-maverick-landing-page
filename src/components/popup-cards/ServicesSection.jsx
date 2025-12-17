// ServicesSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import './ServicesSection.css';
import '../../style/variables.css';

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const expandedCardRefs = useRef([]);
  const rightTextRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Web Development",
      shortTitle: "Web",
      icon: "💻",
      description: "Modern web applications with cutting-edge tech.",
      fullDescription: "We craft responsive, scalable web solutions using React, Vue.js, and Node.js. Our development process includes UI/UX design, frontend and backend development, testing, and deployment.",
      features: ["Custom Web Apps", "E-commerce Solutions", "Progressive Web Apps", "API Integration"],
      buttonText: "Start Project",
    },
    {
      id: 2,
      title: "Mobile Apps",
      shortTitle: "Mobile",
      icon: "📱",
      description: "Native & cross-platform mobile solutions.",
      fullDescription: "Build powerful mobile experiences for iOS and Android. We specialize in React Native and Flutter for rapid development cycles with native-like performance.",
      features: ["iOS/Android Apps", "React Native", "App Store Deployment", "App Maintenance"],
      buttonText: "View Apps",
    },
    {
      id: 3,
      title: "UI/UX Design",
      shortTitle: "Design",
      icon: "🎨",
      description: "Beautiful, intuitive user interfaces.",
      fullDescription: "Create engaging user experiences with our comprehensive design process: user research, wireframing, prototyping, and user testing.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      buttonText: "See Work",
    },
    {
      id: 4,
      title: "Cloud Solutions",
      shortTitle: "Cloud",
      icon: "☁️",
      description: "Scalable cloud infrastructure.",
      fullDescription: "Modern cloud infrastructure setup, migration, and management using AWS, Google Cloud, or Azure. We ensure your applications are scalable, secure, and cost-effective.",
      features: ["AWS/Azure/GCP", "DevOps", "Serverless Architecture", "Database Management"],
      buttonText: "Get Quote",
    }
  ];

// In the useEffect hook
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Use requestAnimationFrame for smoother animation timing
      requestAnimationFrame(() => {
        setIsScrolled(entry.isIntersecting);
      });
    },
    {
      threshold: 0.05, // Lower threshold for earlier detection
      rootMargin: '-30px' // Smaller margin for smoother entry
    }
  );

  // ... rest of the code ...
}, []);

  const handleServiceClick = async (index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (activeService === index) {
      // Close animation
      setActiveService(null);
      // Show right text on desktop
      if (window.innerWidth >= 992 && rightTextRef.current) {
        rightTextRef.current.classList.remove('hidden');
      }
    } else {
      // Hide right text on desktop when opening a card
      if (window.innerWidth >= 992 && rightTextRef.current) {
        rightTextRef.current.classList.add('hidden');
      }
      setActiveService(index);
      
      // Scroll to the expanded card on mobile
      if (window.innerWidth < 992 && expandedCardRefs.current[index]) {
        setTimeout(() => {
          expandedCardRefs.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }, 100);
      }
    }
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
   
    <section className="services-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Premium Services</h2>
          <p className="section-subtitle">Expert solutions that drive your business forward</p>
        </div>
        
        <div className="services-content-wrapper">
          {/* Left Section - Services Cards with inline details on mobile */}
          <div className="cards-section">
            <div className="cards-container">
              {services.map((service, index) => (
                <div key={service.id} className="service-card-wrapper">
                  {/* Main Service Card */}
                  <div 
                    className={`service-card ${activeService === index ? 'active' : ''}`}
                    onClick={() => handleServiceClick(index)}
                  >
                    <div className="card-glass-layer" />
                    
                    <div className="card-content">
                      <div className="card-icon-wrapper">
                        <div className="card-icon">
                          {service.icon}
                        </div>
                        {/* Connection dot only on desktop */}
                        <div className="desktop-connection-dot" />
                      </div>
                      
                      <div className="card-text">
                        <h3 className="card-title">{service.title}</h3>
                        <p className="card-description">{service.description}</p>
                      </div>
                      
                      <div className="card-action">
                        <div className="card-tag">
                          {service.shortTitle}
                        </div>
                        <div className={`card-arrow ${activeService === index ? 'active' : ''}`}>
                          {window.innerWidth >= 992 ? '→' : '↓'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Details - Only shows on mobile, under its card */}
                  {activeService === index && (
                    <div className="mobile-details-wrapper">
                      <div 
                        ref={el => expandedCardRefs.current[index] = el}
                        className="mobile-expanded-details"
                      >
                        {/* Connection Line for Mobile */}
                        <div className="mobile-connection-line" />
                        
                        <div className="mobile-details-glass-layer" />
                        
                        <div className="mobile-details-content">
                          <div className="mobile-details-header">
                            <div className="mobile-details-icon">
                              {service.icon}
                            </div>
                            <div className="mobile-header-text">
                              <h3 className="mobile-details-title">{service.title}</h3>
                              <p className="mobile-details-subtitle">Premium Service</p>
                            </div>
                            <button 
                              className="mobile-close-details"
                              onClick={() => handleServiceClick(index)}
                            >
                              ×
                            </button>
                          </div>
                          
                          <div className="mobile-details-body">
                            <p className="mobile-details-description">
                              {service.fullDescription}
                            </p>
                            
                            <div className="mobile-details-features">
                              <h4 className="mobile-features-title">What You Get</h4>
                              <div className="mobile-features-grid">
                                {service.features.map((feature, idx) => (
                                  <div key={idx} className="mobile-feature-item">
                                    <span className="mobile-feature-bullet">•</span>
                                    <span className="mobile-feature-text">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mobile-details-stats">
                              <div className="mobile-stat-item">
                                <div className="mobile-stat-value">98%</div>
                                <div className="mobile-stat-label">Satisfaction</div>
                              </div>
                              <div className="mobile-stat-item">
                                <div className="mobile-stat-value">24/7</div>
                                <div className="mobile-stat-label">Support</div>
                              </div>
                              <div className="mobile-stat-item">
                                <div className="mobile-stat-value">30+</div>
                                <div className="mobile-stat-label">Projects</div>
                              </div>
                            </div>
                            
                            <div className="mobile-details-actions">
                              <button className="mobile-details-primary-btn">
                                {service.buttonText}
                              </button>
                              <button className="mobile-details-secondary-btn">
                                Schedule Call
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Section - Desktop details or overall text */}
          <div className="desktop-details-section">
            {/* Desktop Details Container */}
            <div className={`desktop-details-container ${activeService !== null ? 'active' : ''}`}>
              {activeService !== null && (
                <div className="desktop-expanded-details">
                  {/* Desktop Connection Line */}
                  <div className="desktop-connection-line" />
                  
                  <div className="desktop-details-glass-layer" />
                  
                  <div className="desktop-details-content">
                    <div className="desktop-details-header">
                      <div className="desktop-details-icon">
                        {services[activeService].icon}
                      </div>
                      <div className="desktop-header-text">
                        <h3 className="desktop-details-title">{services[activeService].title}</h3>
                        <p className="desktop-details-subtitle">Premium Service</p>
                      </div>
                      <button 
                        className="desktop-close-details"
                        onClick={() => handleServiceClick(activeService)}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="desktop-details-body">
                      <p className="desktop-details-description">
                        {services[activeService].fullDescription}
                      </p>
                      
                      <div className="desktop-details-features">
                        <h4 className="desktop-features-title">What You Get</h4>
                        <div className="desktop-features-grid">
                          {services[activeService].features.map((feature, idx) => (
                            <div key={idx} className="desktop-feature-item">
                              <span className="desktop-feature-bullet">•</span>
                              <span className="desktop-feature-text">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="desktop-details-stats">
                        <div className="desktop-stat-item">
                          <div className="desktop-stat-value">98%</div>
                          <div className="desktop-stat-label">Satisfaction</div>
                        </div>
                        <div className="desktop-stat-item">
                          <div className="desktop-stat-value">24/7</div>
                          <div className="desktop-stat-label">Support</div>
                        </div>
                        <div className="desktop-stat-item">
                          <div className="desktop-stat-value">30+</div>
                          <div className="desktop-stat-label">Projects</div>
                        </div>
                      </div>
                      
                      <div className="desktop-details-actions">
                        <button className="desktop-details-primary-btn">
                          {services[activeService].buttonText}
                        </button>
                        <button className="desktop-details-secondary-btn">
                          Schedule Call
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Desktop Right Text Section (Overall Services Info) */}
            <div 
              ref={rightTextRef}
              className={`desktop-right-text-section ${activeService !== null ? 'hidden' : ''}`}
            >
              <div className="desktop-text-glass-layer" />
              
              <div className="desktop-right-text-content">
                <h3 className="desktop-right-title">Why Choose Our Services?</h3>
                
                <div className="desktop-text-block">
                  <p className="desktop-text-description">
                    We combine technical expertise with creative vision to deliver exceptional 
                    digital experiences that drive business growth. Our team is dedicated to 
                    understanding your unique needs and providing tailored solutions.
                  </p>
                  
                  <p className="desktop-text-description">
                    With years of industry experience and a passion for innovation, we help 
                    businesses transform their ideas into successful digital products.
                  </p>
                </div>
                
                <div className="desktop-benefits-list">
                  <div className="desktop-benefit-item">
                    <div className="desktop-benefit-icon">✓</div>
                    <div className="desktop-benefit-text">
                      <h4>Expert Team</h4>
                      <p>Seasoned professionals with diverse expertise</p>
                    </div>
                  </div>
                  
                  <div className="desktop-benefit-item">
                    <div className="desktop-benefit-icon">✓</div>
                    <div className="desktop-benefit-text">
                      <h4>Quality Assurance</h4>
                      <p>Rigorous testing and quality control processes</p>
                    </div>
                  </div>
                  
                  <div className="desktop-benefit-item">
                    <div className="desktop-benefit-icon">✓</div>
                    <div className="desktop-benefit-text">
                      <h4>Timely Delivery</h4>
                      <p>We respect deadlines and deliver on time</p>
                    </div>
                  </div>
                  
                  <div className="desktop-benefit-item">
                    <div className="desktop-benefit-icon">✓</div>
                    <div className="desktop-benefit-text">
                      <h4>Ongoing Support</h4>
                      <p>Continuous support even after project completion</p>
                    </div>
                  </div>
                </div>
                
                <div className="desktop-stats-overview">
                  <div className="desktop-overview-item">
                    <div className="desktop-overview-number">200+</div>
                    <div className="desktop-overview-label">Happy Clients</div>
                  </div>
                  <div className="desktop-overview-item">
                    <div className="desktop-overview-number">500+</div>
                    <div className="desktop-overview-label">Projects Done</div>
                  </div>
                  <div className="desktop-overview-item">
                    <div className="desktop-overview-number">50+</div>
                    <div className="desktop-overview-label">Team Members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default ServicesSection;