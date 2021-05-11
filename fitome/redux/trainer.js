// import { createSlice } from '@reduxjs/toolkit'
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

// export const fetchTrainerById = createAsyncThunk({
//   'trainerSlice/fetByIdStatus',
//   async (trainerId, thinkAPI) => {
//     const response = await axios.get('')
//     return response.data
//   }
// })

// export const trainerSlice = createSlice({
//   name: 'trainer',
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
//     /* TODO: define trainer reducers */
//   },
//   extraReducers: {
//     [fetchTrainerById.fulfilled] : (state, action) => {}
//   }
// });

// export const { /* TODO: generate action creators for trainer reducers above*/} = trainerSlice.actions;

// export default trainerSlice.reducer;

