import React from 'react';
import { CONTACT_EMAIL } from '../../config/contact';

export default function EmailLink({
  children = CONTACT_EMAIL,
  email = CONTACT_EMAIL,
  subject,
  className = '',
  ...props
}) {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  const classes = ['email-link', className].filter(Boolean).join(' ');

  return (
    <a href={`mailto:${email}${query}`} className={classes} {...props}>
      {children}
    </a>
  );
}
