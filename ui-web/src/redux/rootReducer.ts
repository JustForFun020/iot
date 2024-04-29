import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './weather/weatherReducer';
import controlReducer from './control/reducer';
import dht11Reducer from './dht11/dht11Reducer';
import historyReducer from './history/historyReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  controlReducer: controlReducer,
  dht11Reducer: dht11Reducer,
  historyReducer: historyReducer,
});

export default rootReducer;
