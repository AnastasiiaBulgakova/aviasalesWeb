import { createAsyncThunk } from '@reduxjs/toolkit';

interface SearchIdResponse {
  searchId: string;
}

export const getSearchId = createAsyncThunk<SearchIdResponse, void, { rejectValue: string }>(
  'searchIdSlice/getSearchId',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://aviasales-test-api.kata.academy/search');
      if (!response.ok) throw new Error('Не удалось получить searchId');
      const data: SearchIdResponse = await response.json();
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
