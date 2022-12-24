import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "./types";
import { setUserProfile } from "../features/astrolo/profileSlice";
import { getAccessToken } from "../helpers/localStorageHandler";
import { authApi } from "./authApi";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_ENDPOINT as string;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/profile/`,
    prepareHeaders(headers, api) {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.mutation<UserType, null>({
      query() {
        return {
          method: "GET",
          url: "me/",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserProfile(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetMeMutation } = userApi;
