import { UserAddOutlined } from "@ant-design/icons";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { access } from "fs";
import { AppDispatch } from "../../app/store";
import AuthService from "./authService";

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string | object | any;
}

const token = JSON.parse(localStorage.getItem("user") || "{}"); // get token from local storage

const initialState: AuthState = {
  accessToken: token.accessToken ? token.accessToken : "",
  refreshToken: token.refreshToken ? token.refreshToken : "",
  loading: false,
  success: false,
  error: false,
  message: "",
};

interface UserAttributes {
  email: string;
  password: string;
}

export interface ReturnedData {
  accessToken: string;
  refreshToken: string;
  message: string;
}

export const login = createAsyncThunk<ReturnedData, UserAttributes>(
  "auth/login",
  async (userDetail, thunkAPI) => {
    try {
      return await AuthService.login(userDetail);
    } catch (error: any) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userDetail: object, thunkAPI) => {
    try {
      return await AuthService.signup(userDetail);
    } catch (error: any) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const requestAccessToken = createAsyncThunk(
  "auth/accessToken",
  async (refreshToken: string, thunkAPI) => {
    try {
      return await AuthService.requestAccessToken(refreshToken);
    } catch (error: any) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = "Processing login...";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.message = "Processing signup";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Signup successfully";
        state.accessToken = action.payload.accessToken;
        state.message = action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
