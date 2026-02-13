import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
// import authReducer from '@/features/auth/store/authSlice'; // To be implemented
// import exercisesReducer from '@/features/exercises/store/exercisesSlice'; // To be implemented

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // auth: authReducer,
    // exercises: exercisesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
