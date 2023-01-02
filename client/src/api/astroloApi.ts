import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { AppointmentBookedResponseType, AppointmentBooking } from "./types";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_ENDPOINT;

export const astroloApi = createApi({
  reducerPath: "astroloApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/appointment/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authState.token?.access;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    createAppointment: builder.mutation<
      AppointmentBookedResponseType,
      AppointmentBooking
    >({
      query(data) {
        return {
          url: `${data.astrologer_username}/`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateAppointmentMutation } = astroloApi;
