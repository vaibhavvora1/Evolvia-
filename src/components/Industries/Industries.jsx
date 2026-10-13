import React, { useRef } from 'react';
import {
  BookOpen, BriefcaseBusiness, Building2, HeartPulse, Landmark, Layers3, Store, Truck,
} from 'lucide-react';
import Card, { PointsList } from '../UI/Card';
import PremiumCardMotion from '../UI/PremiumCardMotion';
import { ScrollHeading, ScrollSectionBlobs } from '../UI/ScrollSectionEffects';
import Reveal from '../UI/Reveal';
import { industries } from '../../data/industries';
import './Industries.css';

const INDUSTRY_ICONS = {
  fintech: Landmark,
  healthcare: HeartPulse,
  'e-commerce': Store,
  saas: Layers3,
  education: BookOpen,
  logistics: Truck,
  'real-estate': Building2,
  'professional-services': BriefcaseBusiness,
};

export default function Industries() {
  const sectionRef = useRef(null);
  return (
    <section ref={sectionRef} id="industries" className="industries-section" aria-labelledby="industries-title">
      <ScrollSectionBlobs targetRef={sectionRef} />
      <div className="container">
        <ScrollHeading className="industries-heading">
          <div>
            <span className="section-tag">INDUSTRIES & SOLUTIONS</span>
            <Reveal tag="h2" className="section-title" id="industries-title">
              Technology grounded in the work.
            </Reveal>
          </div>
          <p className="section-subtitle">
            We adapt our product and engineering practice to each industry’s operating context.
          </p>
        </ScrollHeading>
        <div className="industries-grid">
          {industries.map((industry, index) => {
            const Icon = INDUSTRY_ICONS[industry.id] || Layers3;
            return (
              <PremiumCardMotion index={index} columns={4} key={industry.id}>
              <Card as="article" className="industry-card" index={0} stagger={0} scrollDriven>
                <div className="industry-card-top">
                  <span className="industry-icon" aria-hidden="true">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                  <span className="industry-number">0{index + 1}</span>
                </div>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
                <PointsList items={industry.solutions} className="point-list industry-solutions" />
                <div className="industry-tags card-tags">
                  {industry.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </Card>
              </PremiumCardMotion>
            );
          })}
        </div>
      </div>
    </section>
  );
}