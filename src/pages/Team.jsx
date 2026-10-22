import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import usePageMeta from '../hooks/usePageMeta';
import { team } from '../data/team';
import './Team.css';

export default function Team() {
  usePageMeta(
    'Our Team — Engineering & Leadership — Evolvia Tech',
    'Meet the engineers, architects, and product designers at Evolvia Tech dedicated to building robust software systems.',
    {
      canonicalUrl: 'https://evolvia.tech/team',
      ogImage: 'https://evolvia.tech/asset-19.webp',
    }
  );

  return (
    <div className="team-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        tag="LEADERSHIP & ENGINEERING"
        title="Engineers, Architects & Designers with Senior Craft."
        subtitle="We are a close-knit group of builders with backgrounds in distributed systems, machine learning pipelines, and accessible design systems."
        actions={
          <>
            <Link to="/contact" className="btn btn-primary">
              Work with Us &rarr;
            </Link>
            <Link to="/careers" className="btn btn-outline-light">
              Join Our Team
            </Link>
          </>
        }
      />

      {/* ── Team Grid ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-tag">OUR PEOPLE</span>
              <h2 className="section-title">Core Team Members</h2>
              <p className="section-subtitle">
                Click on any profile to explore individual backgrounds, philosophy, and production case studies.
              </p>
            </div>
          </div>

          <div className="grid-cards team-page-grid">
            {team.map((member) => (
              <Card
                key={member.id}
                to={`/team/${member.id}`}
                image={member.image}
                imageAlt={member.name}
                tag={member.role}
                title={member.name}
                description={member.bio || member.tagline}
                actionText="View profile &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="DIRECT COLLABORATION"
        title="Ready to Partner with Senior Engineers?"
        description="Work directly with technical founders who write code, review architectures, and ship production milestones."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        secondaryActionText="View Open Roles"
        secondaryActionTo="/careers"
        showContact={true}
      />
    </div>
  );
}