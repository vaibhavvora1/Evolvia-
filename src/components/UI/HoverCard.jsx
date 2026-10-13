import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight } from './Icons';
import { prefetchChunk } from '../../utils/prefetch';

/**
 * HoverCard — Modern Bottom-Wipe Hover Effect
 * Single-layer compact card architecture:
 * - On hover/focus/tap: Primary solid fill wipes in from the bottom (scaleY: 0 -> 1)
 * - Text, tag, and icon switch to light color (#FAF6EC)
 * - Card lifts 4px (translateY(-4px)) and border color changes to var(--primary)
 * - Pure CSS transitions (~0.35s ease-out) for transform, opacity, color, and border-color
 */
export default function HoverCard({
  title,
  icon,
  image,
  imageAlt = '',
  description,
  tag,
  link,
  actionText = 'View details →',
  className = '',
  onClick,
}) {
  const [touchActive, setTouchActive] = useState(false);

  const handleTouchToggle = (e) => {
    if ('ontouchstart' in window && !touchActive && !link) {
      e.preventDefault();
      setTouchActive(true);
    }
  };

  const cardContent = (
    <div
      className={`hover-card-shell ${touchActive ? 'is-touch-active' : ''} ${className}`}
      tabIndex={link ? undefined : 0}
      role="article"
      aria-label={title}
      onClick={onClick || handleTouchToggle}
      onKeyDown={(e) => {
        if (!link && (e.key === 'Enter' || e.key === ' ')) {
          if (onClick) onClick(e);
          else setTouchActive((prev) => !prev);
        }
      }}
    >
      <div className="hover-card-body">
        <div className="hover-card-header">
          {tag && <span className="hover-card-tag">{tag}</span>}
          {icon && <span className="hover-card-icon" aria-hidden="true">{icon}</span>}
        </div>

        {image && (
          <div className="hover-card-thumb-wrap">
            <img
              src={image}
              alt={imageAlt || title}
              className="hover-card-thumb"
              width="280"
              height="140"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <div className="hover-card-text-group">
          <h3 className="hover-card-title">{title}</h3>
          {description && <p className="hover-card-desc">{description}</p>}
        </div>
      </div>

      <div className="hover-card-footer">
        <span className="hover-card-action">
          {actionText} <IconArrowRight size={14} className="hover-card-action-icon" />
        </span>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link
        to={link}
        className="hover-card-link-wrapper"
        aria-label={`${title} - ${actionText}`}
        onMouseEnter={() => prefetchChunk(link)}
        onFocus={() => prefetchChunk(link)}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
