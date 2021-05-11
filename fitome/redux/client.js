// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

// export const fetchClientById = createAsyncThunk({
//   'clientSlice/fetByIdStatus',
//   async (clientId, thinkAPI) => {
//     const response = await axios.get('')
//     return response.data
//   }
// })


// export const clientSlice = createSlice({
//   name: 'client',
//   initialState: {
//     uid: "",
//     username: "",
//     profile_picture: "",
//     email: "",
//     last_login: Date.now,
//     firstName: "",
//     lastName: "",
//     username: "",
//     sex: "",
//     weight: 0,
//     height: 0,
//     birthday: Date.now,
//   },
//   reducers: {
//     /* TODO: define client reducers */
//   },
//   extraReducers: {
//     [fetchClientById.fulfilled] : (state, action) => {}
//   }
// });

// export const { /* TODO: generate action creators for client reducers above*/} = clientSlice.actions;

// export default clientSlice.reducer;

