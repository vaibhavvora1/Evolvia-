import React from 'react';
import './TestimonialCard.css';

export default function TestimonialCard({ testimonial, className = '' }) {
  if (!testimonial) return null;

  const {
    name,
    role,
    company,
    project,
    quote,
    rating = 5,
    image,
    initials,
  } = testimonial;

  return (
    <article className={`testimonial-card ${className}`.trim()}>
      <div>
        <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
        <div className="testimonial-stars" role="img" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              className="testimonial-star-icon"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="testimonial-quote-text">{quote}</p>
      </div>

      <div className="testimonial-footer">
        <div className="testimonial-author">
          <div className="testimonial-avatar" aria-hidden="true">
            {image ? (
              <img
                src={image}
                alt={name}
                className="testimonial-avatar-img"
                width="44"
                height="44"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span>{initials || name?.charAt(0) || 'C'}</span>
            )}
          </div>
          <div className="testimonial-author-info">
            <span className="testimonial-author-name">{name}</span>
            <span className="testimonial-author-role">{role}, {company}</span>
          </div>
        </div>

        {project && (
          <span className="testimonial-project-tag">{project}</span>
        )}
      </div>
    </article>
  );
}
