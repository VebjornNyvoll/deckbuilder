import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState: boolean = false;

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggle: (state) => {
      return !state;
    },
  },
});

export const { toggle } = darkModeSlice.actions;

export const selectDarkMode = (state: RootState) => state.darkMode;

export default darkModeSlice.reducer;
