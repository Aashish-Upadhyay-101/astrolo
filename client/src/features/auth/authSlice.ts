import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import AuthService from "./authService";

export interface AuthState {
  user: {};
  userToken: {};
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

const initialState: AuthState = {
  user: {},
  userToken: {},
  loading: false,
  success: false,
  error: false,
  message: "",
};

const loginThunk = createAsyncThunk(
  "auth/login",
  async (userDetail, thunkAPI) => {
    try {
      return await AuthService.login(userDetail);
    } catch (error) {
      const message = "error message";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = {};
      state.userToken = {};
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase;
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
