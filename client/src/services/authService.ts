import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  message: string;
}

export const authServiceApi = createApi({
  reducerPath: "authServiceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
  endpoints: (builder) => ({
    authLogin: builder.query<AuthState, unknown>({
      query: (name) => "auth/login/",
    }),
  }),
});

export const { useAuthLoginQuery } = authServiceApi;
