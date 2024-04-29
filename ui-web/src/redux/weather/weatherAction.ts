import _ from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Param {
  locations: string[];
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async ({ locations }: Param) => {
  try {
    const fetchWeather = _.map(locations, async (location) => {
      const res = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=a45891cb84e847a488e33925232208&q=${location}&days=1&aqi=no&alerts=no`,
      );
      return res.data;
    });
    const weatherData = await Promise.all(fetchWeather);
    return weatherData;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
});
