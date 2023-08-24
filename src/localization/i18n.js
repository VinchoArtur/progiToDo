import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './languages/en/en.json';
import ru from './languages/ru/ru.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    lng: 'ru',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    pluralSeparator: '_', // Добавьте эту настройку
  });

export default i18n;
