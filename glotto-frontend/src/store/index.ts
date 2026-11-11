import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import filterReducer from './filterSlice';
import languagesReducer from './languagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filterReducer,
    languages: languagesReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
