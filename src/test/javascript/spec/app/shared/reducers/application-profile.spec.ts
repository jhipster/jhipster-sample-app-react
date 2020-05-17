import { REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';

import profile, { ACTION_TYPES, getProfile } from 'app/shared/reducers/application-profile';

describe('Profile reducer tests', () => {
  const initialState = {
    ribbonEnv: '',
    inProduction: true,
    isSwaggerEnabled: false,
  };
  describe('Common tests', () => {
    it('should return the initial state', () => {
      const toTest = profile(undefined, {});
      expect(toTest).toEqual(initialState);
    });

    it('should return the right payload in prod', () => {
      const payload = {
        data: {
          'display-ribbon-on-profiles': 'awesome ribbon stuff',
          activeProfiles: ['prod'],
        },
      };

      expect(profile(undefined, { type: SUCCESS(ACTION_TYPES.GET_PROFILE), payload })).toEqual({
        ribbonEnv: 'awesome ribbon stuff',
        inProduction: true,
        isSwaggerEnabled: false,
      });
    });

    it('should return the right payload in dev with swagger enabled', () => {
      const payload = {
        data: {
          'display-ribbon-on-profiles': 'awesome ribbon stuff',
          activeProfiles: ['swagger', 'dev'],
        },
      };

      expect(profile(undefined, { type: SUCCESS(ACTION_TYPES.GET_PROFILE), payload })).toEqual({
        ribbonEnv: 'awesome ribbon stuff',
        inProduction: false,
        isSwaggerEnabled: true,
      });
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches GET_SESSION_PENDING and GET_SESSION_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.GET_PROFILE),
        },
        {
          type: SUCCESS(ACTION_TYPES.GET_PROFILE),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(getProfile()).then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
