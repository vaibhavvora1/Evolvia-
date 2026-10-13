import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal from '../UI/Reveal';
import SpecularButton from '../UI/SpecularButton';
import Card, { PointsList } from '../UI/Card';
import useFormSubmit from '../../hooks/useFormSubmit';
import { WEB3FORMS_ACCESS_KEY } from '../../config/contact';
import ActionLink from '../UI/ActionLink';
import PremiumCardMotion from '../UI/PremiumCardMotion';
import { ScrollHeading, ScrollSectionBlobs } from '../UI/ScrollSectionEffects';
import { CAREERS_DATA as jobs, BENEFITS_DATA as benefits } from '../../data/careers';
import './Careers.css';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];

const formatFileSize = (bytes) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export default function Careers() {
  const sectionRef = useRef(null);
  const submitForm = useFormSubmit();
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const resumeInputRef = useRef(null);
  const submissionInProgress = useRef(false);
  const closeTimer = useRef(null);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const resetFormState = () => {
    setApplicationSubmitted(false);
    setIsSubmitting(false);
    setSubmitStage('');
    setSubmitError('');
    setResumeFile(null);
    setResumeError('');
    setFieldErrors({});
    submissionInProgress.current = false;
  };

  const handleApply = (job) => {
    clearTimeout(closeTimer.current);
    resetFormState();
    setSelectedJob(job);
  };

  const closeModal = () => {
    if (submissionInProgress.current) return;
    clearTimeout(closeTimer.current);
    setSelectedJob(null);
    resetFormState();
  };

  const clearResume = () => {
    setResumeFile(null);
    setResumeError('');
    if (resumeInputRef.current) resumeInputRef.current.value = '';
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    setSubmitError('');

    if (!file) {
      clearResume();
      return;
    }

    const extension = file.name.split('.').pop().toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      clearResume();
      setResumeError('Please upload a PDF, DOC or DOCX file.');
      return;
    }

    if (file.size > MAX_RESUME_BYTES) {
      clearResume();
      setResumeError('Your resume is larger than 5 MB. Please upload a smaller file.');
      return;
    }

    setResumeError('');
    setResumeFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (submissionInProgress.current) return;

    const form = e.currentTarget;
    const application = Object.fromEntries(new FormData(form).entries());

    // Honeypot: bots fill this hidden field. Pretend success and send nothing.
    if (application.botcheck) {
      setApplicationSubmitted(true);
      return;
    }

    const errors = {};
    const name = String(application.name || '').trim();
    const email = String(application.email || '').trim();
    const portfolio = String(application.portfolio || '').trim();
    const message = String(application.message || '').trim();

    if (!name) {
      errors.name = 'Please enter your full name.';
    } else if (name.length < 2) {
      errors.name = 'Full name must be at least 2 characters.';
    }

    if (!email) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address (e.g. you@company.com).';
    }

    if (!portfolio) {
      errors.portfolio = 'Please provide a link to your portfolio, GitHub, or LinkedIn.';
    } else if (!/^https?:\/\/.+/i.test(portfolio)) {
      errors.portfolio = 'Please enter a valid URL starting with http:// or https://.';
    }

    if (!resumeFile) {
      errors.resume = 'Please upload your resume (PDF, DOC, or DOCX, max 5 MB).';
      setResumeError('Please upload your resume (PDF, DOC, or DOCX, max 5 MB).');
    }

    if (!message) {
      errors.message = 'Please tell us what engineering challenges excite you.';
    } else if (message.length < 10) {
      errors.message = 'Please provide at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorKey = Object.keys(errors)[0];
      const el = form.elements[firstErrorKey];
      if (el) el.focus();
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setSubmitError('The application form is not configured yet. Please email us directly.');
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmitError('');
    setFieldErrors({});

    try {
      // Step 1: upload the resume to Cloudinary
      setSubmitStage('UPLOADING...');
      const uploadData = new FormData();
      uploadData.append('file', resumeFile);
      uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: 'POST', body: uploadData },
      );
      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadResult.secure_url) {
        throw new Error(uploadResult?.error?.message || 'Resume upload failed');
      }

      // Step 2: email the application with the resume link
      setSubmitStage('SENDING...');
      await submitForm({
        subject: `New Job Application: ${selectedJob.position} - ${application.name}`,
        fromName: 'Evolvia Careers',
        replyTo: application.email,
        fields: {
          'Position Applied For': selectedJob.position,
          Department: selectedJob.department || 'Not provided',
          'Job Type': selectedJob.type || 'Not provided',
          Location: selectedJob.location || 'Not provided',
          Name: application.name,
          Email: application.email,
          Portfolio: application.portfolio,
          Message: application.message,
          'Resume Link': uploadResult.secure_url,
          'Resume File Name': resumeFile.name,
        },
        botcheck: Boolean(application.botcheck),
      });

      form.reset();
      clearResume();
      setApplicationSubmitted(true);
      closeTimer.current = setTimeout(() => {
        setSelectedJob(null);
        resetFormState();
      }, 3000);
    } catch (error) {
      setSubmitError(error.message || 'We could not send your application. Please try again or email us directly.');
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
      setSubmitStage('');
    }
  };

  return (
    <section ref={sectionRef} id="careers" className="careers-section" aria-label="Careers at Evolvia">
      <ScrollSectionBlobs targetRef={sectionRef} />
      <div className="container">

        {/* Section Header */}
        <ScrollHeading className="row align-items-end justify-content-between mb-5">
          <div className="col-12 col-lg-8">
            <span className="section-tag">JOIN THE EXPEDITION</span>
            <Reveal tag="h2" className="section-title">
              BUILD YOUR NEXT CHAPTER.
            </Reveal>
            <p className="section-subtitle">
              We are an engineering-first collective solving difficult computational and design challenges.
              If you value high craft, agency, and compounding impact, you belong here.
            </p>
          </div>
          <div className="col-12 col-lg-4 text-lg-end mt-3 mt-lg-0">
            <span className="careers-open-badge">
              {jobs.length} ROLES OPEN &bull; REMOTE FRIENDLY
            </span>
          </div>
        </ScrollHeading>

        {/* Job Listings Grid */}
        <div className="row g-4">
          {jobs.map((job, index) => (
            <div key={job.id} className="col-12 col-lg-6">
              <PremiumCardMotion index={index} columns={2} tabletColumns={1}>
              <Card as="article" className="job-card" variant="job" index={0} stagger={0} scrollDriven>
                {job.image && (
                  <img className="job-card-image" src={job.image} alt={`${job.position} workspace`} width={job.imageWidth} height={job.imageHeight} loading="lazy" decoding="async" />
                )}
                <div className="job-card-header">
                  <div>
                    <span className="job-department">{job.department}</span>
                    <h3 className="job-position">{job.position}</h3>
                  </div>
                  <span className="job-type-pill">{job.type}</span>
                </div>

                <PointsList items={job.points} className="point-list job-points" />

                <div className="job-meta-row">
                  <div className="job-meta-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  <div className="job-meta-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{job.experience}</span>
                  </div>
                </div>

                <div className="job-card-footer">
                  <div className="job-skills">
                    {job.skills.map((s) => (
                      <span key={s} className="job-skill-badge">{s}</span>
                    ))}
                  </div>

                  <div className="job-actions">
                    <ActionLink to={`/careers/${job.id}`} className="job-position-link" variant="outline">
                      View Position
                    </ActionLink>
                    <span className="job-apply-button">
                      <SpecularButton
                        variant="primary"
                        size="sm"
                        onClick={() => handleApply(job)}
                        icon={<ArrowRight size={15} />}
                      >
                        Apply Now
                      </SpecularButton>
                    </span>
                  </div>
                </div>
              </Card>
              </PremiumCardMotion>
            </div>
          ))}
        </div>
        <div className="career-benefit-strip" aria-label="Team benefits">
          <span className="section-tag">HOW WE WORK TOGETHER</span>
          <div>
            {benefits.map((benefit) => (
              <span key={benefit.title}>{benefit.title}</span>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="career-modal-backdrop" onClick={closeModal}>
            <motion.div
              className="career-modal-box"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-label={`Apply for ${selectedJob.position}`}
            >
              <button
                type="button"
                className="career-modal-close"
                onClick={closeModal}
                aria-label="Close Modal"
              >
                &times;
              </button>

              {applicationSubmitted ? (
                <div className="text-center py-4">
                  <div className="modal-success-icon mb-3" aria-hidden="true">✓</div>
                  <h3 className="modal-title mb-2">Application Sent</h3>
                  <p className="text-secondary mb-0">
                    Thanks for applying for
                    <strong> {selectedJob.position}</strong>. We&apos;ll review your application and be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} aria-busy={isSubmitting} noValidate>
                  <div aria-live="polite" className="sr-only">
                    {isSubmitting && (submitStage || 'Submitting your application...')}
                    {submitError && `Application error: ${submitError}`}
                  </div>

                  <span className="section-tag mb-1">CAREER APPLICATION</span>
                  <h3 className="modal-title mb-3">Apply for {selectedJob.position}</h3>
                  <p className="small text-secondary mb-4">
                    {selectedJob.location} &bull; {selectedJob.type}
                  </p>

                  {submitError && (
                    <p className="form-submit-error" role="alert">
                      {submitError}
                    </p>
                  )}

                  {/* Honeypot: hidden from humans, catches bots */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="mb-3">
                    <label className="form-label small fw-bold" htmlFor="apply-name">
                      Full Name <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="apply-name"
                      type="text"
                      name="name"
                      className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
                      placeholder="Jane Doe"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? 'apply-name-error' : undefined}
                      required
                    />
                    {fieldErrors.name && (
                      <span id="apply-name-error" className="career-field-error" role="alert">
                        {fieldErrors.name}
                      </span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold" htmlFor="apply-email">
                      Email Address <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="apply-email"
                      type="email"
                      name="email"
                      className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                      placeholder="your.email@company.com"
                      inputMode="email"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'apply-email-error' : undefined}
                      required
                    />
                    {fieldErrors.email && (
                      <span id="apply-email-error" className="career-field-error" role="alert">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold" htmlFor="apply-portfolio">
                      Portfolio / GitHub / LinkedIn URL <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="apply-portfolio"
                      type="url"
                      name="portfolio"
                      className={`form-control ${fieldErrors.portfolio ? 'is-invalid' : ''}`}
                      placeholder="https://github.com/..."
                      inputMode="url"
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.portfolio)}
                      aria-describedby={fieldErrors.portfolio ? 'apply-portfolio-error' : undefined}
                      required
                    />
                    {fieldErrors.portfolio && (
                      <span id="apply-portfolio-error" className="career-field-error" role="alert">
                        {fieldErrors.portfolio}
                      </span>
                    )}
                  </div>

                  {/* Resume Upload */}
                  <div className="mb-3 resume-upload">
                    <label className="form-label small fw-bold" htmlFor="apply-resume">
                      Resume <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="apply-resume"
                      ref={resumeInputRef}
                      type="file"
                      name="resume"
                      className={`form-control ${fieldErrors.resume ? 'is-invalid' : ''}`}
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleResumeChange}
                      aria-describedby="apply-resume-help"
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.resume)}
                    />
                    <div id="apply-resume-help" className="resume-help">
                      PDF, DOC or DOCX, max 5 MB.
                    </div>

                    {resumeFile && (
                      <div className="resume-file-chip">
                        <span className="resume-file-name">{resumeFile.name}</span>
                        <span className="resume-file-size">{formatFileSize(resumeFile.size)}</span>
                        <button
                          type="button"
                          className="resume-file-remove"
                          onClick={clearResume}
                          aria-label="Remove resume"
                          disabled={isSubmitting}
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    {resumeError && (
                      <p className="resume-error" role="alert">{resumeError}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold" htmlFor="apply-message">
                      Why Evolvia? <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="apply-message"
                      name="message"
                      className={`form-control ${fieldErrors.message ? 'is-invalid' : ''}`}
                      rows="3"
                      placeholder="Tell us what engineering challenges excite you..."
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? 'apply-message-error' : undefined}
                      required
                    />
                    {fieldErrors.message && (
                      <span id="apply-message-error" className="career-field-error" role="alert">
                        {fieldErrors.message}
                      </span>
                    )}
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={closeModal}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <SpecularButton type="submit" variant="primary" size="md" disabled={isSubmitting}>
                      {isSubmitting ? submitStage || 'SENDING...' : 'Submit Application'}
                    </SpecularButton>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}