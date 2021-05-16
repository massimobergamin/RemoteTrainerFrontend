import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postUser = createAsyncThunk(
  'client/postUserStatus',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('https://remotetrainerserver.herokuapp.com/users', userData);
      return response.data;
    }
    catch (err) {
      console.log(err)
    }
  }
)

export const updateUser = createAsyncThunk(
  'client/updateUserStatus',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.put('https://remotetrainerserver.herokuapp.com/users', userData);
      return response.data;
    } catch (err) {
      console.log(err)
    }
  }
)

export const getUser = createAsyncThunk(
  'client/getUserStatus',
  async (uid, thunkAPI) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/${uid}-client`);
      return response.data;
    } catch (err) {
      console.log(err)
    }
  }
)

export const getSessionsClient = createAsyncThunk(
  'client/getSessionsStatus',
  async (uid, thunkAPI) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/sessions/client-${uid}`);
      return response.data;
    } catch (err) {
      console.log(err)
    }
  }
)

export const getSession = createAsyncThunk(
  'client/getSessionStatus',
  async (meetingId, thunkAPI) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/sessions/client-${meetingId}`);
      return response.data;
    } catch (err) {
      console.log(err)
    }
  }
)

export const getClientPlans = createAsyncThunk(
  'client/getClientPlansStatus',
  async ({ uid, startDate }, thunkAPI) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/plans/${uid}-${startDate}`);
      return response.data;
    } catch (err) {
      console.log(err)
    }
  }
)

export const addPlanNotes = createAsyncThunk(
  'client/addPlanNotesStatus',
  async ({ planId, notes }, thunkAPI) => {
    try {
      const response = await axios.put(`https://remotetrainerserver.herokuapp.com/plans/notes/${planId}`, notes);
      return response.data;
    } catch (err) {
      console.log(err)
    }
  }
)

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    user: {
      id: '',
      user_uid: '',
      username: '',
      type: '',
      profile_picture: '',
      email: '',
      last_login: 0,
      first_name: '',
      last_name: '',
      username: '',
      sex: '',
      weight: 0,
      height: 0,
      birthday: 0,
    },
    trainerInfo: {},
    sessions: [],
    singleSession: {},
    plans: []
  },
  // reducers: {

  // },
  extraReducers: {
    [postUser.fulfilled] : (state, action) => {
      state.user = action.payload;
    },
    [updateUser.fulfilled] : (state, action) => {
      state.user = action.payload;
    },
    [getUser.fulfilled] : (state, action) => {
      state.plans = action.payload.plans;
      delete action.payload.plans;
      state.trainerInfo = action.payload.trainerInfo;
      delete action.payload.trainerInfo;
      state.user = action.payload;
    },
    [getSessionsClient.fulfilled] : (state, action) => {
      state.sessions = action.payload;
    },
    [getSession.fulfilled] : (state, action) => {
      state.singleSession = action.payload;
    },
    [getClientPlans.fulfilled] : (state, action) => {
      state.plans = action.payload;
    },
    [addPlanNotes.fulfilled] : (state, action) => {
      let planIndex = state.plans.findIndex(plan => plan.id === action.payload.id);
      state.plans[planIndex] = action.payload;
    },
  }
});

// export const { /* TODO: generate action creators for client reducers above*/} = clientSlice.actions;

export default clientSlice.reducer;