import React from 'react';
import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation';
import ThreeDCard from '../Shared/3DCard';
import './Services.css';

const Services = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.1);
  const [servicesRef, visibleServices] = useStaggerAnimation(4, 0.15);

  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies and best practices.',
      // features: ['React.js', 'Node.js', 'Responsive Design', 'SEO Optimized'],
      variant: 'glass'
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications for iOS and Android.',
      // features: ['React Native', 'Flutter', 'Native Development', 'App Store Deployment'],
      variant: 'glass'
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions.',
      // features: ['AWS', 'Azure', 'Google Cloud', 'DevOps'],
      variant: 'glass'
    },
    {
      icon: '🔧',
      title: 'Custom Software',
      description: 'Tailored software solutions for your specific business needs.',
      // features: ['ERP Systems', 'CRM Solutions', 'Automation Tools', 'API Integration'],
      variant: 'glass'
    }
  ];

  return (
    <section id="services" className="services section" ref={sectionRef}>
      {/* Animated Background */}
      <div className="services-bg-elements">
        <div className="service-orb orb-1"></div>
        <div className="service-orb orb-2"></div>
        <div className="service-particle particle-1"></div>
        <div className="service-particle particle-2"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header-fixed">
          <h2 className="section-title-fixed">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive solutions for your digital transformation journey
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Services Grid with 3D Cards */}
        <div className="services-content" ref={servicesRef}>
          <div className="services-grid">
            {services.map((service, index) => (
              <ThreeDCard
                key={index}
                variant={service.variant}
                withShadow={true}
                withGlow={true}
                className={`stagger-item ${
                  visibleServices.includes(index) ? 'visible' : ''
                } stagger-delay-${index + 1}`}
              >
                <div className="service-card-content">
                  <div className="service-header">
                    <div className="service-icon icon-3d">{service.icon}</div>
                    <h3 className="service-title text-3d">{service.title}</h3>
                  </div>
                  <p className="service-description">{service.description}</p>
                  {/* <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="service-feature">
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul> */}
                  {/* <div className="service-glow"></div> */}
                  {/* <div className="light-beam"></div> */}
                  <button className="service-cta glass-button button-3d">
                    <span className="button-3d-content">Learn More</span>
                  </button>
                </div>
              </ThreeDCard>
            ))}
          </div>
        </div>

        {/* Services CTA with 3D Effect */}
        <div className={`services-cta shape-reveal ${isSectionVisible ? 'visible' : ''}`}>
          
            <div className="cta-content">
              <h3 className="text-3d">Need a Custom Solution?</h3>
              <p>We specialize in creating tailored software that fits your unique business requirements.</p>
              <button className="cta-button glass-button button-3d">
                <span className="button-3d-content">Get Free Consultation</span>
              </button>
            </div>
         
        </div>
      </div>
    </section>
  );
};

export default Services;