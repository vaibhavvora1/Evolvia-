import React, { useRef } from 'react';
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from 'framer-motion';
import {
  Bot, Camera, FileSearch, MessageCircle, PhoneCall, Workflow,
} from 'lucide-react';
import Card, { AnimatedMetric, PointsList } from '../UI/Card';
import PremiumCardMotion from '../UI/PremiumCardMotion';
import { ScrollHeading, ScrollSectionBlobs } from '../UI/ScrollSectionEffects';
import ActionLink from '../UI/ActionLink';
import { aiServices } from '../../data/demoData';
import './AIServices.css';

const AI_ICONS = {
  chat: MessageCircle,
  resume: Bot,
  document: FileSearch,
  voice: PhoneCall,
  vision: Camera,
  workflow: Workflow,
};

export default function AIServices() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const marqueeRef = useRef(null);
  const inView = useInView(marqueeRef, { margin: '100px' });
  const trackX = useMotionValue('0%');
  const elapsed = useRef(0);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !inView || paused.current) return;
    elapsed.current = (elapsed.current + delta) % 48000;
    trackX.set(`${-(elapsed.current / 48000) * 50}%`);
  });

  const pause = () => { paused.current = true; };
  const resume = () => { paused.current = false; };

  return (
    <section ref={sectionRef} id="ai-services" className="ai-services-section dark-section" aria-labelledby="ai-services-title">
      <ScrollSectionBlobs targetRef={sectionRef} />
      <div className="container">
        <ScrollHeading className="ai-services-heading">
          <div>
            <span className="section-tag">APPLIED INTELLIGENCE</span>
            <h2 id="ai-services-title" className="section-title">AI that gets useful work done.</h2>
            <p className="section-subtitle">
              Purpose-built intelligence for customer conversations, company knowledge, and everyday operations.
            </p>
          </div>
          <span className="ai-services-index">01—06 / AI SYSTEMS</span>
        </ScrollHeading>
      </div>

      <div
        className="ai-services-marquee"
        ref={marqueeRef}
        data-reduced-motion={reduceMotion ? 'true' : undefined}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) resume();
        }}
      >
        <motion.div className="ai-services-track" style={{ x: trackX }}>
          {[0, 1].map((copy) => (
            <div className="ai-services-group" aria-hidden={copy === 1 ? 'true' : undefined} inert={copy === 1} key={copy}>
              {aiServices.map((service, index) => {
                const Icon = AI_ICONS[service.icon] || Bot;
                return (
                  <PremiumCardMotion index={index} columns={1} key={`${copy}-${service.id}`}>
                  <Card as="article" className="ai-service-card" index={0} stagger={0} scrollDriven featured={service.id === 'document-qa-rag'}>
                    {service.image && (
                      <div className="ai-service-card__image">
                        <img src={service.image} alt={`${service.title} cover`} width={service.imageWidth} height={service.imageHeight} loading="lazy" decoding="async" />
                      </div>
                    )}
                    <div className="ai-service-card__top">
                      <span className="ai-service-card__index"><AnimatedMetric value={`0${index + 1}`} /></span>
                      <span className="ai-service-card__icon" aria-hidden="true">
                        <Icon size={23} strokeWidth={1.6} />
                      </span>
                    </div>
                    <h3>{service.title}</h3>
                    <p className="ai-service-card__description">{service.description}</p>
                    <PointsList items={service.points} className="point-list ai-service-card__points" />
                    <div className="ai-service-card__footer">
                      <div className="ai-service-tags card-tags">
                        {service.technologies.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>
                      <p className="ai-service-card__benefit">{service.benefit}</p>
                      <ActionLink to={`/services/${service.id}`} className="ai-service-link" variant="outline">
                        Explore
                      </ActionLink>
                    </div>
                  </Card>
                  </PremiumCardMotion>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="container ai-services-footnote">
        <span>BUILT AROUND YOUR WORKFLOWS</span>
        <span>SCROLL OR HOVER TO EXPLORE</span>
      </div>
    </section>
  );
}
