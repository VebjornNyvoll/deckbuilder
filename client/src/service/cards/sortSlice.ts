import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

enum sortOrder {
    ASC = 1,
    DESC = -1
}

interface SortActionPayload {
    field: string;
    order: sortOrder;
}

interface SortState {
    field: string;
    order: sortOrder;
}

const initialState: SortState = { field: 'name', order: sortOrder.ASC };

export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        sort: (state, action: PayloadAction<SortActionPayload>) => {
            const { field, order } = action.payload;
            state.field = field;
            state.order = order;
        },
    },
});

export const { sort } = sortSlice.actions;

export const selectSort = (state: RootState) => state.sort;

export default sortSlice.reducer;