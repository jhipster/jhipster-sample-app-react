import { createListenerMiddleware } from '@reduxjs/toolkit';
import { updateLocale, addTranslationSourcePrefix, loadLocale, loaded } from 'app/shared/reducers/locale';
import getStore from './store';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: updateLocale,
  async effect(action) {
    const store = getStore();
    const { sourcePrefixes, loadedKeys } = store.getState().locale;
    const keys = (
      await Promise.all(
        [''].concat(sourcePrefixes).map(async sourcePrefix => {
          const key = `${sourcePrefix}${action.payload}`;
          if (loadedKeys.includes(key)) return;
          await loadLocale(action.payload, sourcePrefix);
          return key;
        })
      )
    ).filter(Boolean);
    store.dispatch(loaded(keys));
  },
});

listenerMiddleware.startListening({
  actionCreator: addTranslationSourcePrefix,
  async effect(action) {
    const store = getStore();
    const { currentLocale, loadedKeys } = store.getState().locale;
    const key = `${action.payload}${currentLocale}`;

    if (!loadedKeys.includes(key)) {
      await loadLocale(currentLocale, action.payload);
    }
    store.dispatch(loaded(key));
  },
});

export default listenerMiddleware.middleware;
