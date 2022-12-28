import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "./types";
import { setUserProfile } from "../features/astrolo/profileSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `profile/`,
  }),
  endpoints: (builder) => ({
    getMe: builder.mutation<UserType, string>({
      query(accessToken) {
        return {
          method: "GET",
          url: "me/",
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
    getAllAstrologers: builder.query<[UserType], void>({
      query(accessToken) {
        return {
          method: "GET",
          url: "astrologers/",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetMeMutation, useGetAllAstrologersQuery } = userApi;
