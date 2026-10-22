import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import Card from '../components/UI/Card';
import TestimonialCard from '../components/UI/TestimonialCard';
import usePageMeta from '../hooks/usePageMeta';
import useGsapReveal from '../hooks/useGsapReveal';
import useSectionReveal from '../hooks/useSectionReveal';
import { projects } from '../data/projects';
import testimonials from '../data/testimonials';

export default function Works() {
  usePageMeta(
    'Our Works & Case Studies — Evolvia Tech',
    'Explore production case studies, system architectures, and engineering outcomes delivered by Evolvia Tech.',
    {
      canonicalUrl: 'https://evolvia.tech/works',
      ogImage: 'https://evolvia.tech/asset-22.webp',
    }
  );

  // Section reveal refs
  const caseHeadRef = useSectionReveal();
  const testimonialHeadRef = useSectionReveal();

  // Grid stagger refs
  const projectsGridRef = useGsapReveal();
  const testimonialsGridRef = useGsapReveal();

  return (
    <div className="works-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        tag="SELECTED WORK"
        title="Engineered Systems, Real Constraints, Proven Outcomes."
        subtitle="Take a deep dive into our architectural decisions, technical trade-offs, and production results across FinTech, cloud platforms, and applied AI workspaces."
        actions={
          <>
            <Link to="/contact" className="btn btn-primary">
              Build with Us &rarr;
            </Link>
            <Link to="/services" className="btn btn-outline-light">
              Our Capabilities
            </Link>
          </>
        }
      />

      {/* ── Case Studies Grid ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div ref={caseHeadRef} className="section-header-left">
              <span className="section-tag">CASE STUDIES</span>
              <h2 className="section-title">Production Systems &amp; Platforms</h2>
              <p className="section-subtitle">
                Each project is detailed with technical challenges, system architectures, and measurable results.
              </p>
            </div>
          </div>

          <div ref={projectsGridRef} className="grid-cards">
            {projects.map((proj) => (
              <Card
                key={proj.id}
                to={`/works/${proj.id}`}
                image={proj.image}
                imageAlt={proj.title}
                tag={proj.category}
                meta={proj.year}
                title={proj.title}
                description={proj.shortDescription}
                actionText="View details &rarr;"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Testimonials ── */}
      <section className="section section-alt section-lazy">
        <div className="container">
          <div className="section-header">
            <div ref={testimonialHeadRef} className="section-header-left">
              <span className="section-tag">CLIENT TESTIMONIALS</span>
              <h2 className="section-title">What Clients Say About Working With Us</h2>
              <p className="section-subtitle">
                Perspectives from founders and engineering leaders who built production systems with Evolvia.
              </p>
            </div>
          </div>

          <div ref={testimonialsGridRef} className="grid-cards">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="START A PROJECT"
        title="Have a System Worth Building?"
        description="Let’s turn your product ideas into a dependable, search-friendly, and maintainable software architecture."
        primaryActionText="Build with Us"
        primaryActionTo="/contact"
        showContact={true}
      />
    </div>
  );
}
