import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/UI/PageHero';
import HoverCard from '../components/UI/HoverCard';
import { IconArrowRight } from '../components/UI/Icons';
import { getServiceIcon } from '../utils/serviceIcons';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';
import { services, aiServices } from '../data/demoData';

export default function Services() {
  usePageMeta(
    'Services — Evolvia Tech',
    'Comprehensive software engineering, applied AI, mobile development, and cloud DevOps solutions tailored for scaling companies.',
    {
      canonicalUrl: 'https://evolvia.tech/services',
      ogImage: 'https://evolvia.tech/asset-07.webp',
    }
  );

  const coreServicesRef = useReveal();
  const aiServicesRef = useReveal();

  return (
    <div className="services-page">
      <PageHero
        tag="ENGINEERING SERVICES"
        title="Full-Lifecycle Technical Capabilities Built to Scale."
        subtitle="From architectural conception and rapid prototype delivery to production hardening and cloud infrastructure operations — we engineer software that stands the test of growth."
        image="/asset-07.webp"
        imageAlt="Evolvia Tech Engineering Services"
        actions={
          <Link to="/contact" className="btn btn-primary">
            Request an Estimate <IconArrowRight size={16} />
          </Link>
        }
      />

      {/* ── Core Services Grid ── */}
      <section className="page-section reveal-item" ref={coreServicesRef}>
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">CORE CAPABILITIES</span>
            <h2 className="section-title-compact">Software &amp; Platform Engineering</h2>
            <p className="section-lead-compact">
              Explore our core technical offerings designed for resilience, performance, and clear developer ergonomics.
            </p>
          </div>

          <div className="compact-cards-grid">
            {services.map((svc) => (
              <HoverCard
                key={svc.id}
                title={svc.title}
                tag={svc.category}
                image={svc.image}
                imageAlt={svc.title}
                icon={getServiceIcon(svc.icon)}
                description={`${svc.points.join('. ')}. Technologies: ${svc.tags.slice(0, 3).join(', ')}.`}
                actionText="Service details"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Specialized AI & Automation ── */}
      <section className="page-section bg-alt reveal-item" ref={aiServicesRef}>
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">INTELLIGENT SYSTEMS</span>
            <h2 className="section-title-compact">Applied AI &amp; Intelligent Automation</h2>
            <p className="section-lead-compact">
              Grounding modern generative models and agent workflows in verifiable operational business data.
            </p>
          </div>

          <div className="compact-cards-grid">
            {aiServices.map((ai) => (
              <HoverCard
                key={ai.id}
                title={ai.title}
                tag="APPLIED AI"
                image={ai.image || '/asset-17.webp'}
                imageAlt={ai.title}
                icon={getServiceIcon(ai.icon)}
                description={`${ai.description} ${ai.benefit}`}
                actionText="Explore solution"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineering Quality Assurance ── */}
      <section className="page-section">
        <div className="container quality-callout-grid">
          <div className="quality-item">
            <h3>Modern Architecture</h3>
            <p>Component-driven frontends, typed microservices, and battle-tested databases structured for high maintainability.</p>
          </div>
          <div className="quality-item">
            <h3>Performance First</h3>
            <p>Zero unnecessary bundles, fast asset delivery, lightweight CSS, and rigorous performance budgets.</p>
          </div>
          <div className="quality-item">
            <h3>Direct Communication</h3>
            <p>Collaborate directly with senior architects and technical contributors without bureaucratic intermediaries.</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="page-section bg-alt">
        <div className="container cta-banner-card">
          <h2>Have a project that requires tailored engineering?</h2>
          <p>Let's discuss scope, architecture, milestones, and deliverables.</p>
          <Link to="/contact" className="btn btn-primary">
            Schedule a Technical Call <IconArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
