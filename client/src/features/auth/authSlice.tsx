import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserTokenResponse } from "../../api/types";
import {
  getAccessToken,
  getRefreshToken,
} from "../../helpers/localStorageHandler";

const accessToken = getAccessToken();
const refreshToken = getRefreshToken();

interface Token {
  token: UserTokenResponse | null;
}

const initialState: Token = {
  token: {
    access: accessToken ? accessToken : "",
    refresh: refreshToken ? refreshToken : "",
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: () => initialState,
    setToken: (state, action: PayloadAction<UserTokenResponse>) => {
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { logout, setToken } = authSlice.actions;
