import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from '../../locales/en.json';
import id from '../../locales/id.json';
import ms from '../../locales/ms.json';
import zh from '../../locales/zh.json';
import es from '../../locales/es.json';
import pt from '../../locales/pt.json';

const resources = { en, id: { translation: id }, ms: { translation: ms }, zh: { translation: zh }, es: { translation: es }, 'pt-BR': { translation: pt } };

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;