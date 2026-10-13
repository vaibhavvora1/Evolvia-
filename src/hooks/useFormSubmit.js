import { useCallback } from 'react';
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../config/contact';

const FORM_NOT_CONFIGURED = 'This form is not configured yet. Please email us directly.';
const FORM_SUBMIT_FAILED = 'We could not send your submission. Please try again or email us directly.';

export default function useFormSubmit() {
  return useCallback(async ({ subject, fromName, replyTo, fields, botcheck = false }) => {
    if (!WEB3FORMS_ACCESS_KEY) {
      throw new Error(FORM_NOT_CONFIGURED);
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: fromName,
        replyto: replyTo,
        ...fields,
        botcheck: botcheck ? '1' : '',
      }),
    });

    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error(FORM_SUBMIT_FAILED);
    }

    if (!response.ok || !result.success) {
      throw new Error(FORM_SUBMIT_FAILED);
    }

    return true;
  }, []);
}
