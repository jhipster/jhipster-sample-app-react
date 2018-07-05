import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import * as toastify from 'react-toastify'; // synthetic default import doesn't work here due to mocking.
import sinon from 'sinon';

import notificationMiddleware from 'app/config/notification-middleware';

describe('Notification Middleware', () => {
  let store;

  const SUCCESS_TYPE = 'SUCCESS';
  const ERROR_TYPE = 'SUCCESS';
  const DEFAULT_SUCCESS_MESSAGE = 'fooSuccess';
  const DEFAULT_ERROR_MESSAGE = 'fooError';

  // Default action for use in local tests
  const DEFAULT = {
    type: SUCCESS_TYPE,
    payload: 'foo'
  };
  const DEFAULT_PROMISE = {
    type: SUCCESS_TYPE,
    payload: Promise.resolve('foo')
  };
  const DEFAULT_SUCCESS = {
    type: SUCCESS_TYPE,
    meta: {
      successMessage: DEFAULT_SUCCESS_MESSAGE
    },
    payload: Promise.resolve('foo')
  };
  const DEFAULT_ERROR = {
    type: ERROR_TYPE,
    meta: {
      errorMessage: DEFAULT_ERROR_MESSAGE
    },
    payload: Promise.reject(new Error('foo'))
  };

  const makeStore = () => applyMiddleware(notificationMiddleware, promiseMiddleware())(createStore)(() => null);

  beforeEach(() => {
    store = makeStore();
    sinon.spy(toastify.toast, 'error');
    sinon.spy(toastify.toast, 'success');
  });

  afterEach(() => {
    (toastify.toast as any).error.restore();
    (toastify.toast as any).success.restore();
  });

  it('should not trigger a toast message but should return action', () => {
    expect(store.dispatch(DEFAULT).payload).toEqual('foo');
    expect((toastify.toast as any).error.called).toEqual(false);
    expect((toastify.toast as any).success.called).toEqual(false);
  });

  it('should not trigger a toast message but should return promise success', async () => {
    await store.dispatch(DEFAULT_PROMISE).then(resp => {
      expect(resp.value).toEqual('foo');
    });
    expect((toastify.toast as any).error.called).toEqual(false);
    expect((toastify.toast as any).success.called).toEqual(false);
  });

  it('should trigger a success toast message and return promise success', async () => {
    await store.dispatch(DEFAULT_SUCCESS).then(resp => {
      expect(resp.value).toEqual('foo');
    });
    const toastMsg = (toastify.toast as any).success.getCall(0).args[0];
    expect(toastMsg).toEqual(DEFAULT_SUCCESS_MESSAGE);
  });

  it('should trigger an error toast message and return promise error', async () => {
    await store.dispatch(DEFAULT_ERROR).catch(err => {
      expect(err.message).toEqual('foo');
    });
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).toEqual(DEFAULT_ERROR_MESSAGE);
  });
});
