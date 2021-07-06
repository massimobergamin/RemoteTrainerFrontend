import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postUser = createAsyncThunk(
  'client/postUserStatus',
  async (userData, thunkAPI) => {
    try {
      console.log('POSTING', userData);
      const response = await axios.post('https://remotetrainerserver.herokuapp.com/users', userData);
      console.log("RESPONSE DATA:", response.data)
      return response.data;
    }
    catch (err) {
      console.error(err)
    }
  }
)

export const updateUser = createAsyncThunk(
  'client/updateUserStatus',
  async ({uid, userData}) => {
    try {
      const response = await axios.put(`https://remotetrainerserver.herokuapp.com/users/${uid}`, userData);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  }
)

export const getUser = createAsyncThunk(
  'client/getUserStatus',
  async (uid) => {
    try {
      console.log('getUser input: ', uid);
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/${uid}-client`);
      console.log('getUser response: ', response.data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  }
)

export const getSessionsClient = createAsyncThunk(
  'client/getSessionsStatus',
  async (uid, thunkAPI) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/sessions/client-${uid}`);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  }
)

export const getSessionsFiltered = createAsyncThunk(
  'client/getSessionsFilteredStatus',
  async ({type, uid}) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/sessions/filtered/${uid}/${type}`);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  }
)

export const getSession = createAsyncThunk(
  'client/getSessionStatus',
  async (meetingId, thunkAPI) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/sessions/${meetingId}`);
      return response.data;
    } catch (err) {
      console.log(err)
    }
  }
)

export const deleteClientSession = createAsyncThunk(
  'trainer/deleteClientSessionStatus',
  async ({meeting_id, uid}) => {
    try {
      const response = await axios.delete(`https://remotetrainerserver.herokuapp.com/users/sessions/${meeting_id}/${uid}/client`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getClientPlans = createAsyncThunk(
  'client/getClientPlansStatus',
  async ({ uid, startDate }, thunkAPI) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/plans/${uid}-${startDate}`);
      return response.data;
    } catch (err) {
      console.error(err)
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
      console.error(err)
    }
  }
)

export const getTrainerByCode = createAsyncThunk(
  'client/getTrainerByCodeStatus',
  async (code, thunkAPI) => {
    try {
      console.log('redux code: ', code);
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/client/invite/${code}`);
      console.log('Redux/getTrainerByCode: ', response.data);

      if (response.data) {
        const trainer = await axios.get(`https://remotetrainerserver.herokuapp.com/users/${response.data.trainer_uid}-trainer`);
        console.log('Redux/getTrainerByCode trainer: ', trainer);
        return trainer;
      }
    } catch (err) {
      console.log(err);
    }
  }
)

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    user: {
      // user_uid: '',
      // username: '',
      // email: '',
      // last_login: 0,
      // first_name: '',
      // last_name: '',
      // profile_picture: '',
      // sex: '',
      // weight: 0,
      // height: 0,
      // birthday: 0,
    },
    trainerInfo: {},
    sessions: [],
    filteredSessions: [],
    singleSession: {},
    plans: [],
  },
  // reducers: {

  // },
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
      console.log('action.payload', action.payload);
      state.plans = action.payload.plans;
      delete action.payload.plans;
      state.trainerInfo = action.payload.trainerInfo;
      delete action.payload.trainerInfo;

      state.user = action.payload;
      console.log('state.user', state.user);
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

// export const { /* TODO: generate action creators for client reducers above*/} = clientSlice.actions;

export default clientSlice.reducer;