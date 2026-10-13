import React, { useRef, useState } from 'react';
import Reveal from '../UI/Reveal';
import SpecularButton from '../UI/SpecularButton';
import EmailLink from '../UI/EmailLink';
import useFormSubmit from '../../hooks/useFormSubmit';
import { CONTACT_EMAIL } from '../../config/contact';
import { contactPerks } from '../../data/demoData';
import './FinalCTA.css';

const getInitialFormData = () => ({
  name: '',
  email: '',
  company: '',
  projectScope: 'Custom Software & Architecture',
  budget: '$50k - $150k',
  message: '',
});

export default function FinalCTA() {
  const submitForm = useFormSubmit();
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState(getInitialFormData);
  const submissionInProgress = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError('');
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      errors.name = 'Please enter your name.';
    } else if (trimmedName.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!trimmedEmail) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address (e.g. you@company.com).';
    }

    if (!trimmedMessage) {
      errors.message = 'Please describe your project overview or technical objectives.';
    } else if (trimmedMessage.length < 10) {
      errors.message = 'Please provide at least 10 characters of project details.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submissionInProgress.current) return;
    const form = e.currentTarget;

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const el = form.elements[firstErrorField];
      if (el) el.focus();
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitForm({
        subject: `New Contact Form Submission from ${formData.name}`,
        fromName: 'Evolvia Website',
        replyTo: formData.email,
        fields: {
          Name: formData.name,
          Email: formData.email,
          Company: formData.company || 'Not provided',
          'Estimated Budget Range': formData.budget,
          'Primary Scope': formData.projectScope,
          Message: formData.message,
        },
        botcheck: form.elements.botcheck?.checked || false,
      });
      form.reset();
      setFormData(getInitialFormData());
      setFieldErrors({});
      setFormSent(true);
    } catch (error) {
      setSubmitError(error.message || 'We could not send your message. Please try again or email us directly.');
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormSent(false);
    setSubmitError('');
    setFieldErrors({});
    setFormData(getInitialFormData());
  };

  return (
    <section id="contact" className="final-cta-section dark-section" aria-label="Contact Evolvia">
      <div className="container">
        {/* Final CTA Headline & Intake Form Container */}
        <div id="contact-form-box" className="cta-container-card">
          <div className="row g-5 align-items-center">
            
            {/* Left Column: Bold Statement */}
            <div className="col-12 col-lg-5">
              <span className="section-tag">PROJECT INITIATION</span>
              <Reveal tag="h2" className="cta-headline">
                LET&apos;S BUILD<br />
                WHAT&apos;S NEXT.
              </Reveal>
              
              <p className="cta-pitch">
                Have an idea, product, or complex computational problem worth solving?
                Let’s turn it into scalable software that gives you an unassailable edge.
              </p>

              <div className="cta-perks">
                {contactPerks.map((perk) => (
                  <div className="cta-perk-item" key={perk}>
                    <span className="perk-check" aria-hidden="true">✓</span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <div className="cta-direct-contact pt-4">
                <span className="direct-label">DIRECT INQUIRIES</span>
                <EmailLink email={CONTACT_EMAIL} className="direct-email" />
              </div>
            </div>

            {/* Right Column: Interactive Intake Form */}
            <div className="col-12 col-lg-7">
              <div className="intake-form-panel">
                <div aria-live="polite" className="sr-only">
                  {isSubmitting && 'Submitting your message, please wait.'}
                  {formSent && 'Message submitted successfully. We will be in touch soon.'}
                  {submitError && `Submission error: ${submitError}`}
                </div>

                {formSent ? (
                  <div className="intake-success text-center py-5">
                    <div className="success-badge mb-3" aria-hidden="true">✓</div>
                    <h3 className="h4 fw-bold mb-2">Message Received</h3>
                    <p className="text-secondary mb-4">
                      Thanks for reaching out to Evolvia. We&apos;ll review your requirements and respond shortly.
                    </p>
                    <SpecularButton
                      type="button"
                      variant="outline-white"
                      size="sm"
                      onClick={handleResetForm}
                    >
                      Send Another Inquiry
                    </SpecularButton>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} aria-busy={isSubmitting} noValidate>
                    <h3 className="form-heading mb-4">Start an Architectural Discovery</h3>
                    {submitError && (
                      <p className="form-submit-error" role="alert">
                        {submitError}{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-white text-decoration-underline ms-1">
                          Email us directly
                        </a>
                      </p>
                    )}
                    
                    <div className="row g-3">
                      <div style={{ display: 'none' }} aria-hidden="true">
                        <label htmlFor="contact-botcheck">Leave this field empty</label>
                        <input
                          type="checkbox"
                          id="contact-botcheck"
                          name="botcheck"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label className="form-label-custom" htmlFor="contact-name">
                          Your Name <span className="text-danger" aria-hidden="true">*</span>
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-input-custom ${fieldErrors.name ? 'is-invalid' : ''}`}
                          placeholder="Sarah Jenkins"
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={Boolean(fieldErrors.name)}
                          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                          required
                        />
                        {fieldErrors.name && (
                          <span id="contact-name-error" className="form-field-error" role="alert">
                            {fieldErrors.name}
                          </span>
                        )}
                      </div>

                      <div className="col-12 col-sm-6">
                        <label className="form-label-custom" htmlFor="contact-email">
                          Work Email <span className="text-danger" aria-hidden="true">*</span>
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-input-custom ${fieldErrors.email ? 'is-invalid' : ''}`}
                          placeholder="you@company.com"
                          inputMode="email"
                          autoComplete="email"
                          aria-required="true"
                          aria-invalid={Boolean(fieldErrors.email)}
                          aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                          required
                        />
                        {fieldErrors.email && (
                          <span id="contact-email-error" className="form-field-error" role="alert">
                            {fieldErrors.email}
                          </span>
                        )}
                      </div>

                      <div className="col-12 col-sm-6">
                        <label className="form-label-custom" htmlFor="contact-company">Company / Organization</label>
                        <input
                          type="text"
                          id="contact-company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="form-input-custom"
                          placeholder="Acme Corp"
                          autoComplete="organization"
                        />
                      </div>

                      <div className="col-12 col-sm-6">
                        <label className="form-label-custom" htmlFor="contact-budget">Estimated Budget Range</label>
                        <select
                          id="contact-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="form-input-custom"
                        >
                          <option value="$25k - $50k">$25k - $50k</option>
                          <option value="$50k - $150k">$50k - $150k</option>
                          <option value="$150k - $300k">$150k - $300k</option>
                          <option value="$300k+">$300k+ (Enterprise Retainer)</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label-custom" htmlFor="contact-project-scope">Primary Scope</label>
                        <select
                          id="contact-project-scope"
                          name="projectScope"
                          value={formData.projectScope}
                          onChange={handleChange}
                          className="form-input-custom"
                        >
                          <option value="Custom Software & Architecture">Custom Software & Architecture</option>
                          <option value="AI & Autonomous Workflows">AI & Autonomous Workflows</option>
                          <option value="High-Scale Web & Mobile Applications">High-Scale Web & Mobile Applications</option>
                          <option value="Cloud Migration & DevOps Hardening">Cloud Migration & DevOps Hardening</option>
                          <option value="Full Product Re-engineering">Full Product Re-engineering</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label-custom" htmlFor="contact-message">
                          Project Overview & Objectives <span className="text-danger" aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          className={`form-input-custom ${fieldErrors.message ? 'is-invalid' : ''}`}
                          placeholder="Describe the current architecture, technical bottlenecks, or envisioned product..."
                          aria-required="true"
                          aria-invalid={Boolean(fieldErrors.message)}
                          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                          required
                        />
                        {fieldErrors.message && (
                          <span id="contact-message-error" className="form-field-error" role="alert">
                            {fieldErrors.message}
                          </span>
                        )}
                      </div>

                      <div className="col-12 pt-2">
                        <SpecularButton
                          type="submit"
                          variant="primary"
                          size="lg"
                          className="w-100"
                          disabled={isSubmitting}
                          icon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          }
                        >
                          {isSubmitting ? 'SENDING...' : 'BUILD WITH US →'}
                        </SpecularButton>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
