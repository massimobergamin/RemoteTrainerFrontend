import { createSlice } from '@reduxjs/toolkit'

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    value: '' /* TODO: define initialState */,
  },
  reducers: {
    /* TODO: define client reducers */
  },
});

export const { /* TODO: generate action creators for client reducers above*/} = clientSlice.actions;

export default clientSlice.reducer;

