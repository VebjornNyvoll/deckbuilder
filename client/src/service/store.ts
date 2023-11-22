import { configureStore } from "@reduxjs/toolkit";
import filterSliceReducer from "./cards/filterSlice";
import darkModeSliceReducer from "./darkModeSlice";
import sortSliceReducer from "./cards/sortSlice";
import cardsSliceReducer from "./cards/cardsSlice";
import layoutSliceReducer from "./cards/layoutSlice";
import dataSaverReducer from "./cards/dataSaverSlice";


export const store = configureStore({
    reducer: {
        filters: filterSliceReducer,
        sort: sortSliceReducer,
        cards: cardsSliceReducer,
        layout: layoutSliceReducer,
        datasaver: dataSaverReducer,
        darkMode: darkModeSliceReducer,
    }

    },
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;