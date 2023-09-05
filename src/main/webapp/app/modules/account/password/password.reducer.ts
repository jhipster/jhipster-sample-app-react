import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  successMessage: null,
  updateSuccess: false,
  updateFailure: false,
};

export type PasswordState = Readonly<typeof initialState>;

const apiUrl = 'api/account';

interface IPassword {
  currentPassword: string;
  newPassword: string;
}

// Actions

export const savePassword = createAsyncThunk(
  'password/update_password',
  async (password: IPassword) => axios.post(`${apiUrl}/change-password`, password),
  { serializeError: serializeAxiosError },
);

export const PasswordSlice = createSlice({
  name: 'password',
  initialState: initialState as PasswordState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(savePassword.pending, state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addCase(savePassword.rejected, state => {
        state.loading = false;
        state.updateSuccess = false;
        state.updateFailure = true;
        state.errorMessage = 'password.messages.error';
      })
      .addCase(savePassword.fulfilled, state => {
        state.loading = false;
        state.updateSuccess = true;
        state.updateFailure = false;
        state.successMessage = 'password.messages.success';
      });
  },
});

export const { reset } = PasswordSlice.actions;

// Reducer
export default PasswordSlice.reducer;
