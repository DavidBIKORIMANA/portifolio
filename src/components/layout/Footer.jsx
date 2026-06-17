import { SITE } from '../../data/siteData';
import SocialLinks from '../ui/SocialLinks';

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  const link = (href, label) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(href);
      }}
    >
      {label}
    </a>
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <a className="footer-brand" href="#home" onClick={(e) => { e.preventDefault(); onNavigate('#home'); }}>
              <span className="brand-mark">DB</span>
              <span className="brand-text">{SITE.name}</span>
            </a>
            <p className="footer-about">
              Database Administrator, Data Analyst, Full Stack Developer & IT Support Specialist building
              scalable, data-driven systems from Kigali, Rwanda.
            </p>
            <SocialLinks className="footer-socials" />
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>{link('#about', 'About')}</li>
              <li>{link('#skills', 'Skills')}</li>
              <li>{link('#experience', 'Experience')}</li>
              <li>{link('#projects', 'Projects')}</li>
              <li>{link('#contact', 'Contact')}</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-6">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li>{link('#services', 'Database Administration')}</li>
              <li>{link('#services', 'Data Analysis')}</li>
              <li>{link('#services', 'Web Development')}</li>
              <li>{link('#services', 'Mobile Development')}</li>
              <li>{link('#services', 'Cloud Solutions')}</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact">
              <li><i className="fa-solid fa-location-dot" /> {SITE.location}</li>
              <li><i className="fa-solid fa-phone" /> <a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><i className="fa-solid fa-envelope" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} {SITE.name}. All rights reserved.</p>
          <p>
            Designed &amp; built with <i className="fa-solid fa-heart text-accent" /> in Rwanda.
          </p>
        </div>
      </div>
    </footer>
  );
}
