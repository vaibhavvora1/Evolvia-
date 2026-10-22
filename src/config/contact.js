export const COMPANY_NAME = 'Evolvia Tech';
export const TAGLINE = 'Evolving Ideas into Impact';
export const ADDRESS = 'Maninagar, Ahmedabad';
export const CONTACT_EMAIL = 'vrvora11@gmail.com';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const WEB3FORMS_ACCESS_KEY = typeof import.meta !== 'undefined' && import.meta.env
  ? import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  : undefined;
