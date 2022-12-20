import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  UserTokenResponse,
  RegisterUserFieldType,
  LoginUserType,
  UserType,
} from "./types";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_ENDPOINT as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
  }),
  endpoints: (builder) => ({
    getMe: builder.mutation<UserType, null>({
      query: () => `profile/me/`,
      transformResponse: (result: { data: { user: UserType } }) =>
        result.data.user,
    }),
    registerUser: builder.mutation<UserTokenResponse, RegisterUserFieldType>({
      query(data) {
        return {
          url: "auth/register/",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<UserTokenResponse, LoginUserType>({
      query(data) {
        return {
          url: "auth/login/",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      // on this query started I want another query to be fired at the same time i.e get the logged in user.
    }),
    sendVerificationEmail: builder.query<void, string>({
      query: (username) => `auth/activate-link/${username}/`,
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "auth/logout/",
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
