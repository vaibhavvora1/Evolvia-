import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSENT_STORAGE_KEY, readSavedConsent } from './consent';
import './CookieConsent.css';

const DEFAULT_CHOICES = { essential: true, analytics: false, preferences: false };

export default function CookieConsent() {
  const savedConsent = readSavedConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [choices, setChoices] = useState(() => ({
    ...DEFAULT_CHOICES,
    analytics: savedConsent?.analytics === true,
    preferences: savedConsent?.preferences === true,
  }));

  useEffect(() => {
    let timer;

    if (!readSavedConsent()) {
      timer = window.setTimeout(() => setIsVisible(true), 800);
    }

    const handleOpenSettings = () => {
      const consent = readSavedConsent();
      setChoices({
        ...DEFAULT_CHOICES,
        analytics: consent?.analytics === true,
        preferences: consent?.preferences === true,
      });
      setIsCustomizing(true);
      setIsVisible(true);
    };

    window.addEventListener('evolvia:open-cookie-settings', handleOpenSettings);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('evolvia:open-cookie-settings', handleOpenSettings);
    };
  }, []);

  const saveChoices = (nextChoices) => {
    const consent = {
      essential: true,
      analytics: nextChoices.analytics,
      preferences: nextChoices.preferences,
      date: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // Dismiss for this session even if storage is unavailable.
    }

    setChoices(consent);
    setIsVisible(false);
    setIsCustomizing(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      className={`cookie-consent${isCustomizing ? ' is-customizing' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-live="polite"
    >
      <div className="cookie-consent-copy">
        <p id="cookie-consent-title" className="cookie-consent-title">Your privacy matters</p>
        <p className="cookie-consent-description">
          Choose whether to allow optional preferences and analytics. Read our{' '}
          <Link to="/cookie-policy" className="cookie-consent-policy-link">
            Cookie Policy
          </Link>.
        </p>
      </div>

      {isCustomizing && (
        <div className="cookie-consent-preferences">
          <label className="cookie-consent-toggle">
            <span>
              <strong>Essential</strong>
              <small>Always active</small>
            </span>
            <input type="checkbox" checked disabled aria-label="Essential cookies are always enabled" />
          </label>
          <label className="cookie-consent-toggle">
            <span>
              <strong>Analytics</strong>
              <small>Help us understand site usage</small>
            </span>
            <input
              type="checkbox"
              checked={choices.analytics}
              onChange={(event) => setChoices((current) => ({ ...current, analytics: event.target.checked }))}
              aria-label="Allow analytics"
            />
          </label>
          <label className="cookie-consent-toggle">
            <span>
              <strong>Preferences</strong>
              <small>Remember optional site choices</small>
            </span>
            <input
              type="checkbox"
              checked={choices.preferences}
              onChange={(event) => setChoices((current) => ({ ...current, preferences: event.target.checked }))}
              aria-label="Allow preferences"
            />
          </label>
        </div>
      )}

      <div className="cookie-consent-actions">
        {isCustomizing ? (
          <button
            type="button"
            className="cookie-consent-button cookie-consent-accept"
            onClick={() => saveChoices(choices)}
          >
            Save choices
          </button>
        ) : (
          <>
            <button
              type="button"
              className="cookie-consent-button cookie-consent-accept"
              onClick={() => saveChoices({ essential: true, analytics: true, preferences: true })}
            >
              Accept all
            </button>
            <button
              type="button"
              className="cookie-consent-button cookie-consent-reject"
              onClick={() => saveChoices(DEFAULT_CHOICES)}
            >
              Reject non-essential
            </button>
            <button
              type="button"
              className="cookie-consent-button cookie-consent-customize"
              onClick={() => setIsCustomizing(true)}
            >
              Customize
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
