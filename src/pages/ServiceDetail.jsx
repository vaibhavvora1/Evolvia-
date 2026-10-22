import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { services, aiServices } from '../data/services';
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

  // 3 related services
  const relatedServices = allServicesList
    .filter((s) => s.id !== service.id)
    .slice(0, 3);

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

            {/* Featured Image if present */}
            {service.image && (
              <div className="detail-block">
                <Img
                  src={service.image}
                  alt={service.title}
                  ratio="banner"
                  width="860"
                  height="420"
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
                      <span className="checklist-bullet" aria-hidden="true">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Our Process / Delivery Stages */}
            {service.process && service.process.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Engineering Methodology</h2>
                <div className="detail-stages-list">
                  {service.process.map((stg, i) => (
                    <div key={stg.title || stg} className="detail-stage-card">
                      <div className="detail-stage-number">{String(i + 1).padStart(2, '0')}</div>
                      <div className="detail-stage-content">
                        <h3 className="detail-stage-title">{stg.title || stg}</h3>
                        {stg.description && <p className="detail-stage-desc">{stg.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Frequently Asked Questions</h2>
                <div className="detail-faqs-group">
                  {service.faqs.map((faq) => (
                    <details key={faq.question} className="faq-item">
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="detail-sidebar-column">
            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Capabilities</h3>
              <ul className="sidebar-meta-list">
                <li>
                  <span className="sidebar-meta-label">Domain</span>
                  <span className="sidebar-meta-value">{service.category || 'Engineering'}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Delivery</span>
                  <span className="sidebar-meta-value">Milestone / Dedicated</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Engagement</span>
                  <span className="sidebar-meta-value">Direct Technical Lead</span>
                </li>
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
