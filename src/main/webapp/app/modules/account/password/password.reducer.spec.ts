import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
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
    beforeEach(() => {
      const mockStore = configureStore([thunk]);
      store = mockStore({});
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches UPDATE_PASSWORD_PENDING and UPDATE_PASSWORD_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: savePassword.pending.type,
        },
        {
          type: savePassword.fulfilled.type,
          payload: resolvedObject,
        },
      ];
      await store.dispatch(savePassword({ currentPassword: '', newPassword: '' }));
      expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
      expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
    });
    it('dispatches RESET actions', async () => {
      await store.dispatch(reset());
      expect(store.getActions()[0]).toMatchObject(reset());
    });
  });
});
