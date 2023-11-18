import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Filters is already an array, let's just add objects with field and values
// interface FilterState {
//     field: string,
//     values: Array<string>
// }

// const initialState: Array<FilterState> = [{field: 'name', values: ['Rock']}]

// export const filterSlice = createSlice({
//     name: 'filters',
//     initialState,
//     reducers: {
//         addFilter: (state, action: PayloadAction<FilterState>) => {
//             state.push(action.payload)
//         },
//         removeFilter: (state, action: PayloadAction<FilterState>) => {
//             state = state.filter(filter => filter.field !== action.payload.field)
//         },
//         clearFilters: (state) => {
//             state = []
//         }
//     }
// })

// Let's store with name as key and values as array of strings
interface FilterActionPayload {
    field: string;
    values: Array<string>;
  }
  
  interface FilterState {
    [key: string]: Array<string>;
  }
  
  const initialState: FilterState = { name: ['Rock'] };
  
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
      },
      clearFilters: (state) => {
        Object.keys(state).forEach((key) => {
          delete state[key];
        });
      },
    },
  });
  
  export const { addFilter, removeFilter, clearFilters } = filterSlice.actions;
  
  export const selectFilters = (state: RootState) => state.filters;
  
  export default filterSlice.reducer;