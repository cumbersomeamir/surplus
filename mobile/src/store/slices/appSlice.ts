import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  initialized: boolean;
  buildVersion: string;
  email: string;
  isAuthenticated: boolean;
};

const initialState: AppState = {
  initialized: false,
  buildVersion: '0.1.0',
  email: '',
  isAuthenticated: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
    completeAuth(state, action: PayloadAction<string>) {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { setInitialized, completeAuth } = appSlice.actions;
export const appReducer = appSlice.reducer;

