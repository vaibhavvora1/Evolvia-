import React from 'react';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import usePageMeta from '../hooks/usePageMeta';
import './LegalPage.css';

export default function TermsOfService() {
  usePageMeta(
    'Terms of Service — Evolvia Tech',
    'Terms governing use of the Evolvia Tech website and intellectual property.',
    { canonicalUrl: 'https://evolvia.tech/terms-of-service' }
  );

  return (
    <div className="legal-page">
      <PageHeader
        tag="LEGAL & TRANSPARENCY"
        title="Terms of Service"
        subtitle="Last updated: October 2026. Please read the terms of service governing this website."
      />

      <section className="page-section section-lazy">
        <div className="container legal-content-card">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you agree to comply with and be bound by these terms. If you do not agree, please do not use the website.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            All content, graphics, logos, text, design tokens, and software code on this website are the intellectual property of Evolvia Tech, unless otherwise specified.
          </p>

          <h2>3. Disclaimers and Limitations</h2>
          <p>
            The informational content on this website is provided "as is" for general architectural overview and informational purposes without warranties of any kind.
          </p>

          <h2>4. Inquiries and Governing Law</h2>
          <p>
            These terms are governed by the laws of India. For questions regarding these terms, please contact{' '}
            <a href="mailto:vrvora11@gmail.com">vrvora11@gmail.com</a>.
          </p>
        </div>
      </section>

      <DarkBand
        tag="GOVERNANCE"
        title="Enterprise Partnerships"
        description="Custom master services agreements (MSAs) and bespoke enterprise licensing terms available upon request."
        primaryActionText="Inquire With Us"
        primaryActionTo="/contact"
      />
    </div>
  );
}
