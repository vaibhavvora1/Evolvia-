import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import testimonials from '../data/testimonials';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import Img from '../components/UI/Img';
import TestimonialCard from '../components/UI/TestimonialCard';
import NotFound from './NotFound';
import usePageMeta from '../hooks/usePageMeta';
import './DetailPages.css';

export default function WorkDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.id === slug);

  usePageMeta(
    project ? `${project.title} — Case Study — Evolvia Tech` : 'Case Study — Evolvia Tech',
    project ? (project.shortDescription || project.challenge) : 'Project Case Study',
    {
      canonicalUrl: `https://evolvia.tech/works/${slug}`,
      ogImage: project?.image ? `https://evolvia.tech${project.image}` : 'https://evolvia.tech/hero-poster.webp',
    }
  );

  if (!project) {
    return <NotFound />;
  }

  // 3 related projects
  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  // Matching testimonial for this project
  const projectTestimonial = testimonials.find((t) => t.projectId === project.id);

  return (
    <div className="detail-page work-detail-page">
      {/* ── Dark PageHeader Band with Breadcrumbs ── */}
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Our Works', path: '/works' },
          { label: project.title },
        ]}
        tag={`${project.category} • ${project.year}`}
        title={project.title}
        subtitle={project.shortDescription}
        bannerImage={project.image}
        bannerAlt={project.title}
      />

      {/* ── Main Content Grid with Sticky Sidebar ────────────────── */}
      <section className="detail-content-section">
        <div className="container detail-layout-grid">
          {/* Main Column */}
          <div className="detail-main-column">
            {/* Featured Image */}
            {project.image && (
              <div className="detail-block">
                <Img
                  src={project.image}
                  alt={project.title}
                  ratio="banner"
                  width="860"
                  height="420"
                />
              </div>
            )}

            {/* Challenge */}
            <div className="detail-block">
              <h2 className="detail-block-title">The Challenge</h2>
              <p>{project.challenge}</p>
            </div>

            {/* Solution */}
            <div className="detail-block">
              <h2 className="detail-block-title">The Solution &amp; Architecture</h2>
              <p>{project.solution}</p>
            </div>

            {/* Outcomes */}
            {project.outcomes && project.outcomes.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Key Outcomes &amp; Impact</h2>
                <ul className="detail-checklist">
                  {project.outcomes.map((item) => (
                    <li key={item} className="detail-checklist-item">
                      <span className="checklist-bullet" aria-hidden="true">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Client Testimonial Card */}
            {projectTestimonial && (
              <div className="detail-block">
                <h2 className="detail-block-title">Client Perspective</h2>
                <TestimonialCard testimonial={projectTestimonial} />
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="detail-sidebar-column">
            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Project Metadata</h3>
              <ul className="sidebar-meta-list">
                <li>
                  <span className="sidebar-meta-label">Client</span>
                  <span className="sidebar-meta-value">{project.client || project.title}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Domain</span>
                  <span className="sidebar-meta-value">{project.category}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Timeline</span>
                  <span className="sidebar-meta-value">{project.duration || 'Q3-Q4'}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Year</span>
                  <span className="sidebar-meta-value">{project.year}</span>
                </li>
              </ul>
            </div>

            {/* Technology Stack Tags */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="sidebar-box">
                <h3 className="sidebar-box-title">Technologies</h3>
                <div className="detail-tech-tags">
                  {project.technologies.map((techSlug) => (
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

            {/* Project Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="sidebar-box">
                <h3 className="sidebar-box-title">Key Results</h3>
                <ul className="sidebar-metrics-list">
                  {project.metrics.map((m) => (
                    <li key={m.label || m.metric}>
                      <span className="sidebar-metric-number">{m.value || m.val}</span>
                      <span className="sidebar-metric-label">{m.label || m.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Build a Similar Product</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                We translate complex product constraints into lean, scalable production software.
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
            <span className="section-tag">PORTFOLIO</span>
            <h2>Related Case Studies</h2>
          </div>

          <div className="grid-cards">
            {relatedProjects.map((rel) => (
              <Card
                key={rel.id}
                to={`/works/${rel.id}`}
                image={rel.image}
                imageAlt={rel.title}
                tag={rel.category}
                meta={rel.year}
                title={rel.title}
                description={rel.shortDescription}
                actionText="View details &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="ENGINEER WITH US"
        title="Have a Complex System to Build?"
        description="Partner with experienced architects who prioritize software longevity, performance, and clean code."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
