import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWeather } from './weatherAction';

interface InitStateProps {
  loading: boolean;
  weather: any;
  error: string;
}

const initialState: InitStateProps = {
  loading: false,
  weather: [],
  error: '',
};

const weatherReducers = createSlice({
  name: 'weatherReducer',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.weather = action.payload), (state.error = '');
      })
      .addCase(fetchWeather.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const weatherReducer = weatherReducers.reducer;
export default weatherReducer;
