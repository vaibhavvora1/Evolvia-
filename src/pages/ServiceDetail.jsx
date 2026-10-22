import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { services, aiServices } from '../data/services';
import Img from '../components/UI/Img';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import NotFound from './NotFound';
import usePageMeta from '../hooks/usePageMeta';
import './DetailPages.css';

export default function ServiceDetail() {
  const { slug } = useParams();

  // Find in services or aiServices
  const allServicesList = [...services, ...(aiServices || [])];
  const service = allServicesList.find((s) => s.id === slug);

  usePageMeta(
    service ? `${service.title} — Evolvia Tech` : 'Service Details — Evolvia Tech',
    service ? (service.tagline || service.overview?.[0] || 'Technical services from Evolvia Tech') : 'Service Details',
    {
      canonicalUrl: `https://evolvia.tech/services/${slug}`,
      ogImage: service?.image ? `https://evolvia.tech${service.image}` : 'https://evolvia.tech/hero-poster.webp',
    }
  );

  if (!service) {
    return <NotFound />;
  }

  // 3 related services — prefer relatedIds from data, fallback to first 3
  const relatedServices = service.relatedIds
    ? service.relatedIds
        .map((id) => allServicesList.find((s) => s.id === id))
        .filter(Boolean)
        .slice(0, 3)
    : allServicesList.filter((s) => s.id !== service.id).slice(0, 3);

  // Normalise field names across data shape variations
  // Data stores workflow as `service.workflow` with {step, title, desc} objects
  // Data stores FAQs as `service.faq` with {q, a} objects
  const workflowSteps = service.workflow || service.process || [];
  const faqItems = service.faq || service.faqs || [];

  return (
    <div className="detail-page service-detail-page">
      {/* ── Dark PageHeader Band with Breadcrumbs ── */}
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Services', path: '/services' },
          { label: service.title },
        ]}
        tag={service.category || 'CAPABILITY'}
        title={service.title}
        subtitle={service.tagline || service.points?.join(' · ')}
        bannerImage={service.image}
        bannerAlt={service.title}
      />

      {/* ── Overview & Full Content Layout ──────────────────────── */}
      <section className="detail-content-section">
        <div className="container detail-layout-grid">
          {/* Main Column */}
          <div className="detail-main-column">
            {/* Overview (2-3 paragraphs) */}
            <div className="detail-block">
              <h2 className="detail-block-title">Overview</h2>
              <div className="detail-paragraphs">
                {service.overview && service.overview.length > 0 ? (
                  service.overview.map((para) => (
                    <p key={para.slice(0, 32)}>{para}</p>
                  ))
                ) : (
                  <p>
                    We partner with engineering and product leaders to design, build, and deploy
                    resilient solutions under real-world scale and performance constraints.
                  </p>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {service.image && (
              <div className="detail-block">
                <Img
                  src={service.image}
                  alt={service.title}
                  ratio="banner"
                  width={860}
                  height={420}
                />
              </div>
            )}

            {/* Key Features / Included */}
            {service.included && service.included.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">What&apos;s Included</h2>
                <ul className="detail-checklist">
                  {service.included.map((item) => (
                    <li key={item} className="detail-checklist-item">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Engineering Methodology / Workflow Steps */}
            {workflowSteps.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Engineering Methodology</h2>
                <div className="workflow-steps-list">
                  {workflowSteps.map((stg, i) => (
                    <div key={stg.title || stg.step || i} className="workflow-step-card">
                      <div className="workflow-step-number">
                        {stg.step || String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="workflow-step-heading">{stg.title || stg}</h3>
                        {(stg.desc || stg.description) && (
                          <p className="workflow-step-desc">{stg.desc || stg.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion */}
            {faqItems.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Frequently Asked Questions</h2>
                <div className="detail-faqs-group">
                  {faqItems.map((faq) => {
                    // Support both {q, a} and {question, answer} shapes
                    const question = faq.q || faq.question;
                    const answer = faq.a || faq.answer;
                    return (
                      <details key={question} className="faq-item">
                        <summary>{question}</summary>
                        <p>{answer}</p>
                      </details>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="detail-sidebar">
            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Capabilities</h3>
              <ul className="sidebar-data-list">
                <li>
                  <span className="sidebar-data-label">Domain</span>
                  <span className="sidebar-data-val">{service.category || 'Engineering'}</span>
                </li>
                <li>
                  <span className="sidebar-data-label">Delivery</span>
                  <span className="sidebar-data-val">Milestone / Dedicated</span>
                </li>
                <li>
                  <span className="sidebar-data-label">Engagement</span>
                  <span className="sidebar-data-val">Direct Technical Lead</span>
                </li>
                {service.stat && (
                  <li>
                    <span className="sidebar-data-label">Track Record</span>
                    <span className="sidebar-data-val">{service.stat}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Technologies Slug Chips */}
            {service.technologies && service.technologies.length > 0 && (
              <div className="sidebar-box">
                <h3 className="sidebar-box-title">Technologies</h3>
                <div className="detail-tech-tags">
                  {service.technologies.map((techSlug) => (
                    <Link
                      key={techSlug}
                      to={`/technology/${techSlug}`}
                      className="detail-tech-tag"
                    >
                      {techSlug}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Need this service?</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                We provide fixed-scope architectural estimates and rapid discovery sprints.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Build with Us
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── 3 Related Cards ─────────────────────────────────────── */}
      {relatedServices.length > 0 && (
        <section className="related-section section-lazy">
          <div className="container">
            <div className="related-section-header">
              <span className="section-tag">EXPLORE MORE</span>
              <h2>Related Engineering Services</h2>
            </div>

            <div className="grid-cards">
              {relatedServices.map((rel) => (
                <Card
                  key={rel.id}
                  to={`/services/${rel.id}`}
                  image={rel.image}
                  imageAlt={rel.title}
                  tag={rel.category}
                  title={rel.title}
                  description={rel.tagline || rel.points?.join(' · ')}
                  actionText="View details &rarr;"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="START YOUR PROJECT"
        title="Ready to Architect Your Solution?"
        description="Discuss technical requirements directly with our senior engineering founders."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
