import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import AuthService from "./authService";

export interface AuthState {
  user: {};
  userToken: {};
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string | object | any;
}

const initialState: AuthState = {
  user: {},
  userToken: {},
  loading: false,
  success: false,
  error: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userDetail: object, thunkAPI) => {
    try {
      return await AuthService.login(userDetail);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/login",
  async (userDetail: object, thunkAPI) => {
    try {
      return await AuthService.signup(userDetail);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
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
      state.user = {};
      state.userToken = {};
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
        state.message = "fetching data from server";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "data fetched successfully";
        state.userToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.message = "fetching data from server";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "data fetched successfully";
        state.userToken = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
