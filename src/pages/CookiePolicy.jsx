import React from 'react';
import PageHero from '../components/UI/PageHero';
import usePageMeta from '../hooks/usePageMeta';

export default function CookiePolicy() {
  usePageMeta(
    'Cookie Policy — Evolvia Tech',
    'Understand how cookies and local browser storage are utilized on the Evolvia Tech website.',
    { canonicalUrl: 'https://evolvia.tech/cookie-policy' }
  );

  return (
    <div className="legal-page">
      <PageHero
        tag="LEGAL & TRANSPARENCY"
        title="Cookie Policy"
        subtitle="Last updated: October 2026. Review our storage and tracking policies."
      />

      <section className="page-section">
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
    </div>
  );
}
