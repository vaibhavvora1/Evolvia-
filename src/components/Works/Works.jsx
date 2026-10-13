import React, { useRef } from 'react';
import { CloudCog, CreditCard, Layers3, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../UI/Reveal';
import SpecularButton from '../UI/SpecularButton';
import Card, { AnimatedMetric, PointsList } from '../UI/Card';
import ActionLink from '../UI/ActionLink';
import PremiumCardMotion from '../UI/PremiumCardMotion';
import { ScrollHeading, ScrollSectionBlobs } from '../UI/ScrollSectionEffects';
import TechnologyItem from '../Technology/TechnologyItem';
import { projects } from '../../data/demoData';
import { findTechnology } from '../../data/technologies';
import './Works.css';

const PROJECT_ART = {
  layers: Layers3,
  payment: CreditCard,
  commerce: ShoppingBag,
  cloud: CloudCog,
};

export default function Works({ onNavigate }) {
  const sectionRef = useRef(null);
  const handleDiscuss = (event) => {
    event.preventDefault();
    if (onNavigate) {
      onNavigate('#contact');
      return;
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="works" className="works-section dark-section" aria-label="Our Works Portfolio">
      <ScrollSectionBlobs targetRef={sectionRef} />

      <div className="container works-inner">
        <ScrollHeading className="row align-items-end justify-content-between mb-5">
          <div className="col-12 col-lg-8">
            <span className="section-tag">SELECTED PORTFOLIO</span>
            <Reveal tag="h2" className="section-title">
              Proven results engineered for venture & enterprise scale.
            </Reveal>
            <p className="section-subtitle">
              Recent digital platforms, intelligent applications, and scalable systems,
              made for the constraints of real businesses.
            </p>
          </div>
          <div className="col-12 col-lg-4 text-lg-end mt-4 mt-lg-0">
            <SpecularButton
              variant="outline-white"
              size="md"
              onClick={handleDiscuss}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              }
            >
              Start Your Project
            </SpecularButton>
          </div>
        </ScrollHeading>

        <div className="row g-4">
          {projects.map((project, index) => {
            const ArtIcon = PROJECT_ART[project.artwork] || Layers3;
            return (
              <div key={project.id} className="col-12 col-lg-6">
                <PremiumCardMotion index={index} columns={2} tabletColumns={1} className="project-tilt">
                  <Card
                    as="article"
                    className="project-card"
                    variant="project"
                    featured={project.featured}
                    index={index}
                    scrollDriven
                  >
                    {/* Cursor-following spotlight */}
                    <div className="project-spotlight" aria-hidden="true" />

                    <div className="project-visual-wrapper">
                      {project.image && (
                        <img
                          className="project-visual-image"
                          src={project.image}
                          alt={`${project.title} project interface`}
                          width={project.imageWidth}
                          height={project.imageHeight}
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div className="project-visual-grid-overlay" aria-hidden="true" />
                      <div
                        className="project-accent-glow"
                        style={{ backgroundColor: project.accent }}
                        aria-hidden="true"
                      />
                      {!project.image && (
                        <div className="project-art-icon" data-card-icon aria-hidden="true">
                          <ArtIcon size={44} strokeWidth={1.4} style={{ color: project.accent }} />
                        </div>
                      )}
                      {/* Diagonal shine sweep on hover */}
                      <span className="project-shine" aria-hidden="true" />
                      <div className="project-visual-top">
                        <span className="project-category-tag">{project.category}</span>
                        <span className="project-concept-tag">Illustrative concept</span>
                        <span className="project-year-tag">{project.year}</span>
                      </div>
                      <div className="project-visual-bottom">
                        <span className="project-metric-pill">
                          <span className="metric-dot" style={{ backgroundColor: project.accent }} />
                          <AnimatedMetric value={project.metric} />
                        </span>
                      </div>
                    </div>

                    <div className="project-card-info">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="project-title">
                          <Link to={`/works/${project.id}`}>{project.title}</Link>
                        </h3>
                        <Link
                          to={`/works/${project.id}`}
                          className="project-link-arrow"
                          aria-label={`View ${project.title} case study`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </Link>
                      </div>
                      <p className="project-short-description">{project.shortDescription}</p>
                      <PointsList items={project.points} className="point-list project-points" />
                      <div className="project-brief">
                        <p><strong>Challenge</strong>{project.challenge}</p>
                        <p><strong>Concept outcome</strong>{project.result}</p>
                      </div>
                      <div className="project-tech-tags card-tags">
                        {project.technologies.slice(0, 4).map((technologyName) => {
                          const technology = findTechnology(technologyName);
                          return technology ? (
                            <TechnologyItem
                              variant="chip"
                              key={technology.slug}
                              technology={technology}
                              showCategory={false}
                            />
                          ) : (
                            <span key={technologyName} className="tech-badge">{technologyName}</span>
                          );
                        })}
                      </div>
                      <ActionLink to={`/works/${project.id}`} className="project-case-link" variant="outline">
                        View case study
                      </ActionLink>
                    </div>
                  </Card>
                </PremiumCardMotion>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}