import React, { useRef } from 'react';
import {
  ArrowUpRight, BookOpen, Check, ChartNoAxesCombined, Code2, Compass, PenTool, Rocket, Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { AnimatedMetric, PointsList } from '../UI/Card';
import Reveal from '../UI/Reveal';
import PremiumCardMotion from '../UI/PremiumCardMotion';
import { ScrollHeading, ScrollSectionBlobs } from '../UI/ScrollSectionEffects';
import { processStages } from '../../data/process';
import './Process.css';

const PROCESS_ICONS = {
  search: Search,
  compass: Compass,
  pen: PenTool,
  code: Code2,
  check: Check,
  rocket: Rocket,
  chart: ChartNoAxesCombined,
};

export default function Process() {
  const sectionRef = useRef(null);
  return (
    <section ref={sectionRef} id="process" className="process-section" aria-labelledby="process-title">
      <ScrollSectionBlobs targetRef={sectionRef} />

      <div className="container process-inner">
        <ScrollHeading className="process-heading">
          <div>
            <span className="section-tag">HOW WE WORK</span>
            <Reveal tag="h2" className="section-title" id="process-title">
              Clear steps. Thoughtful delivery.
            </Reveal>
          </div>
          <p className="section-subtitle">
            A collaborative path from first questions to a product that can keep growing.
          </p>
        </ScrollHeading>

        <div className="process-grid">
          {processStages.map((stage, index) => {
            const Icon = PROCESS_ICONS[stage.icon] || BookOpen;
            return (
              <PremiumCardMotion key={stage.number} index={index} columns={4} className="process-item">
                <Card as="article" className="process-card" index={index} scrollDriven>
                  <span className="process-spotlight" aria-hidden="true" />
                  <span className="process-card-glow" aria-hidden="true" />

                  <div className="process-card-top">
                    <span className="process-number"><AnimatedMetric value={stage.number} /></span>
                    <span className="process-icon-badge" aria-hidden="true">
                      <Icon size={22} strokeWidth={2} color="#ffffff" />
                    </span>
                  </div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                  <PointsList items={stage.deliverables} className="point-list process-deliverables" />

                  <span className="process-card-bar" aria-hidden="true" />
                </Card>
              </PremiumCardMotion>
            );
          })}

          <PremiumCardMotion index={processStages.length} columns={4} className="process-item">
            <Link to="/#contact" className="process-start-card">
              <span className="process-start-shine" aria-hidden="true" />
              <span className="process-start-icon" aria-hidden="true"><ArrowUpRight size={24} /></span>
              <span className="process-start-label">LET&apos;S START</span>
              <span className="process-start-copy">Have a challenge to solve?</span>
            </Link>
          </PremiumCardMotion>
        </div>
      </div>
    </section>
  );
}