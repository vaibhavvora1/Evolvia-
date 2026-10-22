import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobs } from '../data/careers';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import Img from '../components/UI/Img';
import NotFound from './NotFound';
import usePageMeta from '../hooks/usePageMeta';
import './DetailPages.css';

export default function CareerDetail() {
  const { slug } = useParams();
  const job = jobs.find((j) => j.id === slug);

  usePageMeta(
    job ? `${job.position} — Engineering Careers — Evolvia Tech` : 'Careers — Evolvia Tech',
    job ? (job.tagline || job.overview?.[0]) : 'Career Opportunity',
    {
      canonicalUrl: `https://evolvia.tech/careers/${slug}`,
      ogImage: job?.image ? `https://evolvia.tech${job.image}` : 'https://evolvia.tech/hero-poster.webp',
    }
  );

  if (!job) {
    return <NotFound />;
  }

  // 3 related positions
  const relatedJobs = jobs
    .filter((j) => j.id !== job.id)
    .slice(0, 3);

  const applyUrl = `/careers/${slug}/apply`;

  return (
    <div className="detail-page career-detail-page">
      {/* ── Dark PageHeader Band with Breadcrumbs ── */}
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Careers', path: '/careers' },
          { label: job.position },
        ]}
        tag={`${job.department} • ${job.type}`}
        title={job.position}
        subtitle={job.tagline}
        bannerImage={job.image}
        bannerAlt={job.position}
      />

      {/* ── Main Content Grid with Sticky Sidebar ────────────────── */}
      <section className="detail-content-section">
        <div className="container detail-layout-grid">
          {/* Main Column */}
          <div className="detail-main-column">
            {/* Featured Image */}
            {job.image && (
              <div className="detail-block">
                <Img
                  src={job.image}
                  alt={job.position}
                  ratio="banner"
                  width="860"
                  height="420"
                />
              </div>
            )}

            {/* Overview */}
            <div className="detail-block">
              <h2 className="detail-block-title">Role Overview</h2>
              <div className="detail-paragraphs">
                {job.overview && job.overview.length > 0 ? (
                  job.overview.map((para) => (
                    <p key={para.slice(0, 32)}>{para}</p>
                  ))
                ) : (
                  <p>{job.tagline}</p>
                )}
              </div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Key Responsibilities</h2>
                <ul className="detail-checklist">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="detail-checklist-item">
                      <span className="checklist-bullet" aria-hidden="true">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">What We Look For</h2>
                <ul className="detail-checklist">
                  {job.requirements.map((item) => (
                    <li key={item} className="detail-checklist-item">
                      <span className="checklist-bullet" aria-hidden="true">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interview Process */}
            {job.interviewStages && job.interviewStages.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Interview Methodology</h2>
                <div className="detail-stages-list">
                  {job.interviewStages.map((stage, i) => (
                    <div key={stage.title || stage} className="detail-stage-card">
                      <div className="detail-stage-number">{String(i + 1).padStart(2, '0')}</div>
                      <div className="detail-stage-content">
                        <h3 className="detail-stage-title">{stage.title || stage}</h3>
                        {stage.description && <p className="detail-stage-desc">{stage.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="detail-sidebar-column">
            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Job Details</h3>
              <ul className="sidebar-meta-list">
                <li>
                  <span className="sidebar-meta-label">Department</span>
                  <span className="sidebar-meta-value">{job.department}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Location</span>
                  <span className="sidebar-meta-value">{job.location || 'Remote / Hybrid'}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Type</span>
                  <span className="sidebar-meta-value">{job.type || 'Full-time'}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Experience</span>
                  <span className="sidebar-meta-value">{job.experience || 'Senior Level'}</span>
                </li>
              </ul>
            </div>

            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Apply for this Role</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                We review applications on a rolling basis with direct feedback from engineering leads.
              </p>
              <Link
                to={applyUrl}
                className="btn btn-primary"
                style={{ width: '100%', textAlign: 'center' }}
                onMouseEnter={() => prefetchChunk(applyUrl)}
                onFocus={() => prefetchChunk(applyUrl)}
              >
                Apply now &rarr;
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── 3 Related Cards ─────────────────────────────────────── */}
      <section className="related-section section-lazy">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-tag">EXPLORE MORE ROLES</span>
              <h2 className="section-title">Other Engineering Positions</h2>
              <p className="section-subtitle">
                Explore adjacent opportunities across systems, interfaces, and architecture.
              </p>
            </div>
            <Link
              to="/careers"
              className="section-link"
              onMouseEnter={() => prefetchChunk('/careers')}
            >
              View all careers &rarr;
            </Link>
          </div>

          <div className="grid-cards">
            {relatedJobs.map((item) => (
              <Card
                key={item.id}
                to={`/careers/${item.id}`}
                image={item.image}
                imageAlt={item.position}
                tag={item.department}
                meta={item.type}
                title={item.position}
                description={item.tagline || item.points?.join(' · ')}
                actionText="View position &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="JOIN THE TEAM"
        title={`Ready to Shape Production Systems as a ${job.position}?`}
        description="Our application process focuses on real-world engineering discussion, architecture design, and code ownership."
        primaryActionText="Submit Application"
        primaryActionTo={applyUrl}
        showContact={true}
      />
    </div>
  );
}
