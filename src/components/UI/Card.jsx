import React from 'react';
import { Link } from 'react-router-dom';
import Img from './Img';
import { prefetchChunk } from '../../utils/prefetch';
import './Card.css';

export default function Card({
  to,
  image,
  imageAlt = '',
  title,
  description,
  tag,
  meta,
  actionText = 'View details →',
  className = '',
  children,
  onClick,
}) {
  const cleanActionText = actionText ? actionText.replace(/→|&rarr;/, '').trim() : '';

  const cardBody = (
    <article className={`evolvia-card ${className}`}>
      {image && (
        <Img
          src={image}
          alt={imageAlt || title || 'Evolvia preview'}
          ratio="16/10"
          className="evolvia-card-media"
          imgClassName="evolvia-card-img"
          width={320}
          height={200}
        />
      )}
      <div className="evolvia-card-body">
        {(tag || meta) && (
          <div className="evolvia-card-meta">
            {tag && <span className="evolvia-card-tag">{tag}</span>}
            {meta && <span className="evolvia-card-date">{meta}</span>}
          </div>
        )}
        {title && <h3 className="evolvia-card-title">{title}</h3>}
        {description && <p className="evolvia-card-desc">{description}</p>}
        {children}
        {actionText && (
          <span className="evolvia-card-action">
            <span className="evolvia-card-action-text">{cleanActionText}</span>
            <span className="evolvia-card-action-arrow" aria-hidden="true">&rarr;</span>
          </span>
        )}
      </div>
    </article>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="evolvia-card-link"
        onMouseEnter={() => prefetchChunk(to)}
        onFocus={() => prefetchChunk(to)}
        onClick={onClick}
      >
        {cardBody}
      </Link>
    );
  }

  return (
    <div
      className="evolvia-card-wrapper"
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e);
        }
      }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {cardBody}
    </div>
  );
}

export function PointsList({ items = [], className = 'point-list' }) {
  if (!items.length) return null;
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
