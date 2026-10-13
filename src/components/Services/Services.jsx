import React, { useRef } from 'react';
import { Braces, Cloud, Code2, PenTool, Smartphone, Sparkles } from 'lucide-react';
import Reveal from '../UI/Reveal';
import SpecularButton from '../UI/SpecularButton';
import Card, { AnimatedMetric, PointsList } from '../UI/Card';
import PremiumCardMotion from '../UI/PremiumCardMotion';
import { ScrollHeading, ScrollSectionBlobs } from '../UI/ScrollSectionEffects';
import ActionLink from '../UI/ActionLink';
import { services } from '../../data/demoData';
import './Services.css';

const SERVICE_ICONS = {
  code: Code2,
  mobile: Smartphone,
  ai: Sparkles,
  cloud: Cloud,
  design: PenTool,
  software: Braces,
};

export default function Services({ onNavigate }) {
  const sectionRef = useRef(null);
  const handleConsultClick = (event) => {
    event.preventDefault();
    if (onNavigate) {
      onNavigate('#contact');
      return;
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="services" className="services-section" aria-label="Our Services">
      <ScrollSectionBlobs targetRef={sectionRef} />
      <div className="container">
        <ScrollHeading className="row align-items-end justify-content-between mb-5">
          <div className="col-12 col-lg-8">
            <span className="section-tag">WHAT WE DELIVER</span>
            <Reveal tag="h2" className="section-title">
              Full-spectrum engineering capabilities tailored for scale.
            </Reveal>
            <p className="section-subtitle">
              We partner with forward-looking enterprises to build digital systems with
              technical precision and commercial momentum.
            </p>
          </div>
          <div className="col-12 col-lg-4 text-lg-end mt-4 mt-lg-0">
            <SpecularButton
              variant="outline-white"
              size="md"
              onClick={handleConsultClick}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              }
            >
              Discuss Your Scope
            </SpecularButton>
          </div>
        </ScrollHeading>

        <div className="row g-4">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon] || Code2;
            return (
              <div key={service.id} className="col-12 col-md-6 col-lg-4">
                <PremiumCardMotion index={index} columns={3} mobileBreakpoint={767}>
                <Card className="service-card" index={0} stagger={0} scrollDriven>
                  {service.image && (
                    <div className="service-card-image">
                      <img src={service.image} alt={`${service.title} cover`} width={service.imageWidth} height={service.imageHeight} loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="service-card-top">
                    <span className="service-number"><AnimatedMetric value={String(service.number)} /></span>
                    <span className="service-icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.7} />
                    </span>
                  </div>
                  <div className="service-card-body">
                    <span className="service-cat">{service.category}</span>
                    <h3 className="service-title">{service.title}</h3>
                    <PointsList items={service.points} className="point-list service-points" />
                  </div>
                  <div className="service-card-bottom">
                    <div className="service-tags card-tags">
                      {service.tags.map((tag) => (
                        <span key={tag} className="service-tag-pill">{tag}</span>
                      ))}
                    </div>
                    <ActionLink className="service-explore-link" to={`/services/${service.id}`} variant="outline">
                      Explore {service.shortTitle}
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
