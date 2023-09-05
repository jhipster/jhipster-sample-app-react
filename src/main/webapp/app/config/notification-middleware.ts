import { translate } from 'react-jhipster';
import { toast } from 'react-toastify';
import { isFulfilledAction, isRejectedAction } from 'app/shared/reducers/reducer.utils';
import { AxiosError, AxiosHeaderValue } from 'axios';

const addErrorAlert = (message, key?, data?) => {
  key = key ? key : message;
  toast.error(translate(key, data));
};

export default () => next => action => {
  const { error, payload } = action;

  /**
   *
   * The notification middleware serves to add success and error notifications
   */
  if (isFulfilledAction(action) && payload && payload.headers) {
    const headers = payload?.headers;
    let alert: string | null = null;
    let alertParams: string | null = null;
    headers &&
      Object.entries<string>(headers).forEach(([k, v]) => {
        if (k.toLowerCase().endsWith('app-alert')) {
          alert = v;
        } else if (k.toLowerCase().endsWith('app-params')) {
          alertParams = decodeURIComponent(v.replace(/\+/g, ' '));
        }
      });
    if (alert) {
      const alertParam = alertParams;
      toast.success(translate(alert, { param: alertParam }));
    }
  }

  if (isRejectedAction(action) && error && error.isAxiosError) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const response = axiosError.response;
      const data = response.data as any;
      if (
        !(
          response.status === 401 &&
          (axiosError.message === '' || response.config.url === 'api/account' || response.config.url === 'api/authenticate')
        )
      ) {
        switch (response.status) {
          // connection refused, server not reachable
          case 0:
            addErrorAlert('Server not reachable', 'error.server.not.reachable');
            break;

          case 400: {
            let errorHeader: string | null = null;
            let entityKey: string | null = null;
            response?.headers &&
              Object.entries<AxiosHeaderValue>(response.headers).forEach(([k, v]) => {
                if (k.toLowerCase().endsWith('app-error')) {
                  errorHeader = v as string;
                } else if (k.toLowerCase().endsWith('app-params')) {
                  entityKey = v as string;
                }
              });
            if (errorHeader) {
              const entityName = translate('global.menu.entities.' + entityKey);
              addErrorAlert(errorHeader, errorHeader, { entityName });
            } else if (data?.fieldErrors) {
              const fieldErrors = data.fieldErrors;
              for (const fieldError of fieldErrors) {
                if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                  fieldError.message = 'Size';
                }
                // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                const fieldName = translate(`jhipsterSampleApplicationReactApp.${fieldError.objectName}.${convertedField}`);
                addErrorAlert(`Error on field "${fieldName}"`, `error.${fieldError.message}`, { fieldName });
              }
            } else if (typeof data === 'string' && data !== '') {
              addErrorAlert(data);
            } else {
              toast.error(data?.message || data?.error || data?.title || 'Unknown error!');
            }
            break;
          }
          case 404:
            addErrorAlert('Not found', 'error.url.not.found');
            break;

          default:
            if (typeof data === 'string' && data !== '') {
              addErrorAlert(data);
            } else {
              toast.error(data?.message || data?.error || data?.title || 'Unknown error!');
            }
        }
      }
    } else if (axiosError.config && axiosError.config.url === 'api/account' && axiosError.config.method === 'get') {
      /* eslint-disable no-console */
      console.log('Authentication Error: Trying to access url api/account with GET.');
    } else {
      toast.error(error.message || 'Unknown error!');
    }
  } else if (error) {
    toast.error(error.message || 'Unknown error!');
  }

  return next(action);
};
