import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  initialized: boolean;
  buildVersion: string;
  username: string;
  isAuthenticated: boolean;
  selectedLocation: string;
};

const initialState: AppState = {
  initialized: false,
  buildVersion: '0.1.0',
  username: '',
  isAuthenticated: false,
  selectedLocation: 'Mumbai',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
    completeAuth(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.isAuthenticated = true;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.selectedLocation = action.payload;
    },
  },
});

export const { setInitialized, completeAuth, setLocation } = appSlice.actions;
export const appReducer = appSlice.reducer;

