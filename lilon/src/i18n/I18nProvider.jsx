import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';

const I18nContext = createContext({
  locale: 'en',
  t: (key) => key,
  data: en,
});

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};

const dictionaries = { en, es };

export const I18nProvider = ({ pathname, children }) => {
  // Detect locale by pathname prefix: /es -> es, otherwise en
  const locale = pathname?.startsWith('/es') ? 'es' : 'en';
  const dict = dictionaries[locale] || en;

  const value = useMemo(() => ({
    locale,
    data: dict,
    t: (key, vars) => {
      const parts = key.split('.');
      let cur = dict;
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) {
          cur = cur[p];
        } else {
          return key; // fallback to key if missing
        }
      }
      if (typeof cur === 'string') {
        if (vars && typeof vars === 'object') {
          return Object.keys(vars).reduce((acc, k) => acc.replaceAll(`{{${k}}}`, String(vars[k])), cur);
        }
        return cur;
      }
      return key;
    },
  }), [locale, dict]);

  useEffect(() => {
    // Set HTML lang attribute for SEO
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', locale);
      
      // Update Title
      if (dict.meta && dict.meta.title) {
        document.title = dict.meta.title;
      }
      
      // Update Meta Description
      if (dict.meta && dict.meta.description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', dict.meta.description);
      }
      
      // Ensure hreflang alternates exist
      const alternates = [
        { hreflang: 'en', href: en?.meta?.hreflang?.self || 'https://copalperu.com/' },
        { hreflang: 'es', href: es?.meta?.hreflang?.self || 'https://copalperu.com/es' },
      ];
      alternates.forEach(({ hreflang, href }) => {
        let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('hreflang', hreflang);
          document.head.appendChild(link);
        }
        link.setAttribute('href', href);
      });

      // Set canonical based on current locale
      const canonicalHref = locale === 'es' ? (es?.meta?.hreflang?.self || 'https://copalperu.com/es') : (en?.meta?.hreflang?.self || 'https://copalperu.com/');
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalHref);
    }
  }, [locale]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
};

I18nProvider.propTypes = {
  pathname: PropTypes.string,
  children: PropTypes.node,
};

export default I18nProvider;