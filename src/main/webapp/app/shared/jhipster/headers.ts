import { MESSAGE_ALERT_HEADER_NAME, MESSAGE_ERROR_HEADER_NAME, MESSAGE_PARAM_HEADER_NAME } from './constants';

export type HeaderMessage = {
  /** Success translation key or message */
  alert?: string;
  /** Success translation key */
  alertKey?: string;
  /** Success message */
  alertMessage?: string;

  /** Error translation key or message */
  error?: string;
  /** Error translation key */
  errorKey?: string;
  /** Error message */
  errorMessage?: string;
  /** Entity id for success messages. Entity name for error messages. */
  param?: string;
};

const headerToString = (headerValue: any): string | undefined => {
  if (headerValue === undefined) {
    return undefined;
  }
  if (Array.isArray(headerValue)) {
    if (headerValue.length > 1) {
      throw new TypeError('Multiple header values found');
    }
    headerValue = headerValue[0];
  }
  if (typeof headerValue !== 'string') {
    throw new TypeError('Header value is not a string');
  }
  return headerValue;
};

const decodeHeaderValue = (headerValue?: string): string | undefined =>
  headerValue ? decodeURIComponent(headerValue.replaceAll('+', ' ')) : headerValue;

export const getMessageFromHeaders = (headers: Record<string, any>): HeaderMessage => {
  const alertHeader = headerToString(headers[MESSAGE_ALERT_HEADER_NAME]);
  // Try to determine if the alertHeader is a key or a message
  const alertIsKey = /^[A-Za-z0-9](?:[A-Za-z0-9.]*[A-Za-z0-9])?$/.test(alertHeader ?? '');
  const alertKey = alertIsKey ? alertHeader : undefined;
  const alertMessage = alertIsKey ? undefined : alertHeader;

  const errorHeader = headerToString(headers[MESSAGE_ERROR_HEADER_NAME]);
  // Try to determine if the errorHeader is a key or a message
  const errorIsKey = /^[A-Za-z0-9](?:[A-Za-z0-9.]*[A-Za-z0-9])?$/.test(errorHeader ?? '');
  const errorKey = errorIsKey ? errorHeader : undefined;
  const errorMessage = errorIsKey ? undefined : errorHeader;

  return {
    alert: alertHeader,
    alertKey,
    alertMessage,
    error: errorHeader,
    errorKey,
    errorMessage,
    param: decodeHeaderValue(headerToString(headers[MESSAGE_PARAM_HEADER_NAME])),
  };
};
