import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../api/types";

interface User {
  profile: UserType | null;
}

const initialState: User = {
  profile: null,
};

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserType>) => {
      state.profile = action.payload;
    },
  },
});

export default profileSlice.reducer;
export const { setUserProfile } = profileSlice.actions;
