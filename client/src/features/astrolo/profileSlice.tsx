import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../api/types";

interface User {
  user: UserType | null;
}

const initialState: User = {
  user: null,
};

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export default profileSlice.reducer;
export const { setUserProfile } = profileSlice.actions;
