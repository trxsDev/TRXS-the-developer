import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import thTranslations from './locales/th.json';

const resources = {
  en: { translation: enTranslations },
  th: { translation: thTranslations },
};

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang === 'en' || savedLang === 'th') return savedLang;
    
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'th') return 'th';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;
