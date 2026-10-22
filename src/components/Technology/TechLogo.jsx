import React from 'react';
import { Link } from 'react-router-dom';
import { prefetchChunk } from '../../utils/prefetch';
import './TechLogo.css';

export default function TechLogo({ technology, tabIndex, className = '' }) {
  if (!technology) return null;

  const Icon = technology.icon;

  return (
    <Link
      to={`/technology/${technology.slug}`}
      className={`tech-logo ${className}`}
      aria-label={`${technology.name}, ${technology.category}`}
      tabIndex={tabIndex}
      onMouseEnter={() => prefetchChunk(`/technology/${technology.slug}`)}
      onFocus={() => prefetchChunk(`/technology/${technology.slug}`)}
    >
      <span className="tech-logo__tile" aria-hidden="true">
        {Icon ? <Icon className="tech-logo__icon" /> : null}
      </span>
      <span className="tech-logo__name">{technology.name}</span>
    </Link>
  );
}
