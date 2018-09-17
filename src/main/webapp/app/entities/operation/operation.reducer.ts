import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOperation, defaultValue } from 'app/shared/model/operation.model';

export const ACTION_TYPES = {
  FETCH_OPERATION_LIST: 'operation/FETCH_OPERATION_LIST',
  FETCH_OPERATION: 'operation/FETCH_OPERATION',
  CREATE_OPERATION: 'operation/CREATE_OPERATION',
  UPDATE_OPERATION: 'operation/UPDATE_OPERATION',
  DELETE_OPERATION: 'operation/DELETE_OPERATION',
  RESET: 'operation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOperation>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type OperationState = Readonly<typeof initialState>;

// Reducer

export default (state: OperationState = initialState, action): OperationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OPERATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OPERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_OPERATION):
    case REQUEST(ACTION_TYPES.UPDATE_OPERATION):
    case REQUEST(ACTION_TYPES.DELETE_OPERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_OPERATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OPERATION):
    case FAILURE(ACTION_TYPES.CREATE_OPERATION):
    case FAILURE(ACTION_TYPES.UPDATE_OPERATION):
    case FAILURE(ACTION_TYPES.DELETE_OPERATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_OPERATION_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_OPERATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_OPERATION):
    case SUCCESS(ACTION_TYPES.UPDATE_OPERATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_OPERATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/operations';

// Actions

export const getEntities: ICrudGetAllAction<IOperation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_OPERATION_LIST,
    payload: axios.get<IOperation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IOperation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OPERATION,
    payload: axios.get<IOperation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOperation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OPERATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IOperation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OPERATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOperation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OPERATION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
