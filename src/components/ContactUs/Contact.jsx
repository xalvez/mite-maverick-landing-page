import React, { useState } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation';
import './Contact.css';

const Contact = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.1);
  const [contactRef, visibleContacts] = useStaggerAnimation(3, 0.2);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: '✉️',
      title: 'Email',
      details: 'hello@nanonexus.com',
      description: 'We reply within 24 hours',
      action: 'mailto:hello@nanonexus.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9AM-6PM EST',
      action: 'tel:+15551234567'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Start chatting',
      description: 'Available right now',
      action: '#chat'
    }
  ];

  const socialLinks = [
    { platform: 'Twitter', icon: '𝕏', url: '#' },
    { platform: 'LinkedIn', icon: 'in', url: '#' },
    { platform: 'GitHub', icon: '</>', url: '#' },
    { platform: 'Discord', icon: '💬', url: '#' }
  ];

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      {/* Animated Background Elements */}
      <div className="contact-bg">
        <div className="bg-grid"></div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="container">
        {/* Section Header - Minimal */}
        <div className={`section-header ${isSectionVisible ? 'visible' : ''}`}>
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let's Build <span className="highlight">Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Get in touch and let's create something amazing.
          </p>
        </div>

        <div className="contact-wrapper">
          {/* Contact Methods - Left Side */}
          <div className="contact-methods-wrapper" ref={contactRef}>
                              <div className="summary-image">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Innovation Lab"
                    />
                  </div>
            {/* <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className={`contact-method-card stagger-item ${
                    visibleContacts.includes(index) ? 'visible' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="method-icon-wrapper">
                    <span className="method-icon">{method.icon}</span>
                    <div className="icon-glow"></div>
                  </div>
                  <div className="method-content">
                    <h4>{method.title}</h4>
                    <p className="method-details">{method.details}</p>
                    <span className="method-cta">
                      {method.description} →
                    </span>
                  </div>
                </a>
              ))}
            </div> */}

            {/* Quick Info */}
            {/* <div className={`quick-info ${isSectionVisible ? 'visible' : ''}`}>
              <h4>Quick Info</h4>
              <div className="info-items">
                <div className="info-item">
                  <span className="info-label">Response Time</span>
                  <span className="info-value">Within 24 hours</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Office Hours</span>
                  <span className="info-value">9AM - 6PM EST</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">Remote • Worldwide</span>
                </div>
              </div>
            </div> */}

            {/* Social Links - Minimal */}
            {/* <div className={`social-connect ${isSectionVisible ? 'visible' : ''}`}>
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
            </div> */}
          </div>

          {/* Contact Form - Right Side */}
          <div className={`contact-form-wrapper ${isSectionVisible ? 'visible' : ''}`}>
            <form className="modern-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>Send a Message</h3>
                <p>Fill out the form below and we'll get back to you promptly.</p>
              </div>

              <div className="form-grid">
                <div className="form-group floating-label">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                  />
                  <label htmlFor="name">Full Name</label>
                  <div className="input-line"></div>
                </div>

                <div className="form-group floating-label">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                  />
                  <label htmlFor="email">Email Address</label>
                  <div className="input-line"></div>
                </div>

                <div className="form-group floating-label full-width">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder=" "
                  />
                  <label htmlFor="subject">Subject</label>
                  <div className="input-line"></div>
                </div>

                <div className="form-group floating-label full-width">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder=" "
                  ></textarea>
                  <label htmlFor="message">Your Message</label>
                  <div className="input-line"></div>
                </div>
              </div>

              <div className="form-footer">
                <div className="privacy-note">
                  By submitting, you agree to our Privacy Policy
                </div>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                  <span className="btn-glow"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;