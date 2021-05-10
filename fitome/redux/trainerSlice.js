import { createSlice } from '@reduxjs/toolkit'

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState: {
    value: '' /* TODO: define initialState */,
  },
  reducers: {
    /* TODO: define trainer reducers */
  },
});

export const { /* TODO: generate action creators for trainer reducers above*/} = trainerSlice.actions;

export default trainerSlice.reducer;

