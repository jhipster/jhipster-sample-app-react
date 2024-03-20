import axios from 'axios';
import sinon from 'sinon';
import { configureStore } from '@reduxjs/toolkit';
import { TranslatorContext } from 'react-jhipster';

import password, { savePassword, reset } from './password.reducer';

describe('Password reducer tests', () => {
  beforeAll(() => {
    TranslatorContext.registerTranslations('en', {});
  });

  describe('Common tests', () => {
    it('should return the initial state', () => {
      const toTest = password(undefined, { type: '' });
      expect(toTest).toMatchObject({
        loading: false,
        errorMessage: null,
        updateSuccess: false,
        updateFailure: false,
      });
    });
  });

  describe('Password update', () => {
    it('should detect a request', () => {
      const toTest = password(undefined, { type: savePassword.pending.type });
      expect(toTest).toMatchObject({
        updateSuccess: false,
        updateFailure: false,
        loading: true,
      });
    });
    it('should detect a success', () => {
      const toTest = password(undefined, { type: savePassword.fulfilled.type });
      expect(toTest).toMatchObject({
        updateSuccess: true,
        updateFailure: false,
        loading: false,
      });
    });
    it('should detect a failure', () => {
      const toTest = password(undefined, { type: savePassword.rejected.type });
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
      expect(password({ ...initialState, loading: true }, reset)).toEqual({
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
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches UPDATE_PASSWORD_PENDING and UPDATE_PASSWORD_FULFILLED actions', async () => {
      const arg = { currentPassword: '', newPassword: '' };

      const result = await savePassword(arg)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(savePassword.fulfilled.match(result)).toBe(true);
    });
    it('dispatches RESET actions', async () => {
      await store.dispatch(reset());
      expect(store.getState()).toEqual([expect.any(Object), expect.objectContaining(reset())]);
    });
  });
});
