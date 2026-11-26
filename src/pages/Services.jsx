import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import usePageMeta from '../hooks/usePageMeta';
import { services, aiServices } from '../data/services';
import {
  buildBreadcrumbSchema,
  buildCanonicalUrl,
  buildImageUrl,
  buildWebPageSchema,
} from '../config/seo';

export default function Services() {
  const pageTitle = 'Software & AI Development Services in Ahmedabad — Evolvia Tech';
  const pageDescription =
    'Explore full-stack web development, mobile app development, custom SaaS, AI automation, RAG systems, and cloud DevOps services from Evolvia Tech in Ahmedabad, Gujarat.';

  usePageMeta(pageTitle, pageDescription, {
    canonicalUrl: buildCanonicalUrl('/services'),
    ogImage: buildImageUrl('/asset-07.webp'),
    structuredData: [
      buildWebPageSchema({
        title: pageTitle,
        description: pageDescription,
        path: '/services',
        type: 'CollectionPage',
      }),
      buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Services' },
      ]),
    ],
  });

  return (
    <div className="services-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Services' },
        ]}
        tag="ENGINEERING SERVICES"
        title="Full-Lifecycle Software & AI Capabilities Built to Scale."
        subtitle="From our engineering base in Ahmedabad, Gujarat, we help startups and growing enterprises design, build, and scale custom web, mobile, AI, and cloud systems."
        actions={
          <>
            <Link to="/contact" className="btn btn-primary">
              Request an Estimate &rarr;
            </Link>
            <Link to="/works" className="btn btn-outline-light">
              Explore Case Studies
            </Link>
          </>
        }
      />

      {/* ── Core Software & Platform Engineering ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-tag">CORE CAPABILITIES</span>
              <h2 className="section-title">Software &amp; Platform Engineering</h2>
              <p className="section-subtitle">
                Engineered for resilience, high throughput, and developer maintainability.
              </p>
            </div>
          </div>

          <div className="grid-cards">
            {services.map((svc) => (
              <Card
                key={svc.id}
                to={`/services/${svc.id}`}
                image={svc.image}
                imageAlt={svc.title}
                tag={svc.category}
                title={svc.title}
                description={svc.tagline || svc.points?.join(' · ')}
                actionText="View details &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── AI & Intelligent Automation ── */}
      {aiServices && aiServices.length > 0 && (
        <section className="section section-alt section-lazy">
          <div className="container">
            <div className="section-header">
              <div className="section-header-left">
                <span className="section-tag">APPLIED INTELLIGENCE</span>
                <h2 className="section-title">AI Solutions &amp; Workflow Automation</h2>
                <p className="section-subtitle">
                  Grounded retrieval pipelines, autonomous agents, and deterministic enterprise AI workflows.
                </p>
              </div>
            </div>

            <div className="grid-cards">
              {aiServices.map((svc) => (
                <Card
                  key={svc.id}
                  to={`/services/${svc.id}`}
                  image={svc.image}
                  imageAlt={svc.title}
                  tag={svc.shortTitle || 'AI Service'}
                  title={svc.title}
                  description={svc.tagline || svc.points?.join(' · ')}
                  actionText="View details &rarr;"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="COLLABORATE"
        title="Need a Tailored Architectural Scope?"
        description="We work directly with founders and CTOs to model system requirements and estimate milestone delivery."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        secondaryActionText="View Case Studies"
        secondaryActionTo="/works"
        showContact={true}
      />
    </div>
  );
}
