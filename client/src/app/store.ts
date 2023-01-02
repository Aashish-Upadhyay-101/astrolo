import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { astroloApi } from "../api/astroloApi";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/astrolo/profileSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    profileState: profileReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [astroloApi.reducerPath]: astroloApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware, authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
