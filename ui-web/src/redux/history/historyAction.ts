import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHistory = createAsyncThunk('history/fetchHistory', async (param: string) => {
  try {
    const res = await axios.get<[]>(`${process.env.API_URL}/${param}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const countHistory = createAsyncThunk('history/countHistory', async (param: string) => {
  try {
    const res = await axios.get<[]>(`${process.env.API_URL}/${param}`);
    return res.data.length;
  } catch (error) {
    console.log(error);
    return [];
  }
});
