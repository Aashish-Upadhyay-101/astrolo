import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { ConversationListInterface } from "./types";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_ENDPOINT;

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/chat/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authState.token?.access;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getConversations: builder.query<[ConversationListInterface], void>({
      query() {
        return {
          url: "conversation/",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetConversationsQuery } = chatApi;
