import { DHT11Props } from '@/model/dht11';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDHT11 = createAsyncThunk('dht11/fetchDHT11', async (param: string) => {
  try {
    const res = await axios.get<[]>(`${process.env.API_URL}/${param}`);
    return res.data;
  } catch (error) {
    return [];
  }
});
