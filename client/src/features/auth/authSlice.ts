import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
const accessToken = token.accessToken;
const refreshToken = token.refreshToken;

const initialState: AuthState = {
  accessToken: accessToken ? accessToken : "",
  refreshToken: refreshToken ? refreshToken : "",
  loading: false,
  success: false,
  error: false,
  message: "",
};

interface UserAttributes {
  first_name?: string;
  last_name?: string;
  username?: string;
  email: string;
  password: string;
  password2?: string;
}

export interface ReturnedData {
  accessToken: string;
  refreshToken: string;
  message: string;
}

export interface TokenReturnData {
  accessToken: string;
}

export interface TokenUserAttributes {
  refresh: string;
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

export const signup = createAsyncThunk<ReturnedData, UserAttributes>(
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
      .addCase(login.rejected, (state) => {
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
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.message = action.payload.message;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error = true;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
