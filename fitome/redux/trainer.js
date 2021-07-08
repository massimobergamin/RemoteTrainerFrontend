import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://remotetrainerserver.herokuapp.com';

export const postUser = createAsyncThunk(
  'trainer/postUserStatus',
  async (userData) => {
    try {
      const response = await axios.post(`${URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const updateUser = createAsyncThunk(
  'trainer/updateUserStatus',
  async ({ uid, userData }) => {
    try {
      const response = await axios.put(`${URL}/users/${uid}`, userData);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const getUserById = createAsyncThunk(
  'trainer/getUserByIdStatus',
  async (uid) => {
    try {
      const response = await axios.get(`${URL}/users/${uid}-trainer`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const postClient = createAsyncThunk(
  'trainer/postClientStatus',
  async ({ trainer_uid, client_uid }) => {
    try {
      const response = await axios.post(`${URL}/clients/${trainer_uid}-${client_uid}`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const getClients= createAsyncThunk(
  'trainer/getClientsStatus',
  async (uid, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/clients/${uid}`);
      return response.data.sort((a,b) => (a.first_name + " " + a.last_name).localeCompare(b.first_name + " " + b.last_name));
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const postInviteCode = createAsyncThunk(
  'trainer/postInviteCodeStatus',
  async (inviteState) => {
    try {
      const response = await axios.post(`${URL}/users/invite/${inviteState.user_uid}`, inviteState);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const getInviteCode = createAsyncThunk(
  'trainer/getInviteCodeStatus',
  async (inviteState) => {
    try {
      const response = await axios.get(`${URL}/users/invite/${inviteState}`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const postSession = createAsyncThunk(
  'trainer/postSessionStatus',
  async ({ trainer_uid, client_uid, sessionData }) => {
    try {
      const response = await axios.post(`${URL}/users/sessions/${trainer_uid}-${client_uid}`, sessionData);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const deleteSession = createAsyncThunk (
  'trainer/deleteSessionStatus',
  async (meeting_id) => {
    try {
      const response = await axios.delete(`${URL}/users/sessions/${meeting_id}`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const updateSession = createAsyncThunk(
  'trainer/updateSessionsStatus',
  async (meeting_id) => {
    try {
      const response = await axios.put(`${URL}/users/sessions/${meeting_id}`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const getSessionsTrainer = createAsyncThunk(
  'trainer/getSessionsStatus',
  async (uid) => {
    try {
      const response = await axios.get(`${URL}/users/sessions/trainer-${uid}`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const getSession = createAsyncThunk(
  'trainer/getSessionStatus',
  async (meeting_id) => {
    try {
      const response = await axios.get(`${URL}/users/sessions/${meeting_id}`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const deleteTrainerSession = createAsyncThunk(
  'trainer/deleteTrainerSessionStatus',
  async ({ meeting_id, uid }) => {
    try {
      const response = await axios.delete(`${URL}/users/sessions/${meeting_id}/${uid}/trainer`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const postPlan = createAsyncThunk(
  'trainer/postPlanStatus',
  async (planData) => {
    try {
      const response = await axios.post(`${URL}/plans/${planData.trainer_uid}-${planData.client_uid}`, planData);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const updatePlan = createAsyncThunk(
  'trainer/updatePlanStatus',
  async ({ plan_id, planData }) => {
    try {
      const response = await axios.put(`${URL}/plans/${plan_id}`, planData);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const getPlan = createAsyncThunk(
  'trainer/getPlanStatus',
  async ({ client_uid, start_date }) => {
    try {
      const response = await axios.get(`${URL}/plans/${client_uid}-${start_date}`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const updatePlanNotes = createAsyncThunk(
  'trainer/updatePlanNotesStatus',
  async ({ plan_id, planData }) => {
    try {
      const response = await axios.put(`${URL}/plans/notes/${plan_id}`, planData);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const getWorkout = createAsyncThunk(
  'trainer/getWorkoutStatus',
  async (trainer_uid) => {
    try {
      const response = await axios.get(`${URL}/workouts/${trainer_uid}`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const getExercise = createAsyncThunk(
  'trainer/getExerciseStatus',
  async (trainer_uid) => {
    try {
      const response = await axios.get(`${URL}/exercises/${trainer_uid}`);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const postWorkout = createAsyncThunk(
  'trainer/postWorkoutStatus',
  async ({ trainer_uid, workoutData }) => {
    try {
      const response = await axios.post(`${URL}/workouts/${trainer_uid}`, workoutData);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const postExercise = createAsyncThunk(
  'trainer/postExerciseStatus',
  async ({ trainer_uid, exerciseData }) => {
    try {
      const response = await axios.post(`${URL}/exercises/custom/${trainer_uid}`, exerciseData);
      return response.data;
    } catch (error) {
      console.log('An error has occurred.');
    }
  }
);

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState: {
    user: {},
    invite_code: {},
    exercises: [],
    workouts: [],
    clients: [],
    sessions: [],
    singleSession: {},
    plans: [],
    selectedWorkout: {},
    selectedExercise: {},
    armExs: [],
    legExs: [],
    backExs: [],
    chestExs: [],
    coreExs: [],
    shoulderExs: [],
    miscExs: [],
    measurements: []
  },
  reducers: {
    setSelectedWorkout (state, action) {
      state.selectedWorkout = action.payload;
    },
    setSelectedExercise (state, action) {
      state.selectedExercise = action.payload;
    }
  },
  extraReducers: {
    [postUser.fulfilled] : (state, action) => {
      if (action.payload) state.user = action.payload;
    },
    [updateUser.fulfilled] : (state, action) => {
      if (action.payload) state.user = action.payload;
    },
    [getUserById.fulfilled] : (state, action) => {
      state.sessions = action.payload.sessions;
      delete action.payload.sessions;
      state.user = action.payload;
    },
    [postClient.fulfilled] : (state, action) => {
      state.clients.push(action.payload);
    },
    [getClients.fulfilled] : (state, action) => {
      state.clients = action.payload;
    },
    [postInviteCode.fulfilled] : (state, action) => {
      state.invite_code = action.payload;
    },
    [getInviteCode.fulfilled] : (state, action) => {
      state.invite_code = action.payload;
    },
    [postSession.fulfilled] : (state, action) => {
      state.sessions.push(action.payload);
    },
    [deleteTrainerSession.fulfilled] : (state, action) => {
      state.sessions = action.payload;
    },
    [updateSession.fulfilled] : (state, action) => {
      let sessionIndex = state.sessions.findIndex(session => session.id === action.payload.id);
      state.sessions[sessionIndex] = action.payload;
    },
    [getSessionsTrainer.fulfilled] : (state, action) => {
      state.sessions = action.payload;
    },
    [getSession.fulfilled] : (state, action) => {
      state.singleSession = action.payload;
    },
    [postPlan.fulfilled] : (state, action) => {
      state.plans.push(action.payload);
    },
    [updatePlan.fulfilled] : (state, action) => {
      let planIndex = state.plans.findIndex(plan => plan.id === action.payload.id);
      state.plans[planIndex] = action.payload;
    },
    [getPlan.fulfilled] : (state, action) => {
      state.plans = action.payload;
    },
    [updatePlanNotes.fulfilled] : (state, action) => {
      let planIndex = state.plans.findIndex(plan => plan.id === action.payload.id);
      state.plans[planIndex] = action.payload;
    },
    [getWorkout.fulfilled] : (state, action) => {
      state.workouts = action.payload;
    },
    [getExercise.fulfilled] : (state, action) => {
      state.exercises = action.payload;
      state.armExs = state.exercises.filter(exercise => exercise.muscle_group === 'arms' && exercise.type === 'custom');
      state.legExs = state.exercises.filter(exercise => exercise.muscle_group === 'legs' && exercise.type === 'custom');
      state.backExs = state.exercises.filter(exercise => exercise.muscle_group === 'back' && exercise.type === 'custom');
      state.chestExs = state.exercises.filter(exercise => exercise.muscle_group === 'chest' && exercise.type === 'custom');
      state.coreExs = state.exercises.filter(exercise => exercise.muscle_group === 'core' && exercise.type === 'custom');
      state.shoulderExs = state.exercises.filter(exercise => exercise.muscle_group === 'shoulders' && exercise.type === 'custom');
      state.miscExs = state.exercises.filter(exercise => exercise.muscle_group !== 'arms' && exercise.muscle_group !== 'legs'
        && exercise.muscle_group !== 'back' && exercise.muscle_group !== 'chest' && exercise.muscle_group !== 'core'
        && exercise.muscle_group !== 'shoulders' && exercise.type === 'custom');
    },
    [postWorkout.fulfilled] : (state, action) => {
      state.workouts.push(action.payload);
    },
    [postExercise.fulfilled] : (state, action) => {
      state.exercises.push(action.payload);
    },
  }
});

export const { setSelectedWorkout, setSelectedExercise } = trainerSlice.actions;
export default trainerSlice.reducer;