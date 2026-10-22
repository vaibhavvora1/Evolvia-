import React from 'react';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import usePageMeta from '../hooks/usePageMeta';
import './LegalPage.css';

export default function PrivacyPolicy() {
  usePageMeta(
    'Privacy Policy — Evolvia Tech',
    'Review how Evolvia Tech collects, stores, and protects data submitted through our website and services.',
    { canonicalUrl: 'https://evolvia.tech/privacy-policy' }
  );

  return (
    <div className="legal-page">
      <PageHeader
        tag="LEGAL & TRANSPARENCY"
        title="Privacy Policy"
        subtitle="Last updated: October 2026. This policy explains how Evolvia Tech handles personal information."
      />

      <section className="page-section section-lazy">
        <div className="container legal-content-card">
          <h2>1. Information We Collect</h2>
          <p>
            When you contact us through our website contact form or email, we collect the details you provide, including your name, email address, company name, project details, and budget parameters.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use this information exclusively to communicate with you about your inquiry, evaluate potential projects, and provide engineering consultations. We do not sell or rent your data to any third party.
          </p>

          <h2>3. Cookies and Analytics</h2>
          <p>
            Our website uses minimal browser storage and optional analytics strictly to evaluate performance and site usability. You can adjust your cookie choices at any time through the Cookie Settings link in the footer.
          </p>

          <h2>4. Data Retention and Security</h2>
          <p>
            We implement industry-standard encryption, SSL transmission, and strict access controls to safeguard your submitted materials. We retain communication records only as long as necessary to fulfill project services or legal requirements.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            For any privacy inquiries or data removal requests, please email us directly at{' '}
            <a href="mailto:vrvora11@gmail.com">vrvora11@gmail.com</a>.
          </p>
        </div>
      </section>

      <DarkBand
        tag="SECURITY & TRUST"
        title="Committed to Data Privacy"
        description="Have questions about how your data is processed or need a custom DPA? Reach out to our team."
        primaryActionText="Contact Privacy Team"
        primaryActionTo="/contact"
      />
    </div>
  );
}
