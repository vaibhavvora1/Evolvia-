import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/UI/PageHeader';
import DarkBand from '../components/UI/DarkBand';
import usePageMeta from '../hooks/usePageMeta';
import useFormSubmit from '../hooks/useFormSubmit';
import { jobs } from '../data/careers';
import { CONTACT_EMAIL } from '../config/contact';
import { isCloudinaryConfigured } from '../config/cloudinary';
import { uploadResume } from '../utils/uploadResume';
import NotFound from './NotFound';
import './ApplyForm.css';

const EXPERIENCE_OPTIONS = [
  'Fresher',
  'Less than 1 year',
  '1-2 years',
  '2-3 years',
  '3-5 years',
  '5+ years',
];

const QUALIFICATION_OPTIONS = [
  '12th',
  'Diploma',
  'BCA',
  'B.Sc IT',
  'B.E/B.Tech',
  'MCA',
  'M.Sc IT',
  'M.E/M.Tech',
  'MBA',
  'Other',
];

const MAX_RESUME_BYTES = 2 * 1024 * 1024; // 2 MB
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ApplyForm() {
  const { slug } = useParams();
  const job = jobs.find((j) => j.id === slug);

  usePageMeta(
    job ? `Apply for ${job.position} — Evolvia Tech Careers` : 'Job Application — Evolvia Tech',
    job ? `Submit your application for the ${job.position} position at Evolvia Tech.` : 'Job Application',
    {
      canonicalUrl: `https://evolvia.tech/careers/${slug}/apply`,
      ogImage: 'https://evolvia.tech/hero-poster.webp',
    }
  );

  const submitForm = useFormSubmit();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    qualification: '',
    qualificationOther: '',
    currentCTC: '',
    expectedCTC: '',
    about: '',
    consent: false,
    botcheck: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null); // { file, url }
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const formRef = useRef(null);
  const uploadRef = useRef(null);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const experienceRef = useRef(null);
  const qualificationRef = useRef(null);
  const qualificationOtherRef = useRef(null);
  const expectedCTCRef = useRef(null);
  const resumeRef = useRef(null);
  const aboutRef = useRef(null);
  const consentRef = useRef(null);

  // Cancel any in-flight upload when the page unmounts.
  useEffect(() => {
    return () => {
      uploadRef.current?.abort();
    };
  }, []);

  if (!job) {
    return <NotFound />;
  }

  const busy = isUploading || isSubmitting;

  const validateField = (name, value, currentResume = resumeFile) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Please enter your full name.';
        return '';

      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!EMAIL_PATTERN.test(value.trim())) return 'Enter a valid email address.';
        return '';

      case 'phone': {
        const cleanPhone = value.replace(/\s+/g, '');
        if (!cleanPhone) return 'Phone number is required.';
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
          return 'Enter a valid 10-digit Indian mobile number (starts with 6-9).';
        }
        return '';
      }

      case 'experience':
        if (!value) return 'Please select your total experience.';
        return '';

      case 'qualification':
        if (!value) return 'Please select your highest qualification.';
        return '';

      case 'qualificationOther':
        if (formData.qualification === 'Other' && !value.trim()) {
          return 'Please specify your qualification.';
        }
        return '';

      case 'expectedCTC':
        if (!value.toString().trim()) return 'Expected CTC is required.';
        if (Number(value) < 0 || Number.isNaN(Number(value))) {
          return 'Please enter a valid CTC amount.';
        }
        return '';

      case 'resume':
        if (!currentResume) return 'Resume upload is required.';
        return '';

      case 'about':
        if (!value.trim()) return 'Please tell us briefly about yourself.';
        if (value.length > 500) return 'Tell me about yourself must not exceed 500 characters.';
        return '';

      case 'consent':
        if (!value) return 'You must agree before submitting your application.';
        return '';

      default:
        return '';
    }
  };

  const validateAll = () => {
    const errs = {};
    const nameErr = validateField('fullName', formData.fullName);
    if (nameErr) errs.fullName = nameErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) errs.email = emailErr;

    const phoneErr = validateField('phone', formData.phone);
    if (phoneErr) errs.phone = phoneErr;

    const expErr = validateField('experience', formData.experience);
    if (expErr) errs.experience = expErr;

    const qualErr = validateField('qualification', formData.qualification);
    if (qualErr) errs.qualification = qualErr;

    if (formData.qualification === 'Other') {
      const qualOtherErr = validateField('qualificationOther', formData.qualificationOther);
      if (qualOtherErr) errs.qualificationOther = qualOtherErr;
    }

    const expCTCErr = validateField('expectedCTC', formData.expectedCTC);
    if (expCTCErr) errs.expectedCTC = expCTCErr;

    const resumeErr = validateField('resume', '', resumeFile);
    if (resumeErr) errs.resume = resumeErr;

    const aboutErr = validateField('about', formData.about);
    if (aboutErr) errs.about = aboutErr;

    const consentErr = validateField('consent', formData.consent);
    if (consentErr) errs.consent = consentErr;

    return errs;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: errorMsg,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setTouched((prev) => ({ ...prev, resume: true }));
    setUploadedResume(null);

    if (!file) {
      setResumeFile(null);
      setErrors((prev) => ({ ...prev, resume: 'Resume upload is required.' }));
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'pdf' || file.type !== 'application/pdf') {
      setResumeFile(null);
      setErrors((prev) => ({
        ...prev,
        resume: 'Invalid file type. Please upload a PDF file.',
      }));
      return;
    }

    if (file.size === 0) {
      setResumeFile(null);
      setErrors((prev) => ({
        ...prev,
        resume: 'This file is empty. Please choose a valid PDF.',
      }));
      return;
    }

    if (file.size > MAX_RESUME_BYTES) {
      setResumeFile(null);
      setErrors((prev) => ({
        ...prev,
        resume: `File exceeds the 2 MB limit (${formatFileSize(file.size)}).`,
      }));
      return;
    }

    setResumeFile(file);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.resume;
      return next;
    });
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setUploadedResume(null);
    setErrors((prev) => ({ ...prev, resume: 'Resume upload is required.' }));
    if (resumeRef.current) {
      resumeRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;

    if (formData.botcheck) {
      return;
    }

    if (!isCloudinaryConfigured) {
      return;
    }

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        fullName: true,
        email: true,
        phone: true,
        experience: true,
        qualification: true,
        qualificationOther: true,
        expectedCTC: true,
        resume: true,
        about: true,
        consent: true,
      });

      if (validationErrors.fullName) fullNameRef.current?.focus();
      else if (validationErrors.email) emailRef.current?.focus();
      else if (validationErrors.phone) phoneRef.current?.focus();
      else if (validationErrors.experience) experienceRef.current?.focus();
      else if (validationErrors.qualification) qualificationRef.current?.focus();
      else if (validationErrors.qualificationOther) qualificationOtherRef.current?.focus();
      else if (validationErrors.expectedCTC) expectedCTCRef.current?.focus();
      else if (validationErrors.resume) resumeRef.current?.focus();
      else if (validationErrors.about) aboutRef.current?.focus();
      else if (validationErrors.consent) consentRef.current?.focus();

      return;
    }

    setSubmitError('');

    // Step 1: upload the PDF to Cloudinary (skipped if this exact file was already uploaded).
    let resumeUrl = uploadedResume && uploadedResume.file === resumeFile ? uploadedResume.url : '';

    if (!resumeUrl) {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        const handle = uploadResume(resumeFile, formData.fullName, setUploadProgress);
        uploadRef.current = handle;
        const result = await handle.promise;
        resumeUrl = result.url;
        setUploadedResume({ file: resumeFile, url: result.url });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setSubmitError(`Resume upload failed: ${err.message}`);
        return;
      } finally {
        uploadRef.current = null;
        setIsUploading(false);
      }
    }

    // Step 2: send the application mail. Sender and heading are "Evolvia";
    // all candidate details are in the body fields. Reply goes to the candidate.
    setIsSubmitting(true);
    try {
      await submitForm({
        subject: `${MAIL_SENDER_NAME} | New Job Application: ${job.position}`,
        fromName: MAIL_SENDER_NAME,
        replyTo: formData.email.trim(),
        fields: {
          'Position Applied': job.position,
          'Candidate Name': formData.fullName.trim(),
          'Email Address': formData.email.trim(),
          'Phone Number': formData.phone.trim(),
          'Total Experience': formData.experience,
          'Highest Qualification':
            formData.qualification === 'Other'
              ? `Other: ${formData.qualificationOther.trim()}`
              : formData.qualification,
          'Current CTC': formData.currentCTC ? `${formData.currentCTC} LPA` : '0 LPA (Fresher)',
          'Expected CTC': `${formData.expectedCTC} LPA`,
          'Resume Link': resumeUrl,
          'Resume File Name': `${resumeFile.name} (${formatFileSize(resumeFile.size)})`,
          'About Candidate': formData.about.trim(),
          'Consent Stored': formData.consent ? 'Agreed' : 'No',
        },
        botcheck: !!formData.botcheck,
      });

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err.message || 'We could not submit your application. Please try again or email us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitError('');
    formRef.current?.requestSubmit();
  };

  let submitLabel = 'Submit Application';
  if (isUploading) submitLabel = `Uploading resume... ${uploadProgress}%`;
  else if (isSubmitting) submitLabel = 'Sending Application...';

  return (
    <div className="apply-page">
      {/* ── Dark PageHeader Band ── */}
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Careers', path: '/careers' },
          { label: job.position, path: `/careers/${slug}` },
          { label: 'Apply' },
        ]}
        tag={`${job.department} • ${job.type}`}
        title={`Apply for ${job.position}`}
        subtitle="Submit your application directly to our engineering leadership. We evaluate technical depth and practical problem solving."
      />

      <section className="section apply-form-section">
        <div className="container">
          <div className="apply-card">
            {submitted ? (
              <div className="apply-success-state">
                <span className="apply-success-icon" aria-hidden="true">✓</span>
                <h2>Application Submitted Successfully!</h2>
                <p>
                  Thank you for applying for the <strong>{job.position}</strong> role at Evolvia Tech.
                  Our engineering leads review every submission and will get in touch regarding next steps.
                </p>
                <Link to="/careers" className="btn btn-primary">
                  Back to careers &rarr;
                </Link>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="apply-form">
                {!isCloudinaryConfigured && (
                  <div className="apply-error-banner" role="alert">
                    <p>Resume upload is not configured, please email us instead.</p>
                    <p className="apply-error-fallback">
                      Send your resume to{' '}
                      <a href={`mailto:${CONTACT_EMAIL}?subject=Application%20for%20${encodeURIComponent(job.position)}`}>
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="apply-error-banner" role="alert">
                    <p>{submitError}</p>
                    <p className="apply-error-fallback">
                      If the issue persists, send your resume directly to{' '}
                      <a href={`mailto:${CONTACT_EMAIL}?subject=Application%20for%20${encodeURIComponent(job.position)}`}>
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline apply-retry-btn"
                      onClick={handleRetry}
                    >
                      Try again
                    </button>
                  </div>
                )}

                <fieldset className="apply-fieldset" disabled={busy}>
                  {/* Hidden job title field */}
                  <input type="hidden" name="jobTitle" value={job.position} />

                  {/* Hidden honeypot field */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="apply-botcheck">Leave this field blank</label>
                    <input
                      id="apply-botcheck"
                      type="text"
                      name="botcheck"
                      value={formData.botcheck}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* 1. Full name */}
                  <div className="form-group">
                    <label htmlFor="apply-fullName" className="form-label">
                      Full name <span className="apply-required">*</span>
                    </label>
                    <input
                      ref={fullNameRef}
                      id="apply-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="e.g. Alex Sharma"
                      className="form-input"
                      aria-invalid={touched.fullName && !!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      required
                    />
                    {touched.fullName && errors.fullName && (
                      <span id="fullName-error" className="apply-field-error" role="alert">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* 2. Email */}
                  <div className="form-group">
                    <label htmlFor="apply-email" className="form-label">
                      Email address <span className="apply-required">*</span>
                    </label>
                    <input
                      ref={emailRef}
                      id="apply-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="you@example.com"
                      className="form-input"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {touched.email && errors.email && (
                      <span id="email-error" className="apply-field-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* 3. Phone number */}
                  <div className="form-group">
                    <label htmlFor="apply-phone" className="form-label">
                      Phone number <span className="apply-required">*</span>
                    </label>
                    <input
                      ref={phoneRef}
                      id="apply-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      placeholder="10-digit mobile number"
                      className="form-input"
                      aria-invalid={touched.phone && !!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      required
                    />
                    {touched.phone && errors.phone && (
                      <span id="phone-error" className="apply-field-error" role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* 4. Total experience */}
                  <div className="form-group">
                    <label htmlFor="apply-experience" className="form-label">
                      Total experience <span className="apply-required">*</span>
                    </label>
                    <select
                      ref={experienceRef}
                      id="apply-experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      onBlur={() => handleBlur('experience')}
                      className="form-select"
                      aria-invalid={touched.experience && !!errors.experience}
                      aria-describedby={errors.experience ? 'experience-error' : undefined}
                      required
                    >
                      <option value="">Select experience level</option>
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {touched.experience && errors.experience && (
                      <span id="experience-error" className="apply-field-error" role="alert">
                        {errors.experience}
                      </span>
                    )}
                  </div>

                  {/* 5. Highest qualification */}
                  <div className="form-group">
                    <label htmlFor="apply-qualification" className="form-label">
                      Highest qualification <span className="apply-required">*</span>
                    </label>
                    <select
                      ref={qualificationRef}
                      id="apply-qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      onBlur={() => handleBlur('qualification')}
                      className="form-select"
                      aria-invalid={touched.qualification && !!errors.qualification}
                      aria-describedby={errors.qualification ? 'qualification-error' : undefined}
                      required
                    >
                      <option value="">Select highest qualification</option>
                      {QUALIFICATION_OPTIONS.map((qual) => (
                        <option key={qual} value={qual}>
                          {qual}
                        </option>
                      ))}
                    </select>
                    {touched.qualification && errors.qualification && (
                      <span id="qualification-error" className="apply-field-error" role="alert">
                        {errors.qualification}
                      </span>
                    )}

                    {formData.qualification === 'Other' && (
                      <div className="apply-qualification-other-wrap">
                        <label htmlFor="apply-qualificationOther" className="form-label">
                          Specify qualification <span className="apply-required">*</span>
                        </label>
                        <input
                          ref={qualificationOtherRef}
                          id="apply-qualificationOther"
                          name="qualificationOther"
                          type="text"
                          value={formData.qualificationOther}
                          onChange={handleChange}
                          onBlur={() => handleBlur('qualificationOther')}
                          placeholder="Please enter your qualification"
                          className="form-input"
                          aria-invalid={touched.qualificationOther && !!errors.qualificationOther}
                          aria-describedby={errors.qualificationOther ? 'qualificationOther-error' : undefined}
                          required
                        />
                        {touched.qualificationOther && errors.qualificationOther && (
                          <span id="qualificationOther-error" className="apply-field-error" role="alert">
                            {errors.qualificationOther}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 6 & 7. Current CTC & Expected CTC */}
                  <div className="apply-two-col">
                    <div className="form-group">
                      <label htmlFor="apply-currentCTC" className="form-label">
                        Current CTC (LPA)
                      </label>
                      <input
                        id="apply-currentCTC"
                        name="currentCTC"
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.currentCTC}
                        onChange={handleChange}
                        placeholder="Enter 0 if fresher"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="apply-expectedCTC" className="form-label">
                        Expected CTC (LPA) <span className="apply-required">*</span>
                      </label>
                      <input
                        ref={expectedCTCRef}
                        id="apply-expectedCTC"
                        name="expectedCTC"
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.expectedCTC}
                        onChange={handleChange}
                        onBlur={() => handleBlur('expectedCTC')}
                        placeholder="e.g. 8.5"
                        className="form-input"
                        aria-invalid={touched.expectedCTC && !!errors.expectedCTC}
                        aria-describedby={errors.expectedCTC ? 'expectedCTC-error' : undefined}
                        required
                      />
                      {touched.expectedCTC && errors.expectedCTC && (
                        <span id="expectedCTC-error" className="apply-field-error" role="alert">
                          {errors.expectedCTC}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="apply-salary-note">Salary details are used strictly for hiring purposes.</p>

                  {/* 8. Resume upload (PDF only, uploaded to Cloudinary on submit) */}
                  <div className="form-group">
                    <label htmlFor="apply-resume" className="form-label">
                      Resume upload <span className="apply-required">*</span>
                    </label>
                    <input
                      ref={resumeRef}
                      id="apply-resume"
                      name="resume"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      className="form-input apply-file-input"
                      aria-invalid={touched.resume && !!errors.resume}
                      aria-describedby={errors.resume ? 'resume-error' : undefined}
                      required
                    />
                    <span className="apply-file-hint">Accepted format: PDF only (Max 2 MB)</span>

                    {resumeFile && (
                      <div className="apply-file-selected">
                        <span className="apply-file-name">{resumeFile.name}</span>
                        <span className="apply-file-size">({formatFileSize(resumeFile.size)})</span>
                        <button
                          type="button"
                          className="apply-file-remove"
                          onClick={handleRemoveFile}
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    {isUploading && (
                      <div className="apply-progress" aria-live="polite">
                        <div
                          className="apply-progress-track"
                          role="progressbar"
                          aria-label="Resume upload progress"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={uploadProgress}
                        >
                          <div
                            className="apply-progress-fill"
                            style={{ transform: `scaleX(${uploadProgress / 100})` }}
                          />
                        </div>
                        <span className="apply-progress-text">Uploading resume... {uploadProgress}%</span>
                      </div>
                    )}

                    {touched.resume && errors.resume && (
                      <span id="resume-error" className="apply-field-error" role="alert">
                        {errors.resume}
                      </span>
                    )}
                  </div>

                  {/* 9. Tell me about yourself */}
                  <div className="form-group">
                    <div className="apply-textarea-header">
                      <label htmlFor="apply-about" className="form-label">
                        Tell me about yourself <span className="apply-required">*</span>
                      </label>
                      <span
                        className={`apply-char-counter ${
                          formData.about.length >= 500 ? 'apply-char-counter--limit' : ''
                        }`}
                        aria-live="polite"
                      >
                        {formData.about.length}/500
                      </span>
                    </div>
                    <textarea
                      ref={aboutRef}
                      id="apply-about"
                      name="about"
                      rows={4}
                      maxLength={500}
                      value={formData.about}
                      onChange={handleChange}
                      onBlur={() => handleBlur('about')}
                      placeholder="Highlight your key achievements, preferred tech stack, and what excites you about this role."
                      className="form-textarea"
                      aria-invalid={touched.about && !!errors.about}
                      aria-describedby={errors.about ? 'about-error' : undefined}
                      required
                    />
                    {touched.about && errors.about && (
                      <span id="about-error" className="apply-field-error" role="alert">
                        {errors.about}
                      </span>
                    )}
                  </div>

                  {/* Consent checkbox */}
                  <div className="form-group apply-consent-group">
                    <label className="apply-consent-label">
                      <input
                        ref={consentRef}
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        onBlur={() => handleBlur('consent')}
                        className="apply-checkbox"
                        aria-invalid={touched.consent && !!errors.consent}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                        required
                      />
                      <span>I agree to Evolvia Tech storing my details for hiring purposes.</span>
                    </label>
                    {touched.consent && errors.consent && (
                      <span id="consent-error" className="apply-field-error" role="alert">
                        {errors.consent}
                      </span>
                    )}
                  </div>

                  {/* Submit button: dark button with green hover */}
                  <div className="apply-submit-wrap">
                    <button
                      type="submit"
                      className="btn btn-submit apply-submit-btn"
                      disabled={busy || !isCloudinaryConfigured}
                    >
                      {submitLabel}
                    </button>
                  </div>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Single Dark Accent Section: DarkBand CTA ── */}
      <DarkBand
        tag="OUR COMMITMENT"
        title="Engineering Transparency & Confidentiality"
        description="All submissions are handled with strict privacy. We provide constructive technical feedback and respect your current employment commitments."
        showContact={true}
      />
    </div>
  );
}