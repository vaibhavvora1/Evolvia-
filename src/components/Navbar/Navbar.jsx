import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SECONDARY_NAV_LINKS } from '../../data/navigation';
import { IconMenu, IconClose, IconArrowRight } from '../UI/Icons';
import { prefetchChunk } from '../../utils/prefetch';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const headerRef = useRef(null);
  const rafIdRef = useRef(null);

  // Single passive scroll listener throttled with requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial evaluation
    setScrolled(window.scrollY > 60);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine navbar mode classes
  // On Home: transparent at scroll < 60px, smoothly transitions to beige on scroll >= 60px.
  // On all other pages: always the usual beige style.
  const navbarClasses = isHome
    ? `site-navbar on-home ${scrolled ? 'is-scrolled' : 'is-transparent'}`
    : 'site-navbar';

  return (
    <header className={navbarClasses} ref={headerRef}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link
          to="/"
          className="navbar-brand"
          aria-label="Evolvia Tech Home"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/logo-navbar.webp"
            alt="EVOLVIA"
            className="navbar-logo-img"
            width="180"
            height="45"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'is-active' : ''}`
              }
              onMouseEnter={() => prefetchChunk(link.path)}
              onFocus={() => prefetchChunk(link.path)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA / Mobile Toggle */}
        <div className="navbar-actions">
          <Link
            to="/contact"
            className={`btn nav-cta-btn ${isHome && !scrolled ? 'btn-outline-light' : 'btn-primary'}`}
            onMouseEnter={() => prefetchChunk('/contact')}
            onFocus={() => prefetchChunk('/contact')}
          >
            Start a Project <IconArrowRight size={14} />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="navbar-toggle-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Always beige with dark text, never black) */}
      <div
        className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-drawer-content container">
          <nav className="mobile-nav-links" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `mobile-nav-item ${isActive ? 'is-active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
                onMouseEnter={() => prefetchChunk(link.path)}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mobile-nav-divider" />

            {SECONDARY_NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `mobile-nav-item secondary ${isActive ? 'is-active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
                onMouseEnter={() => prefetchChunk(link.path)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <Link
              to="/contact"
              className="btn btn-primary btn-block"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us <IconArrowRight size={16} />
            </Link>
            <p className="mobile-contact-email">
              Inquiries: <a href="mailto:vrvora11@gmail.com">vrvora11@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
