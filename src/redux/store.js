import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
export const store = configureStore({
  reducer: {
    //register reducer or here Add your reducers here
    user:userReducer,   
  },
})