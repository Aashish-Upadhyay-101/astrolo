import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authServiceApi } from "../services/authService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authServiceApi.reducerPath]: authServiceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authServiceApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
