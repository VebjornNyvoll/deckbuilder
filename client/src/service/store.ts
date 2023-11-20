import { configureStore } from "@reduxjs/toolkit";
import filterSliceReducer from "./cards/filterSlice";
import darkModeSliceReducer from "./darkModeSlice";

export const store = configureStore({
    reducer: {filters: filterSliceReducer, darkMode: darkModeSliceReducer}
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;