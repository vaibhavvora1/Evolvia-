import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import usePageMeta from '../hooks/usePageMeta';
import { team } from '../data/team';
import { COMPANY_NAME, TAGLINE, ADDRESS } from '../config/contact';
import { prefetchChunk } from '../utils/prefetch';
import './About.css';

const PRINCIPLES = [
  {
    title: 'Clarity Before Complexity',
    tag: 'PRINCIPLE 01',
    description: 'We understand the operational goals and user constraints before writing code, choosing pragmatic architecture over trend-chasing.',
  },
  {
    title: 'Useful Intelligence',
    tag: 'PRINCIPLE 02',
    description: 'We integrate AI models and retrieval systems where they deliver verified commercial utility, not as speculative add-ons.',
  },
  {
    title: 'Reliability by Design',
    tag: 'PRINCIPLE 03',
    description: 'Every system is engineered for resilience, clear telemetry, and low operational friction under real-world traffic.',
  },
];

export default function About() {
  usePageMeta(
    `About Us — ${COMPANY_NAME}`,
    `Learn about ${COMPANY_NAME}: our mission, multidisciplinary engineering team, and disciplined approach to software and AI systems.`,
    {
      canonicalUrl: 'https://evolvia.tech/about',
      ogImage: 'https://evolvia.tech/about.webp',
    }
  );

  return (
    <div className="about-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        tag="WHO WE ARE"
        title="Technology Should Make Complex Systems Feel Simple."
        subtitle={`At ${COMPANY_NAME}, we bridge ambitious product vision and disciplined technical execution. We engineer digital platforms, intelligent systems, and scalable cloud architectures.`}
        bannerImage="/about.webp"
        bannerAlt="Evolvia Tech Engineering Studio"
        actions={
          <>
            <Link to="/contact" className="btn btn-primary">
              Build with Us &rarr;
            </Link>
            <Link to="/services" className="btn btn-outline-light">
              Our Services
            </Link>
          </>
        }
      />

      {/* ── Mission & Story ── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <span className="section-tag">OUR MISSION</span>
            <h2 style={{ marginTop: '12px', marginBottom: '24px' }}>
              &ldquo;{TAGLINE}&rdquo;
            </h2>
            <p className="lead" style={{ marginBottom: '20px' }}>
              Founded in {ADDRESS}, {COMPANY_NAME} was established on the conviction that high-performing software
              is the product of deliberate constraints, strong communication, and senior craft.
            </p>
            <p style={{ marginBottom: '20px', color: 'var(--text)' }}>
              Too often, modern software suffers from needless dependency bloat, fragile microservices,
              and speculative AI integrations that hallucinate under production conditions. We advocate for
              systems that are easy to reason about, maintainable by internal teams, and optimized for speed.
            </p>
            <p style={{ color: 'var(--text)' }}>
              Whether you are an early-stage startup needing a bulletproof launch prototype or an established enterprise
              modernizing legacy workflows, our senior engineers work directly with your stakeholders from day one.
            </p>
          </div>
        </div>
      </section>

      {/* ── Core Principles ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-tag">OUR VALUES</span>
              <h2 className="section-title">Guiding Engineering Principles</h2>
              <p className="section-subtitle">
                The operating standards that shape our technical decisions and codebase reviews.
              </p>
            </div>
          </div>

          <div className="grid-cards">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'clamp(26px, 3.5vw, 34px)',
                }}
              >
                <span className="section-tag">{principle.tag}</span>
                <h3 style={{ marginTop: '16px', marginBottom: '12px' }}>{principle.title}</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.025rem', lineHeight: '1.7' }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Leadership Preview ── */}
      <section className="section section-lazy">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-tag">LEADERSHIP</span>
              <h2 className="section-title">Meet the Team Behind Evolvia</h2>
              <p className="section-subtitle">
                Engineers, architects, and product designers dedicated to software excellence.
              </p>
            </div>
            <Link
              to="/team"
              className="section-link"
              onMouseEnter={() => prefetchChunk('/team')}
            >
              Meet the full team &rarr;
            </Link>
          </div>

          <div className="grid-cards about-team-grid">
            {team.map((member) => (
              <Card
                key={member.id}
                to={`/team/${member.id}`}
                image={member.image}
                imageAlt={member.name}
                tag={member.role}
                title={member.name}
                description={member.bio || member.tagline}
                actionText="View details &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="COLLABORATE"
        title="Ready to Build High-Impact Systems Together?"
        description={`We work directly with founders and product teams. Reach out to discuss your technical challenges or schedule an engineering consultation.`}
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        secondaryActionText="Explore Services"
        secondaryActionTo="/services"
        showContact={true}
      />
    </div>
  );
}