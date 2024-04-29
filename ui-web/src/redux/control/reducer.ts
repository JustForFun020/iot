import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ControlProps {
  ledState: boolean;
  fanState: boolean;
}

const initialState: ControlProps = {
  ledState: false,
  fanState: false,
};

const reducer = createSlice({
  name: 'control',
  initialState,
  reducers: {
    changeLedState: (state, action: PayloadAction<boolean>) => {
      state.ledState = action.payload;
    },
    changeFanState: (state, action: PayloadAction<boolean>) => {
      state.fanState = action.payload;
    },
  },
});

export const { changeLedState, changeFanState } = reducer.actions;

const controlReducer = reducer.reducer;
export default controlReducer;
