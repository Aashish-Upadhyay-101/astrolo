import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserTokenResponse } from "../../api/types";

interface Token {
  token: UserTokenResponse | null;
}

const initialState: Token = {
  token: null,
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
