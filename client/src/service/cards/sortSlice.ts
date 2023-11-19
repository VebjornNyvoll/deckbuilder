import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

enum SortOrder {
    ASC = 1,
    DESC = -1
}

interface SortActionPayload {
    field: string;
    order: SortOrder;
}

interface SortState {
    field: string;
    order: SortOrder;
}

const initialState: SortState = { field: 'name', order: SortOrder.ASC };

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