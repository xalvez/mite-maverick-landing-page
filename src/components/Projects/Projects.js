import React from 'react';
import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation';
import './Projects.css';
import ThreeDCard from '../Shared/3DCard';

const Projects = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.1);
  const [projectsRef, visibleProjects] = useStaggerAnimation(3, 0.15);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management and AI-powered recommendations.',
      category: 'Web Development',
      image: '🛒',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      status: 'Completed',
      gradient: 'project-gradient-1'
    },
    {
      title: 'Health & Fitness App',
      description: 'Mobile application for tracking workouts, nutrition plans, and health metrics with social features.',
      category: 'Mobile Development',
      image: '🏃‍♂️',
      technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit'],
      status: 'In Progress',
      gradient: 'project-gradient-2'
    },
    {
      title: 'Enterprise CRM',
      description: 'Custom CRM system for managing customer relationships, sales pipelines, and marketing automation.',
      category: 'Custom Software',
      image: '📊',
      technologies: ['Vue.js', 'Python', 'PostgreSQL', 'AWS'],
      status: 'Completed',
      gradient: 'project-gradient-3'
    }
  ];

  return (
    <section id="projects" className="projects section" ref={sectionRef}>
      {/* Animated Background */}
      <div className="projects-bg-elements">
        <div className="project-orb orb-1"></div>
        <div className="project-orb orb-2"></div>
        <div className="project-grid-overlay"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header-fixed">
          <h2 className="section-title-fixed">
            Our <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Showcasing our innovative solutions and successful collaborations
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Projects Grid */}
        <div className="projects-content" ref={projectsRef}>
          <div className="projects-grid">
            {projects.map((project, index) => (
            <ThreeDCard
              key={index}
              variant="glass"
              withShadow={true}
              withGlow={true}
              className={`stagger-item ${
                visibleProjects.includes(index) ? 'visible' : ''
              } stagger-delay-${index + 1}`}
            >
              <div className="project-card-content">
                <div className="project-image">
                  {project.image}
                  <div className="project-status">
                    <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title text-3d">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <button className="project-button primary glass-button button-3d">
                      <span className="button-3d-content">View Case Study</span>
                    </button>
                    <button className="project-button secondary glass-button">
                      Live Demo
                    </button>
                  </div>
                </div>
                <div className="project-glow"></div>
                {/* <div className="light-beam"></div> */}
              </div>
            </ThreeDCard>   
            ))}
          </div>
        </div>

        {/* Projects CTA */}
        <div className={`projects-cta shape-reveal ${isSectionVisible ? 'visible' : ''}`}>
          <div className="cta-content glow-box intense-glow">
            <h3>Have an Idea for a Project?</h3>
            <p>Let's discuss how we can bring your vision to life with our expertise and innovative approach.</p>
            <button className="cta-button glow-on-hover">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;