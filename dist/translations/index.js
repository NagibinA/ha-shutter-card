// translations/index.js

import en from './en.json' assert { type: 'json' };
import ru from './ru.json' assert { type: 'json' };

const TRANSLATIONS = {
  en,
  ru,
};

export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'ru'];

export function getLocalizedString(lang, key, params = {}) {
  const langCode = lang.toLowerCase();
  const translations = TRANSLATIONS[langCode] || TRANSLATIONS[DEFAULT_LANGUAGE];
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      const fallback = TRANSLATIONS[DEFAULT_LANGUAGE];
      let fallbackValue = fallback;
      for (const fk of keys) {
        if (fallbackValue && fallbackValue[fk] !== undefined) {
          fallbackValue = fallbackValue[fk];
        } else {
          return key;
        }
      }
      value = fallbackValue;
      break;
    }
  }
  
  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : match;
    });
  }
  
  return value;
}

export default {
  getLocalizedString,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
};
