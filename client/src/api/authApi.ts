import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  UserTokenResponse,
  RegisterUserFieldType,
  LoginUserType,
} from "./types";
import { userApi } from "./userApi";
import { setToken } from "../features/auth/authSlice";
import { setTokenLocal } from "../helpers/localStorageHandler";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "auth/",
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
          await dispatch(userApi.endpoints.getMe.initiate(data.access));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    sendVerificationEmail: builder.mutation<void, string>({
      query: (username) => `activate-link/${username}/`,
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "logout/",
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useSendVerificationEmailMutation,
} = authApi;
