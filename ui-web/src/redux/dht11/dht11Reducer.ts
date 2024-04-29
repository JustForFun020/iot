import { DHT11Props } from '@/model/dht11';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDHT11 } from './dht11Action';

interface initState {
  loading: boolean;
  dht11: [];
  error: string;
}

const initialState: initState = {
  loading: false,
  dht11: [],
  error: '',
};

const reducer = createSlice({
  name: 'dht11Reducer',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDHT11.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.dht11 = [];
      })
      .addCase(fetchDHT11.fulfilled, (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.dht11 = action.payload), (state.error = '');
      })
      .addCase(fetchDHT11.rejected, (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.error = action.payload), (state.dht11 = []);
      });
  },
});

const dht11Reducer = reducer.reducer;

export default dht11Reducer;
