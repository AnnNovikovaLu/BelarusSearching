import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createStore } from '@reduxjs/toolkit';
import { userReducer } from "./slices/userSlice";
import profileReducer from './slices/profileSlice';



const rootReducer = combineReducers({
  userReducer,
  profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
