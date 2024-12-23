import { translate } from 'react-jhipster';
import { toast } from 'react-toastify';
import { isFulfilledAction, isRejectedAction } from 'app/shared/reducers/reducer.utils';
import { isAxiosError } from 'axios';
import { FieldErrorVM, isProblemWithMessage } from 'app/shared/jhipster/problem-details';
import { getMessageFromHeaders } from 'app/shared/jhipster/headers';

type ToastMessage = {
  message?: string;
  key?: string;
  data?: any;
};

const addErrorAlert = (message: ToastMessage) => {
  toast.error(message.key ? (translate(message.key, message.data) ?? message.message) : message.message);
};

const getFieldErrorsToasts = (fieldErrors: FieldErrorVM[]): ToastMessage[] =>
  fieldErrors.map(fieldError => {
    if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
      fieldError.message = 'Size';
    }
    // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
    const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
    const fieldName = translate(`jhipsterSampleApplicationReactApp.${fieldError.objectName}.${convertedField}`);
    return { message: `Error on field "${fieldName}"`, key: `error.${fieldError.message}`, data: { fieldName } };
  });

// eslint-disable-next-line complexity
export default () => next => action => {
  const { error, payload } = action;

  /**
   *
   * The notification middleware serves to add success and error notifications
   */
  if (isFulfilledAction(action) && payload?.headers) {
    const { alert, param } = getMessageFromHeaders(payload.headers);
    if (alert) {
      toast.success(translate(alert, { param }));
    }
  }

  if (isRejectedAction(action) && isAxiosError(error)) {
    if (error.response) {
      const { response } = error;
      if (response.status === 401) {
        // Ignore, page will be redirected to login.
      } else if (error.config?.url?.endsWith('api/account') || error.config?.url?.endsWith('api/authenticate')) {
        // Ignore, authentication status check and authentication are treated differently.
      } else if (response.status === 0) {
        // connection refused, server not reachable
        addErrorAlert({
          message: 'Server not reachable',
          key: 'error.server.not.reachable',
        });
      } else if (response.status === 404) {
        addErrorAlert({
          message: 'Not found',
          key: 'error.url.not.found',
        });
      } else {
        const { data } = response;
        const problem = isProblemWithMessage(data) ? data : null;
        if (problem?.fieldErrors) {
          getFieldErrorsToasts(problem.fieldErrors).forEach(message => addErrorAlert(message));
        } else {
          const { error: toastError, param } = getMessageFromHeaders((response.headers as any) ?? {});
          if (toastError) {
            const entityName = translate(`global.menu.entities.${param}`);
            addErrorAlert({ key: toastError, data: { entityName } });
          } else if (problem?.message) {
            addErrorAlert({ message: problem.detail, key: problem.message });
          } else if (typeof data === 'string' && data !== '') {
            addErrorAlert({ message: data });
          } else {
            toast.error(data?.detail ?? data?.message ?? data?.error ?? data?.title ?? 'Unknown error!');
          }
        }
      }
    } else if (error.config?.url?.endsWith('api/account') && error.config?.method === 'get') {
      /* eslint-disable no-console */
      console.log('Authentication Error: Trying to access url api/account with GET.');
    } else {
      addErrorAlert({ message: error.message ?? 'Unknown error!' });
    }
  } else if (error) {
    addErrorAlert({ message: error.message ?? 'Unknown error!' });
  }

  return next(action);
};
