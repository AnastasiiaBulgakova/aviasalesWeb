import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
  sortBy: 'cheap' | 'fast' | 'optimal';
}

const initialState: SortState = {
  sortBy: 'cheap',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<'cheap' | 'fast' | 'optimal'>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortSlice.actions;
export default sortSlice.reducer;
