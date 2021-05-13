import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

//user routes
export const postUser = createAsyncThunk(
    'trainer/postUserStatus',
 async (userData) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/users`, userData);
      console.log("post res ", response)
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);
//added for invite code
export const postInviteCode = createAsyncThunk(
  'trainer/postInviteCodeStatus',
  async (inviteState) => {
    try {
      console.log("inviteState ", inviteState)
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/users/invite/${inviteState.user_uid}`, inviteState);
      console.log("responseInvite, ", response)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'trainer/postTrainerStatus',
  async (uid, userData) => {
    try {
      
      const response = await axios.put(`https://remotetrainerserver.herokuapp.com/users/${uid}`, userData);
      
      return response.data;
    } catch (error) {
      //console.log(error)
    }
  }
);

export const getUserById = createAsyncThunk(
  'trainer/fetchUserStatus',
  async (uid) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${uid}-trainer`);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const postClient = createAsyncThunk(
  'trainer/postClientStatus',
  async (trainer_uid, client_uid) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}-${client_uid}`);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

//session routes
export const postSession = createAsyncThunk(
  'trainer/postSessionStatus',
  async (trainer_uid, client_uid, sessionData) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}-${client_uid}`, sessionData);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const updateSession = createAsyncThunk(
  'trainer/updateSessionsStatus',
  async (meeting_id) => {
    try {
      const response = await axios.put(`https://remotetrainerserver.herokuapp.com/${meeting_id}`);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);
//not sure what to do with this one, there are 2 get session routes
export const getSessions = createAsyncThunk(
  'trainer/getSessionsStatus',
  async (meeting_id, sessionData) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${meeting_id}`, sessionData);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

//plans routes
export const postPlan = createAsyncThunk(
  'trainer/postPlanStatus',
  async (trainer_uid, client_uid, planData) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}-${client_uid}`, planData);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const updatePlan = createAsyncThunk(
  'trainer/updatePlanStatus',
  async (plan_id, planData) => {
    try {
      const response = await axios.put(`https://remotetrainerserver.herokuapp.com/${plan_id}`, planData);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const getPlan = createAsyncThunk(
  'trainer/getPlanStatus',
  async (client_uid, start_date) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${client_uid}-${start_date}`);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const updatePlanNotes = createAsyncThunk(
  'trainer/updatePlanNotesStatus',
  async (plan_id, planData) => {
    try {
      const response = await axios.put(`https://remotetrainerserver.herokuapp.com/${plan_id}`, planData);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

//Workouts & Exercises
export const getWorkout = createAsyncThunk(
  'trainer/getWorkoutStatus',
  async (trainer_uid) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${trainer_uid}`);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const postWorkout = createAsyncThunk(
  'trainer/postWorkoutStatus',
  async (trainer_uid, workoutData) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}`, workoutData);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const getExercise = createAsyncThunk(
  'trainer/getExerciseStatus',
  async (trainer_uid) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${trainer_uid}`);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const postExercise = createAsyncThunk(
  'trainer/postExerciseStatus',
  async (trainer_uid, exerciseData) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}`, exerciseData);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState: {
    user: {
      user_uid: "",
      username: "",
      email: "",
      last_login: Date.now(),
      first_name: "",
      last_name: "",
      profile_picture: "",
      sex: "",
      weight: 0,
      height: 0,
      birthday: Date.now(),
      invite_code: ""
    },
    exercises: [],
    workouts: [],
    clients: [],
    sessions: [],
    plans: []
  },
  reducers: {
    createUser: (state, action) => {
      state = action.payload
    }
  },
  extraReducers: {
    [postUser.fulfilled] : (state, action) => {
      state.user = action.payload
    },
    [postInviteCode.fulfilled] : (state, action) => {
      state.user.invite_code = action.payload
    },
    [updateUser.fulfilled] : (state, action) => {
      state.user = action.payload
    },
    [getUserById.fulfilled] : (state, action) => {
      state.user = action.payload
    },
    [postClient.fulfilled] : (state, action) => {
      state.clients = [...action.payload]
    },
    [postSession.fulfilled] : (state, action) => {
      state.sessions = [...action.payload]
    },
    //how are we updating the state of a particular session in 
    //the array if there are multiple sessions?
    [updateSession.fulfilled] : (state, action) => {
      state.sessions = [...action.payload]
    },
    [getSessions.fulfilled] : (state, action) => {
      state.sessions = [action.payload]
    },
    [postPlan.fulfilled] : (state, action) => {
      state.plans = [...action.payload]
    },
    //how will this update particular plan?
    [updatePlan.fulfilled] : (state, action) => {
      state.plans = [...action.payload]
    },
    [getPlan.fulfilled] : (state, action) => {
      state.plans = action.payload
    },
    //how will this update particular plan?
    [updatePlanNotes.fulfilled] : (state, action) => {
      state.plans = [...action.payload]
    },
    [getWorkout.fulfilled] : (state, action) => {
      state.workouts = action.payload
    },
    [postWorkout.fulfilled] : (state, action) => {
      state.workouts = [...action.payload]
    },
    [getExercise.fulfilled] : (state, action) => {
      state.exercises = action.payload
    },
    [postExercise.fulfilled] : (state, action) => {
      state.exercises = [...action.payload]
    },
  }
});

export default trainerSlice.reducer;

//ACTIONS
/*
Register Trainer
Modify User (profile info)
Create Exercise
Create Workout
Create Plan
Modify Plan
Create Session
Modify Session
*/

