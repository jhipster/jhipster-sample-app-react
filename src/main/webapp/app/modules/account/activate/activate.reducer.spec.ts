import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

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
    beforeEach(() => {
      const mockStore = configureStore([thunk]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches ACTIVATE_ACCOUNT_PENDING and ACTIVATE_ACCOUNT_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: activateAction.pending.type,
        },
        {
          type: activateAction.fulfilled.type,
          payload: resolvedObject,
        },
      ];
      await store.dispatch(activateAction(''));
      expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
      expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
    });
    it('dispatches RESET actions', async () => {
      await store.dispatch(reset());
      expect(store.getActions()[0]).toMatchObject(reset());
    });
  });
});
