import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import {
  AppointmentBookedResponseType,
  AppointmentBooking,
  AppointmentResponse,
  AppointmentUpdate,
} from "./types";

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
    getAppointments: builder.query<[AppointmentResponse], void>({
      query() {
        return {
          url: "",
          method: "GET",
        };
      },
    }),
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
    createCheckoutSession: builder.mutation<any, string>({
      query(profile_id) {
        return {
          url: `checkout/create-checkout-session/${profile_id}/`,
          method: "POST",
        };
      },
    }),
    triggerPaymentSuccessWebhook: builder.query<void, void>({
      query() {
        return {
          url: "checkout/webhook-test/",
          method: "POST",
          credentials: "include",
        };
      },
    }),
    updateAppointmentStatus: builder.mutation<any, AppointmentUpdate>({
      query(updateData) {
        return {
          url: `update-appointment/${updateData.username}/`,
          method: "PATCH",
          body: {
            status: updateData.status,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useCreateCheckoutSessionMutation,
  useTriggerPaymentSuccessWebhookQuery,
  useUpdateAppointmentStatusMutation,
} = astroloApi;
