import { configureStore } from "@reduxjs/toolkit";
import filterSliceReducer from "./cards/filterSlice";
import sortSliceReducer from "./cards/sortSlice";
import cardsSliceReducer from "./cards/cardsSlice";

export const store = configureStore({
    reducer: {
        filters: filterSliceReducer,
        sort: sortSliceReducer,
        cards: cardsSliceReducer,}
    },
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;