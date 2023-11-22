import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../../components/CardItem';

interface DataSaverState {
  datasaver: boolean;
}

const initialState: DataSaverState = {
  datasaver: false,
};

const dataSaverSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setDataSaver: (state, action: PayloadAction<boolean>) => {
      state.datasaver = action.payload;
    },
  },
});

export const { setDataSaver } = dataSaverSlice.actions;
export default dataSaverSlice.reducer;
