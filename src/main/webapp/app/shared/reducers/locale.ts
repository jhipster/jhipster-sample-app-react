import axios from 'axios';
import dayjs from 'dayjs';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TranslatorContext } from 'react-jhipster';

const initialState = {
  currentLocale: '',
  sourcePrefixes: [],
  lastChange: TranslatorContext.context.lastChange,
  loadedKeys: [],
  loadedLocales: [],
};

export type LocaleState = Readonly<typeof initialState>;

const loadLocaleAndRegisterLocaleFile = async (locale: string, prefix: string) => {
  if (prefix || !Object.keys(TranslatorContext.context.translations).includes(locale)) {
    const response = await axios.get(`${prefix}i18n/${locale}.json?_=${I18N_HASH}`, { baseURL: '' });
    TranslatorContext.registerTranslations(locale, response.data);
  }
};

export const setLocale = createAsyncThunk('locale/setLocale', async (locale: string, thunkAPI: any) => {
  const { sourcePrefixes, loadedKeys, loadedLocales } = thunkAPI.getState().locale;
  if (!loadedLocales.includes(locale)) {
    const keys = (
      await Promise.all(
        [''].concat(sourcePrefixes).map(async sourcePrefix => {
          const key = `${sourcePrefix}${locale}`;
          if (loadedKeys.includes(key)) return undefined;
          await loadLocaleAndRegisterLocaleFile(locale, sourcePrefix);
          return key;
        })
      )
    ).filter(Boolean);
    thunkAPI.dispatch(loaded({ keys, locale }));
  }
  thunkAPI.dispatch(updateLocale(locale));
  return locale;
});

export const addTranslationSourcePrefix = createAsyncThunk(
  'locale/addTranslationSourcePrefix',
  async (sourcePrefix: string, thunkAPI: any) => {
    const { currentLocale, loadedKeys, sourcePrefixes } = thunkAPI.getState().locale;
    const key = `${sourcePrefix}${currentLocale}`;
    if (!sourcePrefixes.includes(sourcePrefix)) {
      if (!loadedKeys.includes(key)) {
        await loadLocaleAndRegisterLocaleFile(currentLocale, sourcePrefix);
        thunkAPI.dispatch(loaded({ sourcePrefix, keys: [key] }));
      }
    }
    return key;
  }
);

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
      const { keys, locale, sourcePrefix } = action.payload;
      if (sourcePrefix && !state.sourcePrefixes.includes(sourcePrefix)) {
        state.sourcePrefixes = state.sourcePrefixes.concat(sourcePrefix);
      }
      if (locale && !state.loadedLocales.includes(locale)) {
        state.loadedLocales = state.loadedLocales.concat(locale);
      }
      if (keys) {
        state.loadedKeys = state.loadedKeys.concat(keys);
      }
      state.lastChange = TranslatorContext.context.lastChange;
    },
  },
});

export const { updateLocale, loaded } = LocaleSlice.actions;

// Reducer
export default LocaleSlice.reducer;
