import { configureStore } from '@reduxjs/toolkit'
import trainerReducer from './trainer'
import clientReducer from './client'

export default configureStore({
  reducer: {
    trainer: trainerReducer,
    client: clientReducer,
  },
})