import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  all: boolean;
  noTransfers: boolean;
  oneTransfer: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
}

type FilterKey = keyof Omit<FiltersState, 'all'> | 'all';

const initialState: FiltersState = {
  all: false,
  noTransfers: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<FilterKey>) => {
      const filter = action.payload;
      state[filter] = !state[filter];

      if (filter !== 'all' && state.all && !state[filter]) {
        state.all = false;
      }

      const areAllSelected =
        state.noTransfers &&
        state.oneTransfer &&
        state.twoTransfers &&
        state.threeTransfers;

      if (areAllSelected) {
        state.all = true;
      }
    },
    toggleAll: (state) => {
      const newValue = !state.all;
      state.all = newValue;
      state.noTransfers = newValue;
      state.oneTransfer = newValue;
      state.twoTransfers = newValue;
      state.threeTransfers = newValue;
    },
  },
});

export const { toggleFilter, toggleAll } = filtersSlice.actions;
export default filtersSlice.reducer;
