import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import sinon from 'sinon';
import { TranslatorContext } from 'react-jhipster';

import account, { updateAccount, reset } from './settings.reducer';

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
    const getState = jest.fn();
    const dispatch = jest.fn();
    const extra = {};
    beforeEach(() => {
      store = configureStore({
        reducer: (state = [], action) => [...state, action],
      });
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches UPDATE_ACCOUNT_PENDING and UPDATE_ACCOUNT_FULFILLED actions', async () => {
      const arg = '';

      const result = await updateAccount(arg)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(updateAccount.fulfilled.match(result)).toBe(true);
      expect(result.payload).toBe(resolvedObject);
    });
    it('dispatches RESET actions', async () => {
      await store.dispatch(reset());
      expect(store.getState()).toEqual([expect.any(Object), expect.objectContaining(reset())]);
    });
  });
});
