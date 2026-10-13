import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SECONDARY_NAV_LINKS, LEGAL_LINKS } from '../../data/navigation';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import { IconArrowRight, IconMail, IconMapPin, IconArrowUpRight } from '../UI/Icons';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const handleOpenCookieSettings = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event('evolvia:open-cookie-settings'));
  };

  return (
    <footer className="site-footer">
      {/* ── Footer CTA Banner ── */}
      <section className="footer-cta-strip">
        <div className="container footer-cta-container">
          <div className="footer-cta-text">
            <span className="section-tag">START A PROJECT</span>
            <h2 className="footer-cta-heading">
              Ready to engineer your next digital platform?
            </h2>
            <p className="footer-cta-subtext">
              Direct engineering leadership, transparent architecture, and fixed milestone delivery.
            </p>
          </div>
          <Link to="/contact" className="btn btn-primary footer-cta-btn">
            Talk to Our Team <IconArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Main Footer Columns ── */}
      <div className="footer-main">
        <div className="container footer-columns-grid">
          {/* Brand & Address */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand" aria-label="Evolvia Tech Home">
              <img
                src="/logo-navbar.webp"
                alt="EVOLVIA"
                className="footer-logo-img"
                width="160"
                height="40"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="footer-tagline">
              Engineering digital products, intelligent systems, and scalable cloud architectures.
            </p>
            <div className="footer-contact-info">
              <a href="mailto:vrvora11@gmail.com" className="footer-contact-link">
                <IconMail size={16} />
                <span>vrvora11@gmail.com</span>
              </a>
              <span className="footer-contact-location">
                <IconMapPin size={16} />
                <span>Maninagar, Ahmedabad, Gujarat, India</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-link-list">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Insights */}
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-link-list">
              {SECONDARY_NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
              {LEGAL_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="footer-link footer-link-btn"
                  onClick={handleOpenCookieSettings}
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div className="footer-col">
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-link-list">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link external"
                  >
                    {item.label} <IconArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Footer Copyright ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {CURRENT_YEAR} Evolvia Tech. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy" className="footer-sublink">Privacy</Link>
            <span className="divider-dot">&bull;</span>
            <Link to="/terms-of-service" className="footer-sublink">Terms</Link>
            <span className="divider-dot">&bull;</span>
            <Link to="/cookie-policy" className="footer-sublink">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
