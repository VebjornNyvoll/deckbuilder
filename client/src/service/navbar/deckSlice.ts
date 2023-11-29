import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeckState {
  triggerShowDeckEvent: boolean;
}

const initialState: DeckState = {
  triggerShowDeckEvent: false,
};

const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    showDecks: (state, action: PayloadAction<boolean>) => {
      state.triggerShowDeckEvent = action.payload;
    },
  },
});

export const { showDecks } = deckSlice.actions;
export default deckSlice.reducer;
