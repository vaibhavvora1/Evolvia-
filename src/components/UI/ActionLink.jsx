import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ActionLink.css';

export default function ActionLink({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  showArrow = true,
  ...props
}) {
  const destination = to || href;
  const classes = `action-link action-link--${variant} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowUpRight size={16} aria-hidden="true" />}
    </>
  );

  if (destination.startsWith('mailto:') || destination.startsWith('tel:') || /^https?:\/\//i.test(destination)) {
    return <a href={destination} className={classes} {...props}>{content}</a>;
  }

  return <Link to={destination} className={classes} {...props}>{content}</Link>;
}
