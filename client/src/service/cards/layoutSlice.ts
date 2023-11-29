import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// layout can either be "grid" or "list" so let's create a type for that
type layout = 'grid' | 'list';

interface LayoutState {
  layout: layout;
}

const initialState: LayoutState = { layout: 'grid' };

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    switchLayout: (state) => {
      state.layout = state.layout === 'grid' ? 'list' : 'grid';
    },
  },
});

export const { switchLayout } = layoutSlice.actions;

export const selectLayout = (state: RootState) => state.layout;

export default layoutSlice.reducer;
