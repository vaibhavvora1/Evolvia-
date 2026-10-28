/**
 * Layout.jsx
 * ──────────
 * Shell for all routes. Mounts Lenis smooth-scroll ONCE here.
 * The lenisRef is stored in a module-level context so ScrollToTop
 * and hash-link navigation can call lenis.scrollTo().
 *
 * Page transitions use an opacity-only fade with no transform
 * so sticky and fixed elements keep working reliably.
 */
import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import useLenis from '../../hooks/useLenis';
import { LenisContext } from '../../context/LenisContext';

function PageLoader() {
  return (
    <div className="skeleton-loader" aria-label="Loading content">
      <div className="skeleton-spinner" />
    </div>
  );
}

export default function Layout() {
  const lenisRef = useLenis();
  const location = useLocation();

  return (
    <LenisContext.Provider value={lenisRef}>
      <div className="site-wrapper">
        <ScrollToTop lenisRef={lenisRef} />
        <Navbar />
        <main id="main-content" className="site-main">
          <Suspense fallback={<PageLoader />}>
            <div key={location.pathname} className="page-fade-enter">
              <Outlet />
            </div>
          </Suspense>
        </main>
        <Footer />
      </div>
    </LenisContext.Provider>
  );
}
