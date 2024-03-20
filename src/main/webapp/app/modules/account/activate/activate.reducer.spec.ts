import axios from 'axios';
import sinon from 'sinon';
import { configureStore } from '@reduxjs/toolkit';

import activate, { activateAction, reset } from './activate.reducer';

describe('Activate reducer tests', () => {
  it('should return the initial state', () => {
    expect(activate(undefined, { type: '' })).toMatchObject({
      activationSuccess: false,
      activationFailure: false,
    });
  });

  it('should reset', () => {
    expect(activate({ activationSuccess: true, activationFailure: false }, reset)).toMatchObject({
      activationSuccess: false,
      activationFailure: false,
    });
  });

  it('should detect a success', () => {
    expect(activate(undefined, { type: activateAction.fulfilled.type })).toMatchObject({
      activationSuccess: true,
      activationFailure: false,
    });
  });

  it('should return the same state on request', () => {
    expect(activate(undefined, { type: activateAction.pending.type })).toMatchObject({
      activationSuccess: false,
      activationFailure: false,
    });
  });

  it('should detect a failure', () => {
    expect(activate(undefined, { type: activateAction.rejected.type })).toMatchObject({
      activationSuccess: false,
      activationFailure: true,
    });
  });

  it('should reset the state', () => {
    const initialState = {
      activationSuccess: false,
      activationFailure: false,
    };
    expect(activate({ activationSuccess: true, activationFailure: true }, reset)).toEqual({
      ...initialState,
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
    });

    it('dispatches ACTIVATE_ACCOUNT_PENDING and ACTIVATE_ACCOUNT_FULFILLED actions', async () => {
      const arg = '';

      const result = await activateAction(arg)(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(activateAction.fulfilled.match(result)).toBe(true);
      expect(result.payload).toBe(resolvedObject);
    });
    it('dispatches RESET actions', async () => {
      await store.dispatch(reset());
      expect(store.getState()).toEqual([expect.any(Object), expect.objectContaining(reset())]);
    });
  });
});
