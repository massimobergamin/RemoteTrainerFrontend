import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//user routes
export const postUser = createAsyncThunk(
  'trainer/postUserStatus',
  async (userData) => {
    try {
      console.log("POSTING", userData)
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/users`, userData);
      console.log("RESPONSE DATA:", response.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  );

export const updateUser = createAsyncThunk(
    'trainer/updateUserStatus',
    async ({uid, userData}) => {
      try {
        const response = await axios.put(`https://remotetrainerserver.herokuapp.com/users/${uid}`, userData);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

export const getUserById = createAsyncThunk(
    'trainer/getUserByIdStatus',
    async (uid) => {
      try {
        const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/${uid}-trainer`);
        //const response = await axios.get(`http://localhost:3050/users/${uid}-trainer`);
        console.log("REDUX, get user info:", response.data)
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

export const postClient = createAsyncThunk(
  'trainer/postClientStatus',
  async ({trainer_uid, client_uid}) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/clients/${trainer_uid}-${client_uid}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getClients= createAsyncThunk(
  'trainer/getClientsStatus',
  async (uid, thunkAPI) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/clients/${uid}`);
      return response.data.sort((a,b)=> (a.first_name+" "+a.last_name).localeCompare(b.first_name+" "+b.last_name));
    } catch (error) {
      console.log(error);
    }
  }
);

export const postInviteCode = createAsyncThunk(
  'trainer/postInviteCodeStatus',
  async (inviteState) => {
    try {
      console.log("in redux", inviteState)
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/users/invite/${inviteState.user_uid}`, inviteState);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getInviteCode = createAsyncThunk(
  'trainer/getInviteCodeStatus',
  async (inviteState) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/invite/${inviteState}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//session routes
export const postSession = createAsyncThunk(
  'trainer/postSessionStatus',
  async ({trainer_uid, client_uid, sessionData}) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/users/sessions/${trainer_uid}-${client_uid}`, sessionData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateSession = createAsyncThunk(
  'trainer/updateSessionsStatus',
  async (meeting_id) => {
    try {
      const response = await axios.put(`https://remotetrainerserver.herokuapp.com/users/sessions/${meeting_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSessionsTrainer = createAsyncThunk(
  'trainer/getSessionsStatus',
  async (uid) => {
    try {
      console.log("UID", uid)
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/sessions/trainer-${uid}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSession = createAsyncThunk(
  'trainer/getSessionStatus',
  async (meeting_id) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/users/sessions/${meeting_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//plans routes
export const postPlan = createAsyncThunk(
  'trainer/postPlanStatus',
  async (planData) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/plans/${planData.trainer_uid}-${planData.client_uid}`, planData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePlan = createAsyncThunk(
  'trainer/updatePlanStatus',
  async ({plan_id, planData}) => {
    try {
      const response = await axios.put(`https://remotetrainerserver.herokuapp.com/plans/${plan_id}`, planData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPlan = createAsyncThunk(
  'trainer/getPlanStatus',
  async ({client_uid, start_date}) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/plans/${client_uid}-${start_date}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePlanNotes = createAsyncThunk(
  'trainer/updatePlanNotesStatus',
  async ({plan_id, planData}) => {
    try {
      const response = await axios.put(`https://remotetrainerserver.herokuapp.com/plans/notes/${plan_id}`, planData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//Workouts & Exercises
export const getWorkout = createAsyncThunk(
  'trainer/getWorkoutStatus',
  async (trainer_uid) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/workouts/${trainer_uid}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getExercise = createAsyncThunk(
  'trainer/getExerciseStatus',
  async (trainer_uid) => {
    try {
      const response = await axios.get(`https://remotetrainerserver.herokuapp.com/exercises/${trainer_uid}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postWorkout = createAsyncThunk(
  'trainer/postWorkoutStatus',
  async ({trainer_uid, workoutData}) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/workouts/${trainer_uid}`, workoutData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postExercise = createAsyncThunk(
  'trainer/postExerciseStatus',
  async ({trainer_uid, exerciseData}) => {
    try {
      const response = await axios.post(`https://remotetrainerserver.herokuapp.com/exercises/custom/${trainer_uid}`, exerciseData);
      return response.data;
    } catch (error) {
      console.log(error);
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
      last_login: 0,
      first_name: "",
      last_name: "",
      profile_picture: "",
      sex: "",
      weight: 0,
      height: 0,
      birthday: 0,
    },
    invite_code: "",
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
    miscExs: []
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
      state.user = action.payload;
    },
    [updateUser.fulfilled] : (state, action) => {
      state.user = action.payload;
    },
    [getUserById.fulfilled] : (state, action) => {
      state.sessions = action.payload.sessions;
      state.user.user_uid = action.payload.user_uid;
      state.user.username  = action.payload.username;
      state.user.email = action.payload.email;
      state.user.last_login = action.payload.last_login;
      state.user.first_name = action.payload.first_name;
      state.user.last_name = action.payload.last_name;
      state.user.profile_picture = action.payload.profile_picture;
      state.user.sex = action.payload.sex;
      state.user.weight = action.payload.weight;
      state.user.height = action.payload.height;
      state.user.birthday = action.payload.birthday;
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
      console.log("PAYLOAD", action.payload)
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
      state.miscExs = state.exercises.filter(exercise => exercise.muscle_group !== 'arms' && exercise.muscle_group !== 'legs'
        && exercise.muscle_group !== 'back' && exercise.muscle_group !== 'chest' && exercise.type === 'custom');
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