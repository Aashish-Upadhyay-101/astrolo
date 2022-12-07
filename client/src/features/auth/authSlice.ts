import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: Map<string, string>;
  userToken: Map<string, string>;
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

const initialState: AuthState = {
  user: new Map(),
  userToken: new Map(),
  loading: false,
  success: false,
  error: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = new Map();
      state.userToken = new Map();
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
