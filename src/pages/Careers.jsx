import React from 'react';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import usePageMeta from '../hooks/usePageMeta';
import { jobs, benefits } from '../data/careers';
import { CONTACT_EMAIL } from '../config/contact';

export default function Careers() {
  usePageMeta(
    'Careers — Engineering Opportunities — Evolvia Tech',
    'Join our remote-first engineering team building dependable software, intelligent systems, and scalable cloud infrastructure.',
    {
      canonicalUrl: 'https://evolvia.tech/careers',
      ogImage: 'https://evolvia.tech/asset-04.webp',
    }
  );

  return (
    <div className="careers-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        tag="ENGINEERING CAREERS"
        title="Build Dependable Software with Senior Autonomy."
        subtitle="We are a remote-first team that values technical clarity, sustainable working hours, and genuine architectural ownership. No algorithmic whiteboard puzzles — just pragmatic engineering."
      />

      {/* ── Open Positions ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-tag">OPEN POSITIONS</span>
              <h2 className="section-title">Current Engineering Openings</h2>
              <p className="section-subtitle">
                Explore our open roles across web architecture, distributed systems, applied AI, and product design.
              </p>
            </div>
          </div>

          <div className="grid-cards">
            {jobs.map((job) => (
              <Card
                key={job.id}
                to={`/careers/${job.id}`}
                image={job.image}
                imageAlt={job.position}
                tag={job.department}
                meta={job.type}
                title={job.position}
                description={job.tagline || job.points?.join(' · ')}
                actionText="View position &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits & Culture ── */}
      {benefits && benefits.length > 0 && (
        <section className="section section-alt section-lazy">
          <div className="container">
            <div className="section-header">
              <div className="section-header-left">
                <span className="section-tag">HOW WE WORK</span>
                <h2 className="section-title">Benefits Built for Longevity</h2>
                <p className="section-subtitle">
                  We invest in an environment that protects focus, family time, and continuous growth.
                </p>
              </div>
            </div>

            <div className="grid-cards">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{benefit.title}</h3>
                  <ul className="detail-checklist">
                    {benefit.points?.map((pt) => (
                      <li key={pt} className="detail-checklist-item" style={{ fontSize: '0.9rem' }}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="GET IN TOUCH"
        title="Don't See Your Exact Role?"
        description={`We are always interested in meeting exceptional engineers. Send an introduction and portfolio link directly to ${CONTACT_EMAIL}.`}
        primaryActionText="Email Your Resume"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
