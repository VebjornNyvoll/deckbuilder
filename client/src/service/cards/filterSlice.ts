import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface FilterActionPayload {
    field: string;
    values: Array<string>;
  }
  interface FilterState {
    [key: string]: Array<string>;
  }
  
  const initialState: FilterState = {};
  
  export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<FilterActionPayload>) => {
            const { field, values } = action.payload;
            // Filter out duplicates before updating the state
            state[field] = Array.from(new Set([...(state[field] || []), ...values]));
            },
      removeFilter: (state, action: PayloadAction<FilterActionPayload>) => {
        const { field, values } = action.payload;
        state[field] = state[field].filter((value) => !values.includes(value));
        if (state[field].length === 0) {
          delete state[field];
        }
      },
      clearFilters: (state) => {
        Object.keys(state).forEach((key) => {
          delete state[key];
        });
      },
    },
  });

  // Add filter and remove filter are the two actions that will be used to update the state
  // clearFilters is used to reset the state
  // A typical action creator would look like this:
  // dispatch({ type: "filters/addFilter", payload: {field: "name", values: ["Voidwalker"]} })
  // The above action can be dispatched from any component that has access to the store by using the useAppDispatch hook from hooks.ts (see Navbar.tsx for an example)
  // Similarly, the state can be accessed from any component by using the useAppSelector hook from hooks.ts (see Navbar.tsx for an example)
  
  export const { addFilter, removeFilter, clearFilters } = filterSlice.actions;
  
  export const selectFilters = (state: RootState) => state.filters;
  
  export default filterSlice.reducer;