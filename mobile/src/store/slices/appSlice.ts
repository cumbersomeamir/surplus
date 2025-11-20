import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  initialized: boolean;
  buildVersion: string;
};

const initialState: AppState = {
  initialized: false,
  buildVersion: '0.1.0',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
  },
});

export const { setInitialized } = appSlice.actions;
export const appReducer = appSlice.reducer;

