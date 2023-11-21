import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../components/CardItem";

interface CardsState {
  cards: Card[];
}

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    addCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = [...state.cards, ...action.payload];
    },
  },
});

export const { setCards, addCards } = cardsSlice.actions;
export default cardsSlice.reducer;
