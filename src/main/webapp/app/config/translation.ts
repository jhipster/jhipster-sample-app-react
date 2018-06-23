import axios from 'axios';
import { TranslatorContext, Storage } from 'react-jhipster';

import { setLocale } from 'app/shared/reducers/locale';

export const locales = ['en'];

let currentLocale;
const savedLocale = Storage.session.get('locale', 'en');
TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const registerLocales = store => {
  locales.forEach(locale => {
    axios.get(`/i18n/${locale}.json`).then(response => {
      TranslatorContext.registerTranslations(locale, response.data);
    });
  });
  store.subscribe(() => {
    const previousLocale = currentLocale;
    currentLocale = store.getState().locale.currentLocale;
    if (previousLocale !== currentLocale) {
      Storage.session.set('locale', currentLocale);
      TranslatorContext.setLocale(currentLocale);
    }
  });
  store.dispatch(setLocale(savedLocale));
};
