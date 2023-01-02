import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../app/store";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_ENDPOINT;

const astroloApi = createApi({
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
  endpoints: (builder) => ({}),
});
