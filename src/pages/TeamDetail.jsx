import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { team } from '../data/team';
import { projects } from '../data/projects';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import Img from '../components/UI/Img';
import NotFound from './NotFound';
import usePageMeta from '../hooks/usePageMeta';
import './DetailPages.css';

export default function TeamDetail() {
  const { slug } = useParams();
  const member = team.find((m) => m.id === slug);

  usePageMeta(
    member ? `${member.name} — ${member.role} — Evolvia Tech` : 'Team Member — Evolvia Tech',
    member ? (member.bio || member.tagline) : 'Team Member Profile',
    {
      canonicalUrl: `https://evolvia.tech/team/${slug}`,
      ogImage: member?.image ? `https://evolvia.tech${member.image}` : 'https://evolvia.tech/hero-poster.webp',
    }
  );

  if (!member) {
    return <NotFound />;
  }

  // Related projects
  const relatedProjects = (member.projects || [])
    .map((projId) => projects.find((p) => p.id === projId))
    .filter(Boolean);

  // 3 related team members
  const relatedTeam = team
    .filter((m) => m.id !== member.id)
    .slice(0, 3);

  return (
    <div className="detail-page team-detail-page">
      {/* ── Dark PageHeader Band with Breadcrumbs ── */}
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Our Team', path: '/team' },
          { label: member.name },
        ]}
        tag={member.role}
        title={member.name}
        subtitle={member.tagline}
      />

      {/* ── Main Content Grid with Sticky Sidebar ────────────────── */}
      <section className="detail-content-section">
        <div className="container detail-layout-grid">
          {/* Main Column */}
          <div className="detail-main-column">
            {/* Portrait Image Frame */}
            {member.image && (
              <div className="detail-block" style={{ maxWidth: '420px' }}>
                <Img
                  src={member.image}
                  alt={member.name}
                  ratio="4/5"
                  objectPosition="center top"
                  width="420"
                  height="525"
                />
              </div>
            )}

            {/* Biography */}
            <div className="detail-block">
              <h2 className="detail-block-title">Background &amp; Expertise</h2>
              <div className="detail-paragraphs">
                {member.longBio && member.longBio.length > 0 ? (
                  member.longBio.map((para) => (
                    <p key={para.slice(0, 32)}>{para}</p>
                  ))
                ) : (
                  <p>{member.bio || member.tagline}</p>
                )}
              </div>
            </div>

            {/* Philosophy / Approach */}
            {member.philosophy && (
              <div className="detail-block">
                <h2 className="detail-block-title">Engineering Philosophy</h2>
                <blockquote className="detail-quote-block">
                  &ldquo;{member.philosophy}&rdquo;
                </blockquote>
              </div>
            )}

            {/* Associated Projects */}
            {relatedProjects.length > 0 && (
              <div className="detail-block">
                <h2 className="detail-block-title">Projects Led &amp; Architected</h2>
                <div className="grid-cards" style={{ marginTop: '20px' }}>
                  {relatedProjects.map((proj) => (
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
              <h3 className="sidebar-box-title">Profile Summary</h3>
              <ul className="sidebar-meta-list">
                <li>
                  <span className="sidebar-meta-label">Role</span>
                  <span className="sidebar-meta-value">{member.role}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Focus</span>
                  <span className="sidebar-meta-value">{member.specialty || 'Full-Stack Architecture'}</span>
                </li>
                <li>
                  <span className="sidebar-meta-label">Location</span>
                  <span className="sidebar-meta-value">Ahmedabad, India</span>
                </li>
              </ul>
            </div>

            {/* Skills & Focus Areas */}
            {member.skills && member.skills.length > 0 && (
              <div className="sidebar-box">
                <h3 className="sidebar-box-title">Core Skills</h3>
                <div className="detail-tech-tags">
                  {member.skills.map((skill) => (
                    <span key={skill} className="detail-tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="sidebar-box">
              <h3 className="sidebar-box-title">Connect</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Discuss architecture, collaboration, or engineering opportunities directly.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Contact Team
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── 3 Related Cards ─────────────────────────────────────── */}
      <section className="related-section section-lazy">
        <div className="container">
          <div className="related-section-header">
            <span className="section-tag">ENGINEERING LEADERSHIP</span>
            <h2>Other Team Members</h2>
          </div>

          <div className="grid-cards">
            {relatedTeam.map((rel) => (
              <Card
                key={rel.id}
                to={`/team/${rel.id}`}
                image={rel.image}
                imageAlt={rel.name}
                tag={rel.role}
                title={rel.name}
                description={rel.bio || rel.tagline}
                actionText="View profile &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="COLLABORATE"
        title="Build with Our Senior Team"
        description="Work directly with founders and senior engineers from day one to deliver scalable digital platforms."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
