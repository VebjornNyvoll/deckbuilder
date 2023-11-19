import { configureStore } from "@reduxjs/toolkit";
import filterSliceReducer from "./cards/filterSlice";
import sortSliceReducer from "./cards/sortSlice";

export const store = configureStore({
    reducer: {filters: filterSliceReducer,
              sort: sortSliceReducer}
    },
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;