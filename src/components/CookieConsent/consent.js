export const CONSENT_STORAGE_KEY = 'evolvia_cookie_consent';

export function readSavedConsent() {
  try {
    const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    if (typeof parsed !== 'object' || parsed === null || typeof parsed.date !== 'string') {
      return null;
    }

    return {
      essential: true,
      analytics: parsed.analytics === true,
      preferences: parsed.preferences === true,
      date: parsed.date,
    };
  } catch {
    return null;
  }
}

export function hasConsent(category) {
  if (category === 'essential') return true;
  if (category !== 'analytics' && category !== 'preferences') return false;
  return readSavedConsent()?.[category] === true;
}
