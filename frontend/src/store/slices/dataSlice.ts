import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RecordData } from '../../models/types';
import { fetchData } from '../../services/api';
import { DataState, LoadDataParams } from '../../models/DataState';

// Асинхронное действие для загрузки данных
export const loadData = createAsyncThunk<RecordData[], LoadDataParams>(
    'data/loadData',
    async ({ region, errors, seed, page }) => {
      const data = await fetchData(region, errors, seed, page);
      return data;
    }
  );

const initialState: DataState = {
  region: 'US',
  errors: 0,
  seed: '0',
  page: 1,
  data: [],
  loading: false,
  hasMore: true,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<string>) {
      state.region = action.payload;
      state.page = 1;
      state.data = [];
      state.hasMore = true;
    },
    setErrors(state, action: PayloadAction<number>) {
      state.errors = action.payload;
      state.page = 1;
      state.data = [];
      state.hasMore = true;
    },
    setSeed(state, action: PayloadAction<string>) {
      state.seed = action.payload;
      state.page = 1;
      state.data = [];
      state.hasMore = true;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadData.fulfilled, (state, action: PayloadAction<RecordData[]>) => {
        state.loading = false;
        state.data = state.page === 1 ? action.payload : [...state.data, ...action.payload];
        state.hasMore = action.payload.length > 0;
      })
      .addCase(loadData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setRegion, setErrors, setSeed, setPage } = dataSlice.actions;
export default dataSlice.reducer;
