import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "./types";
import { setUserProfile } from "../features/astrolo/profileSlice";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_ENDPOINT as string;

type AccessToken = string;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/profile/`,
  }),
  endpoints: (builder) => ({
    getMe: builder.mutation<UserType, AccessToken>({
      query(accessToken) {
        return {
          url: "me/",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
