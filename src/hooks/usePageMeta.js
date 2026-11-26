import { useEffect } from 'react';
import { buildImageUrl, SITE_NAME } from '../config/seo';

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
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function updateDynamicJsonLd(structuredData) {
  const existing = document.querySelectorAll('script[data-seo-dynamic="true"]');
  existing.forEach((node) => node.remove());

  if (!structuredData) return;
  const items = (Array.isArray(structuredData) ? structuredData : [structuredData]).filter(Boolean);
  for (const item of items) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-dynamic', 'true');
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  }
}

export default function usePageMeta(title, description, options = {}) {
  const {
    canonicalUrl,
    ogImage,
    ogType = 'website',
    robots = 'index, follow',
    structuredData = null,
  } = options;

  const serializedSchema = structuredData ? JSON.stringify(structuredData) : '';
  const resolvedOgImage = buildImageUrl(ogImage);

  useEffect(() => {
    if (title) {
      document.title = title;
      updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
      updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    }

    if (description) {
      updateMetaTag('meta[name="description"]', 'name', 'description', description);
      updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
      updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }

    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateLinkTag('canonical', canonicalUrl);

    if (canonicalUrl) {
      updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    }

    if (resolvedOgImage) {
      updateMetaTag('meta[property="og:image"]', 'property', 'og:image', resolvedOgImage);
      updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', resolvedOgImage);
    }

    if (robots) {
      updateMetaTag('meta[name="robots"]', 'name', 'robots', robots);
    }

    updateDynamicJsonLd(serializedSchema ? JSON.parse(serializedSchema) : null);

    return () => {
      const dynamicScripts = document.querySelectorAll('script[data-seo-dynamic="true"]');
      dynamicScripts.forEach((node) => node.remove());
    };
  }, [title, description, canonicalUrl, resolvedOgImage, ogType, robots, serializedSchema]);
}
