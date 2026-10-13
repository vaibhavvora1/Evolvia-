import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import CookieConsent from '../CookieConsent/CookieConsent';

function PageSkeleton() {
  return (
    <div className="page-skeleton-container" aria-label="Loading page">
      <div className="skeleton-hero" />
      <div className="container skeleton-body">
        <div className="skeleton-line" style={{ width: '40%', height: '28px', marginBottom: '24px' }} />
        <div className="skeleton-grid">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      </div>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="site-wrapper">
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="site-main">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
