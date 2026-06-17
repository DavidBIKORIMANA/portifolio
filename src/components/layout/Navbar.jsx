import { useState } from 'react';
import { NAV_LINKS, SITE } from '../../data/siteData';

export default function Navbar({ scrolled, activeSection, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleNav = (e, href) => {
    e.preventDefault();
    onNavigate(href);
    setOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top main-nav${scrolled ? ' scrolled' : ''}`} id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#home" onClick={(e) => handleNav(e, '#home')}>
          <span className="brand-mark">DB</span>
          <span className="brand-text">
            David<span className="text-accent">.</span>
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navMenu"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="toggler-bar" />
          <span className="toggler-bar" />
          <span className="toggler-bar" />
        </button>

        <div className={`collapse navbar-collapse${open ? ' show' : ''}`} id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.replace('#', '');
              return (
                <li className="nav-item" key={href}>
                  <a
                    className={`nav-link${activeSection === id ? ' active' : ''}`}
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
            <li className="nav-item ms-lg-3">
              <a className="btn btn-accent btn-sm" href={SITE.cvPath} download onClick={() => setOpen(false)}>
                <i className="fa-solid fa-download" /> CV
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
