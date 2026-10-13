import { useEffect } from 'react';

function updateMetaTag(selector, attributeName, attributeValue, content) {
  if (!content) return;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateLinkTag(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export default function usePageMeta(title, description, options = {}) {
  const {
    canonicalUrl,
    ogImage = 'https://evolvia.tech/hero-poster.webp',
    robots = 'index, follow',
  } = options;

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      updateMetaTag('meta[name="description"]', 'name', 'description', description);
      updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
      updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }

    if (title) {
      updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
      updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    }

    if (canonicalUrl) {
      updateLinkTag('canonical', canonicalUrl);
      updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    }

    if (ogImage) {
      updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
      updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    }

    if (robots) {
      updateMetaTag('meta[name="robots"]', 'name', 'robots', robots);
    }
  }, [title, description, canonicalUrl, ogImage, robots]);
}
