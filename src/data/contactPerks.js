/**
 * src/data/contactPerks.js
 * ─────────────────────────
 * Tiny standalone module for the Contact page sidebar perks list.
 * Isolated here so Contact.jsx does NOT import the full 67 KB demoData.js
 * monolith, keeping the /contact lazy chunk as small as possible.
 */
export const contactPerks = [
  'Work directly with engineering founders',
  'Sign NDAs within one business day',
  'Plan delivery with fixed milestones',
];
