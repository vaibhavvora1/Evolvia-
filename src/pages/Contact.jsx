import React, { useState, useRef } from 'react';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import usePageMeta from '../hooks/usePageMeta';
import useFormSubmit from '../hooks/useFormSubmit';
import { CONTACT_EMAIL, ADDRESS, COMPANY_NAME, TAGLINE } from '../config/contact';
import { contactPerks } from '../data/contactPerks';

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  projectScope: 'Custom Software & Architecture',
  message: '',
};

export default function Contact() {
  usePageMeta(
    `Contact Us — Build with ${COMPANY_NAME}`,
    `Get in touch with the engineering team at ${COMPANY_NAME} for software development, AI systems, and cloud infrastructure consultation.`,
    {
      canonicalUrl: 'https://evolvia.tech/contact',
      ogImage: 'https://evolvia.tech/asset-01.webp',
    }
  );

  const submitForm = useFormSubmit();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const lockRef = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief description of your project or inquiry.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockRef.current || isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    lockRef.current = true;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitForm({
        subject: `New Project Inquiry: ${formData.projectScope} — ${formData.name}`,
        fromName: formData.name,
        replyTo: formData.email,
        fields: {
          Name: formData.name,
          Email: formData.email,
          Company: formData.company || 'Not provided',
          'Project Scope': formData.projectScope,
          Message: formData.message,
        },
      });
      setSubmitted(true);
      setFormData(INITIAL_FORM);
    } catch (err) {
      setSubmitError(err.message || 'Submission failed. Please email us directly.');
    } finally {
      setIsSubmitting(false);
      lockRef.current = false;
    }
  };

  return (
    <div className="contact-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        tag="START A PROJECT"
        title="Let's Build Software that Evolves with Your Ambition."
        subtitle={`${TAGLINE}. Share your operational requirements, timeline expectations, or system challenges. We respond with transparent architectural feedback within one business day.`}
      />

      {/* ── Contact Section Grid ── */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Form Column */}
            <div className="contact-form-card">
              <h2 className="contact-form-title">Send Us a Message</h2>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--green)',
                      color: 'var(--black)',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      marginBottom: '16px',
                    }}
                  >
                    ✓
                  </span>
                  <h3 style={{ marginBottom: '12px' }}>Thank you for reaching out!</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    We have received your message and our technical team will respond to{' '}
                    <strong>{formData.email || 'your email'}</strong> within one business day.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {submitError && (
                    <div className="contact-error-banner" role="alert">
                      {submitError}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Your Name <span style={{ color: 'var(--black)' }}>*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="form-input"
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="contact-name-error" className="contact-field-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email Address <span style={{ color: 'var(--black)' }}>*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="form-input"
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="contact-email-error" className="contact-field-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-company" className="form-label">
                      Company / Organization (Optional)
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-scope" className="form-label">
                      Primary Engineering Focus
                    </label>
                    <select
                      id="contact-scope"
                      name="projectScope"
                      value={formData.projectScope}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Custom Software & Architecture">Custom Software &amp; Architecture</option>
                      <option value="Applied AI & Workflow Automation">Applied AI &amp; Workflow Automation</option>
                      <option value="Mobile Application Engineering">Mobile Application Engineering</option>
                      <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure &amp; DevOps</option>
                      <option value="UI/UX Engineering & Design Systems">UI/UX Engineering &amp; Design Systems</option>
                      <option value="Technical Consultation">Technical Consultation &amp; Audit</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Project Details <span style={{ color: 'var(--black)' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your system goals, current stack, timeline, or key technical challenges..."
                      className="form-textarea"
                      required
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && (
                      <span id="contact-message-error" className="contact-field-error" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-submit contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Transmission...' : 'Build with Us →'}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Info & Perks Column */}
            <div className="contact-info-column">
              <div
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '32px',
                }}
              >
                <h3 style={{ fontSize: '1.35rem', marginBottom: '18px' }}>Direct Coordinates</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '1rem' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Inquiries &amp; RFPs
                    </span>
                    <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--black)', fontWeight: 700 }}>
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Studio Location
                    </span>
                    <span style={{ color: 'var(--black)', fontWeight: 600 }}>{ADDRESS}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Response Window
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>Within 24 business hours</span>
                  </div>
                </div>
              </div>

              {contactPerks && contactPerks.length > 0 && (
                <div
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '32px',
                    marginTop: '24px',
                  }}
                >
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '18px' }}>What to Expect</h3>
                  <ul className="detail-checklist">
                    {contactPerks.map((perk) => (
                      <li key={perk} className="detail-checklist-item" style={{ fontSize: '1.025rem' }}>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <div className="section-lazy">
        <DarkBand
          tag="TRANSPARENT COLLABORATION"
          title="Direct Access to Engineering Leadership"
          description="No account managers or sales intermediaries. Your inquiry is reviewed by practicing software architects who build production platforms."
          showContact={true}
        />
      </div>
    </div>
  );
}
