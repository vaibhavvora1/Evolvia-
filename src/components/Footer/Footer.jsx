import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, LEGAL_LINKS } from '../../data/navigation';
import { COMPANY_NAME, TAGLINE, ADDRESS, CONTACT_EMAIL } from '../../config/contact';
import { FOOTER_INFO, SOCIAL_LINKS, COMPANY_LINKS } from '../../config/footer';
import { prefetchChunk } from '../../utils/prefetch';
import { useLenisInstance } from '../Layout/Layout';
import './Footer.css';

const SOCIAL_ICONS = {
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  x: (
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  ),
  instagram: (
    <>
      <path d="M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6z" />
      <circle cx="12" cy="12" r="3" />
      <line x1="16.5" x2="16.51" y1="6.5" y2="6.5" />
    </>
  ),
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const lenisRef = useLenisInstance();
  const { legalName, phone, businessHours, registrationNumber, gstNumber, workModel } = FOOTER_INFO;

  const activeSocials = SOCIAL_LINKS.filter((s) => s.url);
  const metaItems = [
    legalName && { label: 'Legal Entity', value: legalName },
    registrationNumber && { label: 'Reg. No.', value: registrationNumber },
    gstNumber && { label: 'GSTIN', value: gstNumber },
  ].filter(Boolean);

  const scrollToTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Top Section */}
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-column">
            <Link to="/" className="footer-logo-link" aria-label="Evolvia Tech Home">
              <img
                src="/logo-navbar.webp"
                alt={COMPANY_NAME}
                className="footer-logo-img"
                width="160"
                height="38"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="footer-tagline-text">{TAGLINE}</p>

            <div className="footer-contact-details">
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-contact-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{CONTACT_EMAIL}</span>
              </a>

              {phone && (
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="footer-contact-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{phone}</span>
                </a>
              )}

              <div className="footer-contact-address">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{ADDRESS}</span>
              </div>

              {businessHours && (
                <div className="footer-contact-address">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{businessHours}</span>
                </div>
              )}
            </div>

            {activeSocials.length > 0 && (
              <div className="footer-social-row" aria-label="Social links">
                {activeSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url.startsWith('http') ? social.url : `https://${social.url}`}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {SOCIAL_ICONS[social.id]}
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Company */}
          <div className="footer-links-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links-list">
              {COMPANY_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-nav-link"
                    onMouseEnter={() => prefetchChunk(link.path)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-links-column">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-nav-link"
                    onMouseEnter={() => prefetchChunk(link.path)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="footer-links-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links-list">
              <li><Link to="/services/web" className="footer-nav-link">Web Development</Link></li>
              <li><Link to="/services/mobile" className="footer-nav-link">Mobile Applications</Link></li>
              <li><Link to="/services/ai" className="footer-nav-link">AI & Automation</Link></li>
              <li><Link to="/services/cloud" className="footer-nav-link">Cloud & DevOps</Link></li>
              <li><Link to="/services/design" className="footer-nav-link">UI/UX Engineering</Link></li>
              <li><Link to="/services/software" className="footer-nav-link">Custom Software</Link></li>
            </ul>
          </div>

          {/* Call to Action Box */}
          <div className="footer-cta-column">
            <h4 className="footer-heading">Build with Us</h4>
            <p className="footer-cta-desc">
              Have a challenging engineering problem or a new product in mind? Let&apos;s build it together.
            </p>
            <Link to="/contact" className="btn btn-primary footer-cta-button">
              Start Conversation
            </Link>
            {workModel && <p className="footer-work-model">{workModel}</p>}
          </div>
        </div>

        {/* Company Information Strip (only renders if details are filled in) */}
        {metaItems.length > 0 && (
          <div className="footer-meta-strip">
            {metaItems.map((item) => (
              <div key={item.label} className="footer-meta-item">
                <span className="footer-meta-label">{item.label}</span>
                <span className="footer-meta-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {currentYear} {legalName || COMPANY_NAME}. All rights reserved.
          </p>
          <div className="footer-legal-links">
            {LEGAL_LINKS.map((legal) => (
              <Link key={legal.path} to={legal.path} className="footer-legal-link">
                {legal.label}
              </Link>
            ))}
            <button
              type="button"
              className="footer-top-button"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}