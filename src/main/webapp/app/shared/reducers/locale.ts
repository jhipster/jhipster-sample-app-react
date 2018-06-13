export const ACTION_TYPES = {
  SET_LOCALE: 'locale/SET_LOCALE'
};

const initialState = {
  currentLocale: 'en'
};

export type LocaleState = Readonly<typeof initialState>;

export default (state: LocaleState = initialState, action): LocaleState => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOCALE:
      return {
        currentLocale: action.locale || initialState.currentLocale
      };
    default:
      return state;
  }
};

export const setLocale = locale => ({
  type: ACTION_TYPES.SET_LOCALE,
  locale
});
