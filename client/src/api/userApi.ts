import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewType, UserType } from "./types";
import { setUserProfile } from "../features/astrolo/profileSlice";
import { RootState } from "../app/store";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_ENDPOINT;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/profile/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authState.token?.access;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<UserType, void>({
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
    getAllAstrologers: builder.query<[UserType], void>({
      query() {
        return {
          method: "GET",
          url: "astrologers/",
        };
      },
    }),
    getAstrologerDetails: builder.query<UserType, string>({
      query(username) {
        return {
          method: "GET",
          url: `${username}/`,
        };
      },
    }),
    getAstrologerReviews: builder.query<[ReviewType], string>({
      query(profile_id) {
        return {
          method: "GET",
          url: `review/${profile_id}/`,
        };
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllAstrologersQuery,
  useGetAstrologerDetailsQuery,
  useGetAstrologerReviewsQuery,
} = userApi;
