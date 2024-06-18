import { configureStore } from '@reduxjs/toolkit';
import AuthenticationSlice from './feature/AuthenticationSlice';
import userSlice from './feature/UserSlice';
import eventSlice from './feature/EventSlice';

export const store = configureStore({
  reducer: {
    auth: AuthenticationSlice,
    userapi: userSlice.reducer,
    eventapi: eventSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware).concat(eventSlice.middleware),
});