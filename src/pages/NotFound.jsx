import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta(
    'Page Not Found (404) — Evolvia Tech',
    'The requested page could not be found. Return to the Evolvia Tech home page.',
    { robots: 'noindex, nofollow' }
  );

  return (
    <div className="not-found-page">
      <PageHeader
        tag="ERROR 404"
        title="Page Not Found"
        subtitle="The route you requested does not exist or has been relocated."
      />

      <section className="page-section section-lazy" style={{ minHeight: '35vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <p className="lead" style={{ marginBottom: '32px' }}>
            We couldn't find the resource you were looking for. Please check the URL or use the navigation links below.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              Return to Home &rarr;
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <DarkBand
        tag="NEED ASSISTANCE?"
        title="Looking for Something Specific?"
        description="Explore our comprehensive engineering capabilities or reach out to our solutions architects directly."
        primaryActionText="View Services"
        primaryActionTo="/services"
      />
    </div>
  );
}
