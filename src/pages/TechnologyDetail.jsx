import React from 'react';
import { useParams, Link } from 'react-router-dom';
import technologies, { findTechnology } from '../data/technologies';
import { projects } from '../data/projects';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import NotFound from './NotFound';
import usePageMeta from '../hooks/usePageMeta';
import './DetailPages.css';

export default function TechnologyDetail() {
  const { slug } = useParams();
  const tech = findTechnology(slug || '') || technologies.find((t) => t.slug === slug);

  usePageMeta(
    tech ? `${tech.name} Stack Architecture — Evolvia Tech` : 'Technology Details — Evolvia Tech',
    tech ? (tech.description || `Engineering with ${tech.name} at Evolvia Tech`) : 'Technology Details',
    {
      canonicalUrl: `https://evolvia.tech/technology/${slug}`,
      ogImage: 'https://evolvia.tech/hero-poster.webp',
    }
  );

  if (!tech) {
    return <NotFound />;
  }

  // Projects that use this technology
  const usingProjects = projects.filter((project) =>
    project.technologies.some((name) => {
      const match = findTechnology(name);
      return match?.slug === tech.slug || name.toLowerCase() === tech.slug;
    })
  );

  // 3 related technologies from the same or adjacent category
  const relatedTechnologies = technologies
    .filter((item) => item.slug !== tech.slug && item.category === tech.category)
    .slice(0, 3);

  return (
    <div className="detail-page technology-detail-page">
      {/* ── Dark PageHeader Band with Breadcrumbs ── */}
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Technology', path: '/technology' },
          { label: tech.name },
        ]}
        tag={`${tech.category} • ${tech.level || 'CORE'}`}
        title={tech.name}
        subtitle={tech.description}
      />

      {/* ── Main Content Grid ───────────────────────────────────── */}
      <section className="detail-content-section">
        <div className="container detail-layout-grid">
          {/* Main Column */}
          <div className="detail-main-column">
            {/* Overview / Why We Use It */}
            <div className="detail-block">
              <h2 className="detail-block-title">Why We Engineer With {tech.name}</h2>
              <div className="detail-paragraphs">
                <p>
                  At Evolvia Tech, we select technologies based on production reliability,
                  ecosystem maturity, and operational predictability rather than transient industry hype.
                </p>
                <p>{tech.description}</p>
                <p>
                  Our senior engineering teams establish opinionated linters, strict typing barriers,
                  and automated test suites around {tech.name} to ensure clean maintainability across multi-year lifecycles.
                </p>
              </div>
            </div>

            {/* Architecture Role */}
            <div className="detail-block">
              <h2 className="detail-block-title">Architectural Role &amp; Best Practices</h2>
              <ul className="detail-checklist">
                <li className="detail-checklist-item">
                  <span className="checklist-bullet" aria-hidden="true">&bull;</span>
                  <span>Deterministic error handling and graceful fallback workflows.</span>
                </li>
                <li className="detail-checklist-item">
                  <span className="checklist-bullet" aria-hidden="true">&bull;</span>
                  <span>Comprehensive automated CI pipelines with contract and regression checks.</span>
                </li>
                <li className="detail-checklist-item">
                  <span className="checklist-bullet" aria-hidden="true">&bull;</span>
                  <span>Optimized runtime configurations minimizing memory overhead and latency.</span>
                </li>
                <li className="detail-checklist-item">
                  <span className="checklist-bullet" aria-hidden="true">&bull;</span>
                  <span>Strict security audit baselines and zero-dependency bloat policies.</span>
                </li>
              </ul>
            </div>

            {/* Projects built with this tech */}
            {usingProjects.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Case Studies Utilizing {tech.name}</h2>
                <div className="grid-cards" style={{ marginTop: '20px' }}>
                  {usingProjects.map((proj) => (
                    <Card
                      key={proj.id}
                      to={`/works/${proj.id}`}
                      image={proj.image}
                      imageAlt={proj.title}
                      tag={proj.category}
                      meta={proj.year}
                      title={proj.title}
                      description={proj.shortDescription}
                      actionText="Read case study &rarr;"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="detail-sidebar-column">
            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Specification</h3>
              <ul className="sidebar-meta-list">
                <li>
                  <span className="sidebar-meta-label">Category</span>
                  <span className="sidebar-meta-value">{tech.category}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Layer</span>
                  <span className="sidebar-meta-value">{tech.level || 'Core'}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Adoption</span>
                  <span className="sidebar-meta-value">Production Verified</span>
                </li>
              </ul>
            </div>

            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Build with {tech.name}</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Need experienced engineers to architect or accelerate your implementation?
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Consult Our Team
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Related Technology Cards ─────────────────────────────── */}
      {relatedTechnologies.length > 0 && (
        <section className="related-section section-lazy">
          <div className="container">
            <div className="related-section-header">
              <span className="section-tag">CONNECTED STACK</span>
              <h2>Related {tech.category} Technologies</h2>
            </div>

            <div className="grid-cards">
              {relatedTechnologies.map((rel) => (
                <Card
                  key={rel.slug}
                  to={`/technology/${rel.slug}`}
                  tag={rel.category}
                  title={rel.name}
                  description={rel.description}
                  actionText="Explore tech &rarr;"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="START YOUR BUILD"
        title="Build with Confidence"
        description="Leverage battle-tested technologies engineered for long-term operational resilience and developer ergonomics."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
