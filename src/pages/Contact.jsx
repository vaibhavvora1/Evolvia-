import React, { useState, useRef } from 'react';
import PageHero from '../components/UI/PageHero';
import { IconArrowRight, IconMail, IconMapPin, IconCheck } from '../components/UI/Icons';
import usePageMeta from '../hooks/usePageMeta';
import useFormSubmit from '../hooks/useFormSubmit';
import { CONTACT_EMAIL } from '../config/contact';
import { contactPerks } from '../data/demoData';

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  projectScope: 'Custom Software & Architecture',
  budget: '$50k - $150k',
  message: '',
};

export default function Contact() {
  usePageMeta(
    'Contact Us — Evolvia Tech',
    'Get in touch with the engineering team at Evolvia Tech for software development, AI systems, and cloud infrastructure consultation.',
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
    if (lockRef.current) return;

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
        subject: `Project Inquiry from ${formData.name}`,
        fromName: 'Evolvia Website Contact Form',
        replyTo: formData.email,
        fields: {
          Name: formData.name,
          Email: formData.email,
          Company: formData.company || 'Not specified',
          'Project Scope': formData.projectScope,
          'Budget Range': formData.budget,
          Message: formData.message,
        },
      });
      setSubmitted(true);
      setFormData(INITIAL_FORM);
    } catch {
      setSubmitError('Unable to send message directly. Please write to us at ' + CONTACT_EMAIL);
    } finally {
      setIsSubmitting(false);
      lockRef.current = false;
    }
  };

  return (
    <div className="contact-page">
      <PageHero
        tag="START A CONVERSATION"
        title="Let's Build Something Dependable Together."
        subtitle="Discuss your technical roadmap, get an architectural evaluation, or initiate a scoped product sprint with our senior engineering team."
        image="/asset-01.webp"
        imageAlt="Contact Evolvia Tech Team"
      />

      <section className="page-section">
        <div className="container contact-layout-grid">
          {/* ── Contact Info & Guarantees ── */}
          <div className="contact-info-panel">
            <span className="section-tag">DIRECT ACCESS</span>
            <h2 className="contact-panel-title">Speak Directly to Technical Founders</h2>
            <p className="contact-panel-desc">
              No sales pitches or middle layers. You will speak directly with engineers who will design and deliver your systems.
            </p>

            <div className="contact-details-box">
              <div className="contact-detail-row">
                <IconMail size={20} className="contact-icon" />
                <div>
                  <strong>Email Inquiry</strong>
                  <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                </div>
              </div>

              <div className="contact-detail-row">
                <IconMapPin size={20} className="contact-icon" />
                <div>
                  <strong>Engineering Office</strong>
                  <p>Maninagar, Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="contact-perks-list">
              <h4>Our Engagement Commitments</h4>
              {contactPerks.map((perk, i) => (
                <div key={i} className="contact-perk-item">
                  <IconCheck size={18} className="perk-check-icon" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="contact-form-panel">
            <div className="form-card">
              <h3 className="form-title">Send a Project Brief</h3>
              <p className="form-subtext">We review and respond to every inquiry within 24 business hours.</p>

              {submitted ? (
                <div className="form-success-banner" role="status">
                  <IconCheck size={28} />
                  <div>
                    <h4>Message Received</h4>
                    <p>Thank you for reaching out. A senior engineer will review your brief and reply promptly.</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ marginTop: '12px' }}
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="contact-form">
                  {submitError && (
                    <div className="form-error-banner" role="alert">
                      {submitError}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.name && <span className="field-error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.email && <span className="field-error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-company">Company / Organization</label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="form-input"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="contact-scope">Project Scope</label>
                      <select
                        id="contact-scope"
                        name="projectScope"
                        value={formData.projectScope}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="Custom Software & Architecture">Custom Software & Architecture</option>
                        <option value="Applied AI & Agents">Applied AI & Agents</option>
                        <option value="Web & Mobile Application">Web & Mobile Application</option>
                        <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                        <option value="Technical Consultation">Technical Consultation</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-budget">Estimated Budget</label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="< $25k">&lt; $25k</option>
                        <option value="$25k - $50k">$25k - $50k</option>
                        <option value="$50k - $150k">$50k - $150k</option>
                        <option value="$150k+">$150k+</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Project Overview &amp; Objectives *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about the problem you are solving, technical requirements, timeline, etc."
                      className={`form-textarea ${errors.message ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.message && <span className="field-error-text">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Brief...' : 'Send Project Brief'}
                    {!isSubmitting && <IconArrowRight size={16} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
