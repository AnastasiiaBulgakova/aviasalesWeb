import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchIdState {
  searchId: string;
}

const initialState: SearchIdState = {
  searchId: '',
};

const idSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchId: (state, action: PayloadAction<string>) => {
      state.searchId = action.payload;
    },
  },
});

export const { setSearchId } = idSlice.actions;
export default idSlice.reducer;
