import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILabel, defaultValue } from 'app/shared/model/label.model';

export const ACTION_TYPES = {
  FETCH_LABEL_LIST: 'label/FETCH_LABEL_LIST',
  FETCH_LABEL: 'label/FETCH_LABEL',
  CREATE_LABEL: 'label/CREATE_LABEL',
  UPDATE_LABEL: 'label/UPDATE_LABEL',
  DELETE_LABEL: 'label/DELETE_LABEL',
  RESET: 'label/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILabel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type LabelState = Readonly<typeof initialState>;

// Reducer

export default (state: LabelState = initialState, action): LabelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LABEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LABEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LABEL):
    case REQUEST(ACTION_TYPES.UPDATE_LABEL):
    case REQUEST(ACTION_TYPES.DELETE_LABEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LABEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LABEL):
    case FAILURE(ACTION_TYPES.CREATE_LABEL):
    case FAILURE(ACTION_TYPES.UPDATE_LABEL):
    case FAILURE(ACTION_TYPES.DELETE_LABEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LABEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LABEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LABEL):
    case SUCCESS(ACTION_TYPES.UPDATE_LABEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LABEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/labels';

// Actions

export const getEntities: ICrudGetAllAction<ILabel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LABEL_LIST,
  payload: axios.get<ILabel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ILabel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LABEL,
    payload: axios.get<ILabel>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILabel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LABEL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILabel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LABEL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILabel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LABEL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
