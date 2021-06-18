/**
 * @jest-environment jsdom
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';
import { TranslatorContext } from 'react-jhipster';

import account, { updateAccount, saveAccountSettings, reset } from './settings.reducer';
import { getAccount } from 'app/shared/reducers/authentication';

describe('Settings reducer tests', () => {
  beforeAll(() => {
    TranslatorContext.registerTranslations('en', {});
  });

  describe('Common tests', () => {
    it('should return the initial state', () => {
      const toTest = account(undefined, { type: '' });
      expect(toTest).toMatchObject({
        loading: false,
        errorMessage: null,
        updateSuccess: false,
        updateFailure: false,
      });
    });
  });

  describe('Settings update', () => {
    it('should detect a request', () => {
      const toTest = account(undefined, { type: updateAccount.pending.type });
      expect(toTest).toMatchObject({
        updateSuccess: false,
        updateFailure: false,
        loading: true,
      });
    });
    it('should detect a success', () => {
      const toTest = account(undefined, { type: updateAccount.fulfilled.type });
      expect(toTest).toMatchObject({
        updateSuccess: true,
        updateFailure: false,
        loading: false,
      });
    });
    it('should detect a failure', () => {
      const toTest = account(undefined, { type: updateAccount.rejected.type });
      expect(toTest).toMatchObject({
        updateSuccess: false,
        updateFailure: true,
        loading: false,
      });
    });

    it('should reset the state', () => {
      const initialState = {
        loading: false,
        errorMessage: null,
        successMessage: null,
        updateSuccess: false,
        updateFailure: false,
      };
      expect(account({ ...initialState, loading: true }, reset())).toEqual({
        ...initialState,
      });
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk]);
      store = mockStore({ authentication: { account: { langKey: 'en' } } });
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches UPDATE_ACCOUNT_PENDING and UPDATE_ACCOUNT_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: updateAccount.pending.type,
        },
        {
          type: updateAccount.fulfilled.type,
          payload: resolvedObject,
        },
        {
          type: getAccount.pending.type,
        },
      ];
      await store.dispatch(saveAccountSettings({}));
      expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
      expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
      expect(store.getActions()[2]).toMatchObject(expectedActions[2]);
    });
    it('dispatches RESET actions', async () => {
      await store.dispatch(reset());
      expect(store.getActions()[0]).toMatchObject(reset());
    });
  });
});
