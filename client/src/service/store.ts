import { configureStore } from "@reduxjs/toolkit";
import filterSliceReducer from "./cards/filterSlice";

export const store = configureStore({
    reducer: {filters: filterSliceReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;