import React from 'react';
import { Link } from 'react-router-dom';
import TechLogo from './TechLogo';
import { prefetchChunk } from '../../utils/prefetch';
import './TechMarquee.css';

function MarqueeRow({ technologies, direction }) {
  return (
    <div className={`tech-marquee__row tech-marquee__row--${direction}`}>
      <div className="tech-marquee__track">
        {[0, 1].map((copy) => (
          <div
            className="tech-marquee__group"
            aria-hidden={copy === 1 ? 'true' : undefined}
            key={copy}
          >
            {technologies.map((technology) => (
              <TechLogo
                key={`${copy}-${technology.slug}`}
                technology={technology}
                className="tech-logo--marquee"
                tabIndex={copy === 1 ? -1 : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee({ technologies = [], className = '' }) {
  const firstRow = technologies.filter((_, index) => index % 2 === 0);
  const secondRow = technologies.filter((_, index) => index % 2 !== 0);

  return (
    <section className={`tech-marquee ${className}`} aria-label="Technologies we work with">
      <div className="container tech-marquee__heading">
        <h2>Technologies we work with</h2>
        <Link
          to="/technology"
          className="section-link"
          onMouseEnter={() => prefetchChunk('/technology')}
          onFocus={() => prefetchChunk('/technology')}
        >
          View all &rarr;
        </Link>
      </div>
      <div className="tech-marquee__rows">
        <MarqueeRow technologies={firstRow} direction="left" />
        <MarqueeRow technologies={secondRow} direction="right" />
      </div>
    </section>
  );
}
