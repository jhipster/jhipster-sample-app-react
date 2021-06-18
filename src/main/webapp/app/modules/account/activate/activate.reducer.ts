import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  activationSuccess: false,
  activationFailure: false,
};

export type ActivateState = Readonly<typeof initialState>;

// Actions

export const activateAction = createAsyncThunk('activate/activate_account', async (key: string) => axios.get(`api/activate?key=${key}`), {
  serializeError: serializeAxiosError,
});

export const ActivateSlice = createSlice({
  name: 'activate',
  initialState: initialState as ActivateState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(activateAction.pending, () => initialState)
      .addCase(activateAction.rejected, state => {
        state.activationFailure = true;
      })
      .addCase(activateAction.fulfilled, state => {
        state.activationSuccess = true;
      });
  },
});

export const { reset } = ActivateSlice.actions;

// Reducer
export default ActivateSlice.reducer;
