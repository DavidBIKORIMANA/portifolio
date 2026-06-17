import { useEffect, useState } from 'react';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { ROLES, SITE } from '../../data/siteData';
import Particles from '../ui/Particles';
import SocialLinks from '../ui/SocialLinks';

export default function Hero({ onNavigate }) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const typed = useTypingEffect(ROLES, !prefersReduced);

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const nav = (e, href) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <header className="hero" id="home">
      {!prefersReduced && <Particles />}
      <div className="hero-glow hero-glow--one" aria-hidden="true" />
      <div className="hero-glow hero-glow--two" aria-hidden="true" />

      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-7" data-aos="fade-right">
            <span className="hero-badge">
              <span className="pulse-dot" /> Available for new opportunities
            </span>
            <h1 className="hero-title">
              DAVID <span className="text-accent">BIKORIMANA</span>
            </h1>
            <h2 className="hero-roles">
              <span className="role-prefix">I&apos;m a</span>
              <span className="typed-text">{typed}</span>
              <span className="typed-cursor">|</span>
            </h2>
            <p className="hero-tagline">
              Results-driven technology professional with <strong>7+ years</strong> of experience building scalable
              systems, managing databases, creating ETL pipelines, and delivering enterprise software solutions.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-accent" onClick={(e) => nav(e, '#projects')}>
                <i className="fa-solid fa-folder-open" /> View Projects
              </a>
              <a href={SITE.cvPath} download className="btn btn-outline-light">
                <i className="fa-solid fa-download" /> Download CV
              </a>
              <a href="#contact" className="btn btn-ghost" onClick={(e) => nav(e, '#contact')}>
                <i className="fa-solid fa-paper-plane" /> Contact Me
              </a>
            </div>
            <SocialLinks className="hero-socials" />
          </div>

          <div className="col-lg-5" data-aos="fade-left" data-aos-delay="150">
            <div className="hero-image-wrap">
              <div className="hero-image-glass">
                <img
                  src={SITE.profileImage}
                  alt="David Bikorimana — Database Administrator and Full Stack Developer"
                  className="hero-image"
                  width="420"
                  height="480"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://placehold.co/420x480/112240/FFD333?text=David+Bikorimana';
                  }}
                />
              </div>
              <div className="floating-card floating-card--top" data-aos="zoom-in" data-aos-delay="500">
                <i className="fa-solid fa-database" />
                <div>
                  <strong>12+</strong>
                  <small>Systems Built</small>
                </div>
              </div>
              <div className="floating-card floating-card--bottom" data-aos="zoom-in" data-aos-delay="700">
                <i className="fa-solid fa-certificate" />
                <div>
                  <strong>18+</strong>
                  <small>Certifications</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll down" onClick={(e) => nav(e, '#about')}>
        <span className="mouse"><span className="wheel" /></span>
      </a>
    </header>
  );
}
