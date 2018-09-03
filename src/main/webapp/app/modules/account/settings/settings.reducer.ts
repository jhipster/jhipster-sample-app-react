import axios from 'axios';
import { translate } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { getSession } from 'app/shared/reducers/authentication';
import { setLocale } from 'app/shared/reducers/locale';

export const ACTION_TYPES = {
  UPDATE_ACCOUNT: 'account/UPDATE_ACCOUNT',
  RESET: 'account/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  updateSuccess: false,
  updateFailure: false
};

export type SettingsState = Readonly<typeof initialState>;

// Reducer
export default (state: SettingsState = initialState, action): SettingsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        updateFailure: false
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions
const apiUrl = 'api/account';

export const saveAccountSettings = account => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.UPDATE_ACCOUNT,
    payload: axios.post(apiUrl, account),
    meta: {
      successMessage: translate('settings.messages.success')
    }
  });
  await dispatch(getSession());

  const accountState = getState().authentication.account;
  if (accountState && accountState.langKey) {
    await dispatch(setLocale(accountState.langKey));
  }
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
