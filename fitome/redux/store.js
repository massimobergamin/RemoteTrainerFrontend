import { configureStore } from '@reduxjs/toolkit';
import trainerReducer from './trainer';
import clientReducer from './client';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  trainer: trainerReducer,
  client: clientReducer,
})

const persistConfig = {
  key:'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware:[thunk],
})

export default store;
