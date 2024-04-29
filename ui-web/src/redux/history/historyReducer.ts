import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { countHistory, fetchHistory } from './historyAction';

interface initState {
  loading: boolean;
  history: [];
  count?: any;
  error: string;
}

const initialState: initState = {
  loading: false,
  history: [],
  count: 0,
  error: '',
};

const reducer = createSlice({
  name: 'historyReuducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        (state.loading = true), (state.history = []), (state.error = '');
      })
      .addCase(fetchHistory.fulfilled, (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.history = action.payload), (state.error = '');
      })
      .addCase(fetchHistory.rejected, (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.history = []), (state.error = action.payload);
      })
      .addCase(countHistory.pending, (state) => {
        (state.loading = true), (state.count = 0), (state.error = '');
      })
      .addCase(countHistory.fulfilled, (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.count = action.payload), (state.error = '');
      })
      .addCase(countHistory.rejected, (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.count = 0), (state.error = action.payload);
      });
  },
});

const historyReducer = reducer.reducer;

export default historyReducer;
