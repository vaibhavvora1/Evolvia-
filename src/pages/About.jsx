import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/UI/PageHero';
import HoverCard from '../components/UI/HoverCard';
import { IconArrowRight } from '../components/UI/Icons';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';
import { team } from '../data/demoData';

const VALUES = [
  {
    title: 'Clarity Before Complexity',
    description: 'We understand the operational goals and user constraints before writing code, choosing pragmatic architecture over hype.',
    tag: 'PRINCIPLE 01',
  },
  {
    title: 'Useful Intelligence',
    description: 'We integrate AI models and retrieval systems where they deliver verified commercial value, not as speculative add-ons.',
    tag: 'PRINCIPLE 02',
  },
  {
    title: 'Reliability by Design',
    description: 'Every system is engineered for resilience, clear telemetry, and low operational friction under real-world loads.',
    tag: 'PRINCIPLE 03',
  },
];

export default function About() {
  usePageMeta(
    'About Us — Evolvia Tech',
    'Learn about Evolvia Tech: our mission, multidisciplinary engineering team, and disciplined approach to software and AI systems.',
    {
      canonicalUrl: 'https://evolvia.tech/about',
      ogImage: 'https://evolvia.tech/about.webp',
    }
  );

  const valuesRef = useReveal();
  const teamRef = useReveal();

  return (
    <div className="about-page">
      <PageHero
        tag="ABOUT EVOLVIA TECH"
        title="Technology Should Make Complex Systems Feel Simple."
        subtitle="At Evolvia, we bridge ambitious product vision and disciplined execution. We engineer digital platforms, intelligent systems, and scalable cloud architectures that empower leaders to operate with total confidence."
        image="/about.webp"
        imageAlt="Evolvia Tech Engineering Headquarters"
        actions={
          <Link to="/contact" className="btn btn-primary">
            Work With Us <IconArrowRight size={16} />
          </Link>
        }
      />

      {/* ── Mission & Story ── */}
      <section className="page-section">
        <div className="container">
          <div className="content-prose-block">
            <span className="section-tag">OUR PURPOSE</span>
            <h2 className="section-title">
              Disciplined Engineering for Ambitious Teams
            </h2>
            <p className="lead-paragraph">
              Founded on the conviction that modern software must be robust, maintainable, and aligned with real business metrics, Evolvia brings together deep computational expertise and human-centered design.
            </p>
            <p className="body-paragraph">
              Based in Ahmedabad, India, our multidisciplinary team partners with startups and enterprise teams globally. We handle the entire lifecycle — from technical discovery, database modeling, and interface development to cloud deployment, automated testing, and ongoing observability.
            </p>
          </div>
        </div>
      </section>

      {/* ── Core Values (Bruno Rocha Hover Cards) ── */}
      <section className="page-section bg-alt reveal-item" ref={valuesRef}>
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">OUR VALUES</span>
            <h2 className="section-title-compact">Principles We Build By</h2>
            <p className="section-lead-compact">
              The fundamental engineering and design standards that guide every decision we make.
            </p>
          </div>

          <div className="compact-cards-grid">
            {VALUES.map((val) => (
              <HoverCard
                key={val.title}
                title={val.title}
                tag={val.tag}
                description={val.description}
                actionText="Explore values"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section className="page-section reveal-item" ref={teamRef}>
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">LEADERSHIP</span>
            <h2 className="section-title-compact">Engineering &amp; Design Leaders</h2>
            <p className="section-lead-compact">
              Meet the minds driving architecture, product strategy, and computational craft.
            </p>
          </div>

          <div className="compact-cards-grid">
            {team.map((member) => (
              <HoverCard
                key={member.id}
                title={member.name}
                tag={member.role}
                image={member.image}
                imageAlt={member.name}
                description={`${member.bio} Specializes in ${member.expertise.join(', ')}.`}
                actionText="View profile"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="page-section bg-alt">
        <div className="container cta-banner-card">
          <h2>Ready to work with our engineering team?</h2>
          <p>Get in touch for a technical consultation or architectural discovery session.</p>
          <Link to="/contact" className="btn btn-primary">
            Start a Conversation <IconArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
