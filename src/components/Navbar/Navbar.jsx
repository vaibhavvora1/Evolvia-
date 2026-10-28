import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data/navigation';
import { prefetchChunk } from '../../utils/prefetch';
import { CONTACT_EMAIL, ADDRESS } from '../../config/contact';
import { useLenisInstance } from '../../context/LenisContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 60,
  );
  const [hidden, setHidden] = useState(false);

  const location = useLocation();
  const lastScrollY = useRef(0);
  const toggleButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const wasOpenRef = useRef(false);
  const prevPathnameRef = useRef(location.pathname);
  const menuOpenRef = useRef(menuOpen);
  const isHome = location.pathname === '/';
  const lenisRef = useLenisInstance();

  const updateMenuOpen = (nextState) => {
    const nextValue = typeof nextState === 'function'
      ? nextState(menuOpenRef.current)
      : nextState;
    menuOpenRef.current = nextValue;
    setMenuOpen(nextValue);
  };

  // Scroll listener for 60px threshold & hide-on-scroll-down / show-on-scroll-up
  useEffect(() => {
    let animationFrame = null;

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Set background solid state threshold
          setScrolled(currentScrollY > 60);

          // Hide navbar when scrolling down, show when scrolling up (after 80px)
          if (currentScrollY > lastScrollY.current && currentScrollY > 80 && !menuOpenRef.current) {
            setHidden(true);
          } else if (currentScrollY < lastScrollY.current || currentScrollY <= 20) {
            setHidden(false);
          }

          lastScrollY.current = currentScrollY;
          animationFrame = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    lastScrollY.current = window.scrollY;

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Close the drawer when browser history navigation changes the route.
  useEffect(() => {
    const closeMenu = () => {
      menuOpenRef.current = false;
      setMenuOpen(false);
    };

    window.addEventListener('popstate', closeMenu);
    return () => window.removeEventListener('popstate', closeMenu);
  }, []);

  // Stop/Start Lenis when mobile menu opens/closes + lock body scroll
  useEffect(() => {
    const lenis = lenisRef?.current;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [menuOpen, lenisRef]);

  // Focus management: move focus into drawer when opened, return focus on close
  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
      const timer = setTimeout(() => {
        const firstFocusable = drawerRef.current?.querySelector('a, button');
        firstFocusable?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      if (location.pathname === prevPathnameRef.current) {
        toggleButtonRef.current?.focus();
      }
    }
    prevPathnameRef.current = location.pathname;
  }, [menuOpen, location.pathname]);

  // Close menu on Escape & trap Tab focus while drawer is open
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = [
          toggleButtonRef.current,
          ...(drawerRef.current?.querySelectorAll('a[href], button:not([disabled])') || []),
        ].filter(Boolean);

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Compute navbar classes based on route, scroll state, and hide/show direction
  const isTransparent = isHome && !scrolled && !menuOpen;
  const navbarClasses = `navbar ${isTransparent ? 'navbar--transparent' : 'navbar--solid'} ${hidden && !menuOpen ? 'navbar--hidden' : ''}`;

  return (
    <header className={navbarClasses}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link
          to="/"
          className="navbar-brand"
          aria-label="Evolvia Tech Home"
          onClick={() => updateMenuOpen(false)}
        >
          <img
            src="/logo-navbar.webp"
            alt="Evolvia Tech"
            className="navbar-logo-img"
            width="170"
            height="40"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation Links with Creative Hover */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'is-active' : ''}`
              }
              onMouseEnter={() => prefetchChunk(link.path)}
              onFocus={() => prefetchChunk(link.path)}
              onClick={() => updateMenuOpen(false)}
            >
              <span className="nav-link-text">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right CTA Button & Hamburger */}
        <div className="navbar-actions">
          <Link
            to="/contact"
            className="btn btn-primary navbar-cta"
            onMouseEnter={() => prefetchChunk('/contact')}
            onFocus={() => prefetchChunk('/contact')}
            onClick={() => updateMenuOpen(false)}
          >
            Build with Us
          </Link>

          <button
            ref={toggleButtonRef}
            type="button"
            className="navbar-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            onClick={() => updateMenuOpen((prev) => !prev)}
          >
            <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal={menuOpen ? 'true' : undefined}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
        data-lenis-prevent
      >
        <div className="mobile-drawer-inner container">
          <nav className="mobile-nav-list" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? 'is-active' : ''}`
                }
                onClick={() => updateMenuOpen(false)}
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
              onClick={() => updateMenuOpen(false)}
            >
              Build with Us
            </Link>
            <div className="mobile-contact-meta">
              <a href={`mailto:${CONTACT_EMAIL}`} className="mobile-meta-link">
                {CONTACT_EMAIL}
              </a>
              <span className="mobile-meta-text">{ADDRESS}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
