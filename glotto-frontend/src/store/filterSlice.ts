import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchYear: string;
}

const initialState: FilterState = { searchYear: '' };

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchYear: (state, action: PayloadAction<string>) => {
      state.searchYear = action.payload;
    },
    resetFilters: (state) => {
      state.searchYear = '';
    },
  },
});

export const { setSearchYear, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
