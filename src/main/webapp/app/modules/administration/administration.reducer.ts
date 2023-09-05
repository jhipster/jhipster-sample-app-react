import axios from 'axios';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';

import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { AppThunk } from 'app/config/store';

const initialState = {
  loading: false,
  errorMessage: null,
  logs: {
    loggers: [] as any[],
  },
  health: {} as any,
  metrics: {} as any,
  threadDump: [],
  configuration: {
    configProps: {} as any,
    env: {} as any,
  },
  totalItems: 0,
};

export type AdministrationState = Readonly<typeof initialState>;

// Actions

export const getSystemHealth = createAsyncThunk('administration/fetch_health', async () => axios.get<any>('management/health'), {
  serializeError: serializeAxiosError,
});

export const getSystemMetrics = createAsyncThunk('administration/fetch_metrics', async () => axios.get<any>('management/jhimetrics'), {
  serializeError: serializeAxiosError,
});

export const getSystemThreadDump = createAsyncThunk(
  'administration/fetch_thread_dump',
  async () => axios.get<any>('management/threaddump'),
  {
    serializeError: serializeAxiosError,
  },
);

export const getLoggers = createAsyncThunk('administration/fetch_logs', async () => axios.get<any>('management/loggers'), {
  serializeError: serializeAxiosError,
});

export const setLoggers = createAsyncThunk(
  'administration/fetch_logs_change_level',
  async ({ name, configuredLevel }: any) => axios.post(`management/loggers/${name}`, { configuredLevel }),
  {
    serializeError: serializeAxiosError,
  },
);

export const changeLogLevel: (name, configuredLevel) => AppThunk = (name, configuredLevel) => async dispatch => {
  await dispatch(setLoggers({ name, configuredLevel }));
  dispatch(getLoggers());
};

export const getConfigurations = createAsyncThunk(
  'administration/fetch_configurations',
  async () => axios.get<any>('management/configprops'),
  {
    serializeError: serializeAxiosError,
  },
);

export const getEnv = createAsyncThunk('administration/fetch_env', async () => axios.get<any>('management/env'), {
  serializeError: serializeAxiosError,
});

export const AdministrationSlice = createSlice({
  name: 'administration',
  initialState: initialState as AdministrationState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSystemHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.health = action.payload.data;
      })
      .addCase(getSystemMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload.data;
      })
      .addCase(getSystemThreadDump.fulfilled, (state, action) => {
        state.loading = false;
        state.threadDump = action.payload.data;
      })
      .addCase(getLoggers.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = {
          loggers: action.payload.data.loggers,
        };
      })
      .addCase(getConfigurations.fulfilled, (state, action) => {
        state.loading = false;
        state.configuration = {
          ...state.configuration,
          configProps: action.payload.data,
        };
      })
      .addCase(getEnv.fulfilled, (state, action) => {
        state.loading = false;
        state.configuration = {
          ...state.configuration,
          env: action.payload.data,
        };
      })
      .addMatcher(isPending(getSystemHealth, getSystemMetrics, getSystemThreadDump, getLoggers, getConfigurations, getEnv), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(
        isRejected(getSystemHealth, getSystemMetrics, getSystemThreadDump, getLoggers, getConfigurations, getEnv),
        (state, action) => {
          state.errorMessage = action.error.message;
          state.loading = false;
        },
      );
  },
});

// Reducer
export default AdministrationSlice.reducer;
