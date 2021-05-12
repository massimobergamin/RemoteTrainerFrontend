import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
//user routes
export const postUser = createAsyncThunk(
  'users/postTrainerStatus',
  async (userData, thunkAPI) => {
    const response = await axios.post(`https://remotetrainerserver.herokuapp.com/users`, userData);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'users/postTrainerStatus',
  async (uid, userData, thunkAPI) => {
    const response = await axios.put(`https://remotetrainerserver.herokuapp.com/users/${uid}`, userData);
    return response.data;
  }
);

export const getUserById = createAsyncThunk(
  'users/fetchUserStatus',
  async (uid, thunkAPI) => {
    const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${uid}-trainer`);
    return response.data;
  }
);

export const postClient = createAsyncThunk(
  'users/postClientStatus',
  async (trainer_uid, client_uid, thunkAPI) => {
    const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}-${client_uid}`);
    return response.data;
  }
);

//session routes
export const postSession = createAsyncThunk(
  'users/postSessionStatus',
  async (trainer_uid, client_uid, sessionData, thunkAPI) => {
    const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}-${client_uid}`, sessionData);
    return response.data;
  }
);

export const updateSession = createAsyncThunk(
  'users/updateSessionsStatus',
  async (meeting_id, thunkAPI) => {
    const response = await axios.put(`https://remotetrainerserver.herokuapp.com/${meeting_id}`);
    return response.data;
  }
);
//not sure what to do with this one, there are 2 get session routes
export const getSessions = createAsyncThunk(
  'users/getSessionsStatus',
  async (meeting_id, sessionData, thunkAPI) => {
    const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${meeting_id}`, sessionData);
    return response.data;
  }
);

//plans routes
export const postPlan = createAsyncThunk(
  'plans/postPlanStatus',
  async (trainer_uid, client_uid, planData, thunkAPI) => {
    const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}-${client_uid}`, planData);
    return response.data;
  }
);

export const updatePlan = createAsyncThunk(
  'plans/updatePlanStatus',
  async (plan_id, planData, thunkAPI) => {
    const response = await axios.put(`https://remotetrainerserver.herokuapp.com/${plan_id}`, planData);
    return response.data;
  }
);

export const getPlan = createAsyncThunk(
  'plans/getPlanStatus',
  async (client_uid, start_date, thunkAPI) => {
    const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${client_uid}-${start_date}`);
    return response.data;
  }
);

export const updatePlanNotes = createAsyncThunk(
  'plans/updatePlanNotesStatus',
  async (plan_id, planData, thunkAPI) => {
    const response = await axios.put(`https://remotetrainerserver.herokuapp.com/${plan_id}`, planData);
    return response.data;
  }
);

//Workouts & Exercises
export const getWorkout = createAsyncThunk(
  'workouts/getWorkoutStatus',
  async (trainer_uid, thunkAPI) => {
    const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${trainer_uid}`);
    return response.data;
  }
);

export const postWorkout = createAsyncThunk(
  'workouts/postWorkoutStatus',
  async (trainer_uid, workoutData, thunkAPI) => {
    const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}`, workoutData);
    return response.data;
  }
);

export const getExercise = createAsyncThunk(
  'exercises/getExerciseStatus',
  async (trainer_uid, thunkAPI) => {
    const response = await axios.get(`https://remotetrainerserver.herokuapp.com/${trainer_uid}`);
    return response.data;
  }
);

export const postExercise = createAsyncThunk(
  'exercises/postExerciseStatus',
  async (trainer_uid, exerciseData, thunkAPI) => {
    const response = await axios.post(`https://remotetrainerserver.herokuapp.com/${trainer_uid}`, exerciseData);
    return response.data;
  }
);

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState: {
    uid: "",
    username: "",
    profile_picture: "",
    email: "",
    last_login: Date.now,
    firstName: "",
    lastName: "",
    sex: "",
    weight: 0,
    height: 0,
    birthday: Date.now,
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
    [updateUser.fulfilled] : (state, action) => {
      state.user = action.payload
    },
    [getUserById.fulfilled] : (state, action) => {
      state.user = action.payload
    },
    [postClient.fulfilled] : (state, action) => {
      state.clients = {...action.payload}
    },
    [postSession.fulfilled] : (state, action) => {
      state.sessons = {...action.payload}
    },
    //how are we updating the state of a particular session in 
    //the array if there are multiple sessions?
    [updateSession.fulfilled] : (state, action) => {
      state.sessons = {...action.payload}
    },
    [getSessions.fulfilled] : (state, action) => {
      state.sessons = action.payload
    },
    [postPlan.fulfilled] : (state, action) => {
      state.plans = {...action.payload}
    },
    //how will this update particular plan?
    [updatePlan.fulfilled] : (state, action) => {
      state.plans = {...action.payload}
    },
    [getPlan.fulfilled] : (state, action) => {
      state.plans = action.payload
    },
    //how will this update particular plan?
    [updatePlanNotes.fulfilled] : (state, action) => {
      state.plans = {...action.payload}
    },
    [getWorkout.fulfilled] : (state, action) => {
      state.workouts = action.payload
    },
    [postWorkout.fulfilled] : (state, action) => {
      state.workouts = {...action.payload}
    },
    [getExercise.fulfilled] : (state, action) => {
      state.exercises = action.payload
    },
    [postExercise.fulfilled] : (state, action) => {
      state.exercises = {...action.payload}
    },
  }
});



//export const { postUser, updateUser, getUserById, postClient, postSession, updateSession, getSessions, postPlan, updatePlan, getPlan, updatePlanNotes, getWorkout, postWorkout, getExercise, postExercise} = trainerSlice.actions;

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

