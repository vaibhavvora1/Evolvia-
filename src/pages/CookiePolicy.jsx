import React from 'react';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import usePageMeta from '../hooks/usePageMeta';
import './LegalPage.css';

export default function CookiePolicy() {
  usePageMeta(
    'Cookie Policy — Evolvia Tech',
    'Understand how cookies and local browser storage are utilized on the Evolvia Tech website.',
    { canonicalUrl: 'https://evolvia.tech/cookie-policy' }
  );

  return (
    <div className="legal-page">
      <PageHeader
        tag="LEGAL & TRANSPARENCY"
        title="Cookie Policy"
        subtitle="Last updated: October 2026. Review our storage and tracking policies."
      />

      <section className="page-section section-lazy">
        <div className="container legal-content-card">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies and browser storage items are small files stored on your device that help web applications retain session preferences and monitor general performance.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>
            We use strictly essential cookies to remember your consent choices and security tokens. Optional analytics cookies help us diagnose navigation bottlenecks and improve responsiveness.
          </p>

          <h2>3. Managing Your Preferences</h2>
          <p>
            You can customize or revoke your preferences at any time by clicking the "Cookie Settings" link in the footer.
          </p>
        </div>
      </section>

      <DarkBand
        tag="CONSENT PREFERENCES"
        title="Control Your Digital Footprint"
        description="We prioritize user privacy and ensure zero tracking without explicit authorization."
        primaryActionText="Get in Touch"
        primaryActionTo="/contact"
      />
    </div>
  );
}
