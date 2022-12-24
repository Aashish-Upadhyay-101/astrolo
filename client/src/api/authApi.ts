import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  UserTokenResponse,
  RegisterUserFieldType,
  LoginUserType,
} from "./types";
import { userApi } from "./userApi";
import { setToken } from "../features/auth/authSlice";
import { setTokenLocal } from "../helpers/localStorageHandler";
import { store } from "../app/store";

// const BASE_URL = process.env.REACT_APP_API_BASE_URL_ENDPOINT as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "auth/",
    // baseUrl: `${BASE_URL}/auth/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserTokenResponse, RegisterUserFieldType>({
      query(data) {
        return {
          url: "register/",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setToken(data));
          setTokenLocal(JSON.stringify(data));
          await dispatch(userApi.endpoints.getMe.initiate(null));
          const username = store.getState().profileState.profile?.user.username;
          await dispatch(
            authApi.endpoints.sendVerificationEmail.initiate(username || "") // send verification email just after registering
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation<UserTokenResponse, LoginUserType>({
      query(data) {
        return {
          url: "login/",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
          setTokenLocal(JSON.stringify(data));
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    sendVerificationEmail: builder.query<void, string>({
      query: (username) => `auth/activate-link/${username}/`,
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "logout/",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useSendVerificationEmailQuery,
} = authApi;
