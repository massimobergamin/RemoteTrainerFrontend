import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://fitome.herokuapp.com';

export const postUser = createAsyncThunk(
  'client/postUserStatus',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/users`, userData);
      return response.data;
    }
    catch (err) {
      console.error(err)
    }
  }
)

export const updateUser = createAsyncThunk(
  'client/updateUserStatus',
  async ({ uid, userData }) => {
    try {
      const response = await axios.put(`${URL}/users/${uid}`, userData);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
)

export const getUser = createAsyncThunk(
  'client/getUserStatus',
  async (uid) => {
    try {
      const response = await axios.get(`${URL}/users/${uid}-client`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
)

export const getSessionsClient = createAsyncThunk(
  'client/getSessionsStatus',
  async (uid, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/users/sessions/client-${uid}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
)

export const getSessionsFiltered = createAsyncThunk(
  'client/getSessionsFilteredStatus',
  async ({ type, uid }) => {
    try {
      const response = await axios.get(`${URL}/users/sessions/filtered/${uid}/${type}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
)

export const getSession = createAsyncThunk(
  'client/getSessionStatus',
  async (meetingId, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/users/sessions/${meetingId}`);
      return response.data;
    } catch (err) {
      console.log('An error has occurred.');
    }
  }
)

export const deleteClientSession = createAsyncThunk(
  'trainer/deleteClientSessionStatus',
  async ({ meeting_id, uid }) => {
    try {
      const response = await axios.delete(`${URL}/users/sessions/${meeting_id}/${uid}/client`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const getClientPlans = createAsyncThunk(
  'client/getClientPlansStatus',
  async ({ uid, startDate }, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/plans/${uid}-${startDate}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
)

export const addPlanNotes = createAsyncThunk(
  'client/addPlanNotesStatus',
  async ({ planId, notes }, thunkAPI) => {
    try {
      const response = await axios.put(`${URL}/plans/notes/${planId}`, notes);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
)

export const getTrainerByCode = createAsyncThunk(
  'client/getTrainerByCodeStatus',
  async (code, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/users/client/invite/${code}`);
      if (response.data) {
        const trainer = await axios.get(`${URL}/users/${response.data.trainer_uid}-trainer`);
        return trainer;
      }
    } catch (err) {
      console.log('An error has occurred.');
    }
  }
)

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    user: {},
    trainerInfo: {},
    sessions: [],
    filteredSessions: [],
    singleSession: {},
    plans: [],
  },
  extraReducers: {
    [postUser.fulfilled] : (state, action) => {
       if (action.payload) state.user = action.payload;
    },
    [updateUser.fulfilled] : (state, action) => {
      if (action.payload) state.user = action.payload;
    },
    [getUser.fulfilled] : (state, action) => {
      state.sessions = action.payload.sessions;
      delete action.payload.sessions;
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
    [deleteClientSession.fulfilled] : (state, action) => {
      state.sessions = action.payload;
    },
    [getClientPlans.fulfilled] : (state, action) => {
      state.plans = action.payload;
    },
    [addPlanNotes.fulfilled] : (state, action) => {
      let planIndex = state.plans.findIndex(plan => plan.id === action.payload.id);
      state.plans[planIndex] = action.payload;
    },
    [getTrainerByCode.fulfilled] : (state, action) => {
      state.trainerInfo = action.payload.trainerInfo;
    },
    [getSessionsFiltered.fulfilled] : (state, action) => {
      state.filteredSessions = action.payload;
    }
  }
});

export default clientSlice.reducer;