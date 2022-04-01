import axios from 'axios';
import dayjs from 'dayjs';
import { createSlice } from '@reduxjs/toolkit';

import { AppThunk } from 'app/config/store';
import { TranslatorContext } from 'react-jhipster';

const initialState = {
  currentLocale: '',
  sourcePrefixes: [],
  lastChange: TranslatorContext.context.lastChange,
  loadedKeys: [],
};

export type LocaleState = Readonly<typeof initialState>;

export const loadLocale = async (locale: string, prefix: string) => {
  if (prefix || !Object.keys(TranslatorContext.context.translations).includes(locale)) {
    const response = await axios.get(`${prefix}i18n/${locale}.json?_=${I18N_HASH}`, { baseURL: '' });
    TranslatorContext.registerTranslations(locale, response.data);
  }
};

export const setLocale: (locale: string) => AppThunk = locale => dispatch => {
  dispatch(updateLocale(locale));
};

export const LocaleSlice = createSlice({
  name: 'locale',
  initialState: initialState as LocaleState,
  reducers: {
    updateLocale(state, action) {
      const currentLocale = action.payload;
      if (state.currentLocale !== currentLocale) {
        dayjs.locale(currentLocale);
        TranslatorContext.setLocale(currentLocale);
      }
      state.currentLocale = currentLocale;
    },
    loaded(state, action) {
      state.lastChange = TranslatorContext.context.lastChange;
      state.loadedKeys = state.loadedKeys.concat(action.payload);
    },
    addTranslationSourcePrefix(state, action) {
      const sourcePrefix = action.payload;
      if (!state.sourcePrefixes.includes(sourcePrefix)) {
        state.sourcePrefixes = state.sourcePrefixes.concat(sourcePrefix);
      }
    },
  },
});

export const { updateLocale, addTranslationSourcePrefix, loaded } = LocaleSlice.actions;

// Reducer
export default LocaleSlice.reducer;
