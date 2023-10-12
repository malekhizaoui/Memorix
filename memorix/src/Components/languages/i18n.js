// import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './english.json';
import fr from './frensh.json';


i18n.use(initReactI18next).init({
    resources: {
      fr,
      en
    },
    lng: 'fr', // Set the default language
    fallbackLng: 'fr', // Set the fallback language
    keySeparator: '.', // Set the key separator character
    interpolation: {
      escapeValue: false, // React already escapes the values, so no need to escape again
    },
  });
  
  export default i18n;